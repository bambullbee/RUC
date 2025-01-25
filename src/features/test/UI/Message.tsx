import { RootState } from "@/app/store";
import React, { forwardRef, memo, useEffect, useRef, useState } from "react";
import { MutableRefObject } from "react";
import { useSelector } from "react-redux";
import { processStringBySex } from "@/features/test/features/processStringBySex";
import { setCurrentMessageTypeT } from "@/features/test/types/types";

type className = "right-sms" | "left-sms";

interface MessagePropsI {
  text: string;
  className: string;
  isTyping?: boolean;
  lastMessageLength?: number;
  speed?: number;
  type: setCurrentMessageTypeT;
  endHandler: (type: string) => void;
  fixed: boolean;
}

const Message = (
  { text, className, speed, isTyping, type, endHandler, fixed }: MessagePropsI,
  ref: MutableRefObject<HTMLElement>
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentText, setCurrentText] = useState(
    className === "left-sms" && isTyping && !fixed
      ? ""
      : processStringBySex(text)
  );
  const sex = useSelector((state: RootState) => state.profile.sex);
  const isScrolling = useSelector(
    (state: RootState) => state.mainState.isScrolling
  );

  // make visible
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    //micro delay for each message
    if (fixed) {
      setIsVisible(true);
    } else {
      timer = setTimeout(() => setIsVisible(true), 300);
    }
    return () => clearTimeout(timer);
  }, []);

  //typing effect
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isVisible) {
      if (currentText.length !== text.length) {
        if (!isScrolling) {
          ref.current.scrollTo({
            top: ref.current.scrollHeight,
            behavior: "smooth",
          });
        }
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
            return prevState + text[prevState.length];
          });
        }, speed);
      } else {
        if (!fixed) {
          endHandler(type);
        }
      }
    }
    return () => clearTimeout(timer);
  }, [isVisible, currentText]);

  return (
    <>
      {isVisible ? (
        <div className="sms-wrapper">
          <div className={`${"sms " + className}`}>{currentText}</div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default memo(forwardRef(Message));
