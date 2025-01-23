import {
  Dispatch,
  forwardRef,
  memo,
  MemoExoticComponent,
  NamedExoticComponent,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { store, type RootState } from "@/app/store";

import data from "@/app/data/data";

import Message from "./UI/Message";
import Answer from "./UI/Answer";
import touchOrMouse from "@/shared/features/touchOrMouseOrIphone";
import { extraI, setCurrentMessageTypeT } from "./types/types";
import { changeIsScrolling } from "@/app/features/mainStateSlice";

interface messangerPropsI {
  isScrolling: boolean;
  setIsScrolling: Dispatch<SetStateAction<boolean>>;
}

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
}

function calcTSpeed(val: number) {
  return () => {
    if (val === 0.5) return 40;
    if (val === 1) return 30;
    return 20;
  };
}

function changeCurrentMessageType(
  currentMessageType: setCurrentMessageTypeT,
  setCurrentMessageType: Dispatch<setCurrentMessageTypeT>
) {
  switch (currentMessageType) {
    case "question":
      setCurrentMessageType("answers");
    case "answers":
      setCurrentMessageType("answer");
    case "answer":
      setCurrentMessageType("response");
    case "response":
      setCurrentMessageType("question");
  }
}

const Messanger = memo(() => {
  const dispatch = useDispatch();
  const messanger = useRef(null);
  const currentMessangerPosition = useSelector((state: RootState) => ({
    curLocPart: state.navigation.routes[state.navigation.currentLocation],
    curLocPartTitle: state.navigation.currentLocation,
    curLocPartTitleNum: state.navigation.currentLocation === "test" ? 100 : 200,
  }));
  const speed = useSelector((state: RootState) => state.mainState.typingSpeed);
  const isTyping = useSelector((state: RootState) => state.mainState.isTyping);
  const [messages, setMessages] = useState<messageI[]>([]);
  const species = useSelector((state: RootState) => state.profile.species);
  const [currentMessageType, setCurrentMessageType] =
    useState<setCurrentMessageTypeT>("question");
  useLayoutEffect(() => {
    const messagesCopy: messageI[] = [];
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
        });
        messagesCopy.push({
          type: "answer",
          isTyping: false,
          part: curPart,
          text: dataBlock.a,
        });
        messagesCopy.push({
          type: "response",
          isTyping: false,
          part: curPart,
          text: dataBlock.r,
        });
        curPart += 1;
      }
      if (currentMessangerPosition.curLocPart.part === curPart) {
        messagesCopy.push({
          type: "question",
          isTyping,
          speed,
          lastMessageLength: messagesCopy[messagesCopy.length - 1]?.text.length,
          part: curPart,
          text: data[curPart].q,
        });
      }

      return messagesCopy;
    });
  }, []);

  function endOfMessageHandler(type: setCurrentMessageTypeT) {
    const copy = [...messages];
    let part;
    if (type === "question") {
      setMessages(() => {
        const block = data[copy[copy.length - 1].part].na;
        copy.push({
          type: "answers",
          part: copy[copy.length - 1].part,
          text: [block[0].a, block[1].a, block[2].a],
          extra: [block[0].extra, block[1].extra, block[2].extra],
        });
        return copy;
      });
    }
    if (type === "answer") {
      part = copy[copy.length - 1].part;
      copy.push({
        text: data[part].na[copy[copy.length - 1].answerNum].r,
        part,
        type: "response",
        isTyping,
        speed,
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
    };
    setMessages(copy);
  }

  useEffect(() => {
    function wheelOrTouchmoveHandler() {
      dispatch(changeIsScrolling(true));
    }
    if (touchOrMouse === "wheel") {
      messanger.current.addEventListener("wheel", wheelOrTouchmoveHandler);
    } else if (touchOrMouse === "touchmove") {
      messanger.current.addEventListener("touchmove", wheelOrTouchmoveHandler);
    }
    return () =>
      messanger.current.removeEventListener(
        touchOrMouse === "wheel" ? "wheel" : "touchmove",
        wheelOrTouchmoveHandler
      );
  }, []);

  return (
    <section
      className="dialogue-window container"
      aria-label="Диалоговое окно"
      ref={messanger}
    >
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
            />
          );
        }
      })}
    </section>
  );
});

export default Messanger;
