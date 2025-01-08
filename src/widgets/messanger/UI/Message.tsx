import React, { forwardRef, memo, useEffect, useRef, useState } from "react";
import { MutableRefObject } from "react";

type className = "right-sms" | "left-sms";

interface MessagePropsI {
  className: className;
  text: string;
  isHidden: boolean;
  timeout: number;
  isTyping: boolean;
  partIndex: number;
  isScrolling: boolean;
}

const Message = memo(
  forwardRef(
    (
      {
        className,
        text,
        isHidden,
        partIndex,
        timeout,
        isScrolling,
      }: MessagePropsI,
      ref: { current: HTMLElement }
    ) => {
      const newRef = useRef(ref.current);
      const [isDisplayed, setIsDisplayed] = useState(
        timeout === 0 ? true : false
      );
      const [currentText, setCurrentText] = useState("");
      const [isTyping, setIsTyping] = useState(false);

      useEffect(() => {
        console.log("first eff");
        if (!isDisplayed) {
          setTimeout(() => {
            setIsDisplayed(true);
          }, timeout);
        }
      }, []);

      useEffect(() => {
        console.log("second eff");
        const timer = setTimeout(() => {
          console.log(isDisplayed);
          if (isDisplayed) {
            if (text[currentText.length]) {
              setIsTyping(true);
              setCurrentText((prevState) => prevState + text[prevState.length]);
            } else {
              setIsTyping(false);
            }
          }
        }, 30);
        return () => {
          clearTimeout(timer);
        };
      }, [currentText, isDisplayed]);

      useEffect(() => {
        const clear = setInterval(() => {
          if (!isScrolling && isTyping) {
            newRef.current.scrollTo({
              top: newRef.current.scrollHeight,
              behavior: "smooth",
            });
          }
        }, 30);
        return () => {
          clearInterval(clear);
        };
      }, [isTyping, isScrolling]);

      return isDisplayed ? (
        <div
          className="sms-wrapper"
          style={{ display: isHidden ? "none" : "block" }}
        >
          <p className={`${"sms " + className}`} aria-label="Ваше сообщение">
            {className === "right-sms" ? text : currentText}
          </p>
        </div>
      ) : (
        ""
      );
    }
  )
);

export default Message;
