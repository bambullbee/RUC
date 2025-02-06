import data from "@/app/data/data";
import { changeIsScrolling } from "@/app/features/mainStateSlice";
import { RootState } from "@/app/store";
import touchOrMouse from "@/shared/features/touchOrMouseOrIphone";
import { extraI, setCurrentMessageTypeT } from "@/features/test/types/types";
import Answer from "./UI/Answer";
import Message from "./UI/Message";
import React, {
  Dispatch,
  forwardRef,
  memo,
  MutableRefObject,
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { inPartMove } from "@/app/features/navigationSlice";
import MessageBasic from "./UI/MessageBasic";
interface testI {}
interface messageI {
  type: setCurrentMessageTypeT;
  text: string | [string, string, string];
  previousMessageSpeed?: 20 | 30 | 40;
  speed?: 20 | 30 | 40;
  lastMessageLength?: number;
  answerNum?: 0 | 1 | 2;
  isTyping?: boolean;
  part: number;
  extra?: extraI[];
  fixed: boolean;
}
interface messagesI {
  text: string | [string, string, string];
  type: string;
}

const Test = ({}: testI, ref: MutableRefObject<HTMLElement>) => {
  const dispatch = useDispatch();
  const messanger = ref;
  const messangerInner: RefObject<HTMLDivElement> = useRef(null);
  const [currentMessage, setCurrentMessage] = useState<messageI[]>([]);
  const currentMessangerPosition = useSelector((state: RootState) => ({
    curLocPart: state.navigation.routes[state.navigation.currentLocation],
    curLocPartTitle: state.navigation.currentLocation,
    curLocPartTitleNum: state.navigation.currentLocation === "test" ? 100 : 200,
  }));
  const speed = useSelector((state: RootState) => state.mainState.typingSpeed);
  const isTyping = useSelector((state: RootState) => state.mainState.isTyping);
  const [messages, setMessages] = useState<messagesI[]>([]);
  const species = useSelector((state: RootState) => state.profile.species);
  const isRestarted = useSelector(
    (state: RootState) => state.mainState.restarted
  );
  useLayoutEffect(() => {
    setMessages([]);
    if (messanger.current) {
      messanger.current.style.minHeight = "initial";
    }
    const timer = setTimeout(() => {
      const messagesCopy: messagesI[] = [];
      console.log("restarted");
      let curPart = currentMessangerPosition.curLocPartTitleNum;
      setMessages(() => {
        while (currentMessangerPosition.curLocPart.part > curPart) {
          const dataBlock =
            data[curPart].na[
              currentMessangerPosition.curLocPart.answers[curPart - 100]
            ];
          messagesCopy.push({
            type: "question",
            text: data[curPart].q,
          });
          messagesCopy.push({
            type: "answer",
            text: dataBlock.a,
          });
          messagesCopy.push({
            type: "response",
            text: dataBlock.r,
          });
          curPart += 1;
        }
        if (
          currentMessangerPosition.curLocPart.part === curPart &&
          data[curPart]
        ) {
          setCurrentMessage([
            {
              type: "question",
              isTyping,
              speed,
              lastMessageLength:
                messagesCopy[messagesCopy.length - 1]?.text.length,
              part: curPart,
              text: data[curPart].q,
              fixed: false,
            },
          ]);
        }

        return messagesCopy;
      });
    }, 100);
  }, [isRestarted]);

  function endOfMessageHandler(type: setCurrentMessageTypeT): void {
    setMessages((prevState) => {
      return [
        ...prevState,
        { text: currentMessage[0].text, type: currentMessage[0].type },
      ];
    });
    let copy: messageI[];
    let part;
    if (!data[currentMessage[0].part + 1] && type === "response") {
      return undefined;
    }
    if (type === "question") {
      const block = data[currentMessage[0].part].na;
      copy = [
        {
          type: "answers",
          part: currentMessage[0].part,
          text: [block[0].a, block[1].a, block[2].a],
          extra: [block[0].extra, block[1].extra, block[2].extra],
          fixed: false,
        },
      ];
    }
    if (type === "answer") {
      part = currentMessage[0].part;
      copy = [
        {
          text: data[part].na[currentMessage[0].answerNum]?.r,
          part,
          type: "response",
          isTyping,
          speed,
          fixed: false,
        },
      ];
    }
    if (type === "response") {
      part = currentMessage[0].part + 1;
      copy = [
        {
          text: data[part].q,
          type: "question",
          part,
          speed,
          isTyping,
          previousMessageSpeed: currentMessage[0].speed,
          lastMessageLength: currentMessage[0].text.length,
          fixed: false,
        },
      ];
    }
    setCurrentMessage(copy);
  }
  function chooseAnswerHandler(index: number) {
    const blockNum = currentMessage[0].part;
    messangerInner.current.style.minHeight =
      messangerInner.current.scrollHeight + "px";
    setCurrentMessage([
      {
        type: "answer",
        text:
          data[blockNum].na[index].a +
          (blockNum === 102 && index === 2 ? species : ""),
        part: blockNum,
        answerNum: index as 0 | 1 | 2,
        fixed: false,
      },
    ]);
    dispatch(inPartMove(index as 0 | 1 | 2));
  }

  useEffect(() => {
    function wheelOrTouchmoveHandler() {
      dispatch(changeIsScrolling(true));
    }
    if (touchOrMouse === "wheel") {
      messanger.current?.addEventListener("wheel", wheelOrTouchmoveHandler);
    } else if (touchOrMouse === "touchmove") {
      messanger.current?.addEventListener("touchmove", wheelOrTouchmoveHandler);
    }
    return () =>
      messanger.current?.removeEventListener(
        touchOrMouse === "wheel" ? "wheel" : "touchmove",
        wheelOrTouchmoveHandler
      );
  }, []);

  return (
    <div className="dialogue__inner" ref={messangerInner}>
      {" "}
      {messages.map((el) => (
        <MessageBasic text={el.text} type={el.type} />
      ))}
      {currentMessage.map((el) => {
        if (el.type === "question") {
          return (
            <Message
              key={el.text as string}
              type={el.type}
              text={el.text as string}
              className="left-sms"
              isTyping={el.isTyping}
              speed={el.speed}
              lastMessageLength={el.lastMessageLength}
              endHandler={endOfMessageHandler}
              ref={messanger}
              fixed={el.fixed}
            />
          );
        }
        if (el.type === "answers") {
          return (
            <div className="choose-answer">
              {(el.text as [string, string, string]).map((answer, ind) => (
                <Answer
                  key={el.text as string}
                  text={answer}
                  index={ind}
                  onClick={chooseAnswerHandler}
                  extra={el.extra[ind]}
                  ref={messanger}
                />
              ))}
            </div>
          );
        }
        if (el.type === "answer") {
          return (
            <Message
              key={el.text as string}
              type={el.type}
              text={el.text as string}
              className="right-sms"
              endHandler={endOfMessageHandler}
              ref={messanger}
              fixed={el.fixed}
            />
          );
        }
        if (el.type === "response") {
          return (
            <Message
              text={el.text as string}
              type={el.type}
              className="left-sms"
              isTyping={el.isTyping}
              speed={el.speed}
              endHandler={endOfMessageHandler}
              ref={messanger}
              fixed={el.fixed}
            />
          );
        }
      })}
    </div>
  );
};

export default memo(forwardRef(Test));
