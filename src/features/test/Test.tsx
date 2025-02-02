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
interface testI {}
interface messageI {
  type: setCurrentMessageTypeT;
  text: string | [string, string, string];
  previousMessageSpeed?: 20 | 30 | 300;
  speed?: 20 | 30 | 300;
  lastMessageLength?: number;
  answerNum?: 0 | 1 | 2;
  isTyping?: boolean;
  part: number;
  extra?: extraI[];
  fixed: boolean;
}

const Test = ({}: testI, ref: MutableRefObject<HTMLElement>) => {
  const dispatch = useDispatch();
  const messanger = ref;
  const messangerInner: RefObject<HTMLDivElement> = useRef(null);

  const currentMessangerPosition = useSelector((state: RootState) => ({
    curLocPart: state.navigation.routes[state.navigation.currentLocation],
    curLocPartTitle: state.navigation.currentLocation,
    curLocPartTitleNum: state.navigation.currentLocation === "test" ? 100 : 200,
  }));
  const speed = useSelector((state: RootState) => state.mainState.typingSpeed);
  const isTyping = useSelector((state: RootState) => state.mainState.isTyping);
  const [messages, setMessages] = useState<messageI[]>([]);
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
      const messagesCopy: messageI[] = [];
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
            isTyping: false,
            part: curPart,
            text: data[curPart].q,
            fixed: true,
          });
          console.log(dataBlock, "check");
          messagesCopy.push({
            type: "answer",
            isTyping: false,
            part: curPart,
            text: dataBlock.a,
            fixed: true,
          });
          messagesCopy.push({
            type: "response",
            isTyping: false,
            part: curPart,
            text: dataBlock.r,
            fixed: true,
          });
          curPart += 1;
        }
        if (
          currentMessangerPosition.curLocPart.part === curPart &&
          data[curPart]
        ) {
          messagesCopy.push({
            type: "question",
            isTyping,
            speed,
            lastMessageLength:
              messagesCopy[messagesCopy.length - 1]?.text.length,
            part: curPart,
            text: data[curPart].q,
            fixed: false,
          });
        }

        return messagesCopy;
      });
    }, 100);
  }, [isRestarted]);

  function endOfMessageHandler(type: setCurrentMessageTypeT): void {
    const copy = [...messages];
    let part;
    if (!data[messages[messages.length - 1].part + 1] && type === "response") {
      return undefined;
    }
    if (type === "question") {
      setMessages(() => {
        const block = data[copy[copy.length - 1].part].na;
        copy.push({
          type: "answers",
          part: copy[copy.length - 1].part,
          text: [block[0].a, block[1].a, block[2].a],
          extra: [block[0].extra, block[1].extra, block[2].extra],
          fixed: false,
        });
        return copy;
      });
    }
    if (type === "answer") {
      part = copy[copy.length - 1].part;
      copy.push({
        text: data[part].na[copy[copy.length - 1].answerNum]?.r,
        part,
        type: "response",
        isTyping,
        speed,
        fixed: false,
      });
      setMessages(copy);
    }
    if (type === "response") {
      part = copy[copy.length - 1].part + 1;
      copy.push({
        text: data[part].q,
        type: "question",
        part,
        speed,
        isTyping,
        previousMessageSpeed: copy[copy.length - 1].speed,
        lastMessageLength: copy[copy.length - 1].text.length,
        fixed: false,
      });
      setMessages(copy);
    }
  }
  function chooseAnswerHandler(index: number) {
    const blockNum = messages[messages.length - 1].part;
    const copy = [...messages];
    copy[copy.length - 1] = {
      type: "answer",
      text:
        data[blockNum].na[index].a +
        (blockNum === 102 && index === 2 ? species : ""),
      part: blockNum,
      answerNum: index as 0 | 1 | 2,
      fixed: false,
    };

    messangerInner.current.style.minHeight =
      messangerInner.current.scrollHeight + "px";

    setMessages(copy);
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
      {messages.map((el) => {
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
