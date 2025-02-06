import { RootState } from "@/app/store";
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { MutableRefObject } from "react";
import { useSelector } from "react-redux";
import { processStringBySex } from "@/features/test/features/processStringBySex";
import { setCurrentMessageTypeT } from "@/features/test/types/types";
import touchOrMouse from "@/shared/features/touchOrMouseOrIphone";

type className = "right-sms" | "left-sms";

interface MessagePropsI {
  text: string;
  className: string;
  type: setCurrentMessageTypeT;
  endHandler: (type: string) => void;
}

const Message = (
  { text, className, type, endHandler }: MessagePropsI,
  ref: MutableRefObject<HTMLElement>
) => {
  const speed = useSelector((state: RootState) => {
    return state.mainState.typingSpeed;
  });
  const isTyping = useSelector((state: RootState) => {
    return state.mainState.isTyping;
  });
  const [isVisible, setIsVisible] = useState(false);
  const [currentText, setCurrentText] = useState(
    className === "left-sms" && isTyping ? "" : processStringBySex(text)
  );
  const sex = useSelector((state: RootState) => state.profile.sex);
  const isScrolling = useSelector(
    (state: RootState) => state.mainState.isScrolling
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    timer = setTimeout(() => setIsVisible(true), 300);

    return () => clearTimeout(timer);
  }, []);

  const [isReady, setIsReady] = useState(300);

  function scroll(speed: number): ReturnType<typeof setTimeout> {
    return setTimeout(() => {
      if (!isScrolling) {
        if (isReady > 40) {
          setIsReady((state) => state - speed);
          return undefined;
        } else {
          setIsReady(300);
          ref.current.scrollTo({
            top: ref.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }
    }, speed);
  }

  //typing effect
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let timer2: ReturnType<typeof setTimeout>;
    if (isVisible && isTyping) {
      if (currentText.length !== text.length) {
        timer = setTimeout(() => {
          setCurrentText((prevState: string) => {
            if (text[prevState.length] === "s") {
              if (sex === "female") {
                return prevState + "a";
              } else {
                return " " + prevState;
              }
            }
            if (text[prevState.length] === "b") {
              if (sex === "female") {
                const copy = prevState;
                const arrayCopy = copy.split("");
                arrayCopy[copy.length - 1] = "ь";
                return " " + arrayCopy.join("");
              } else {
                return " " + prevState;
              }
            }
            scroll(speed);
            return prevState + text[prevState.length];
          });
        }, speed);
      } else {
        endHandler(type);
      }
    } else if (!isTyping) {
      setCurrentText(processStringBySex(text));
      endHandler(type);
    }
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [isVisible, currentText]);

  return (
    <>
      {isVisible ? (
        <div className="sms-wrapper">
          <div
            className={`${
              "sms current-sms " +
              className +
              (className === "left-sms" ? " left-current-sms" : " ")
            }`}
          >
            {currentText}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default memo(forwardRef(Message));
