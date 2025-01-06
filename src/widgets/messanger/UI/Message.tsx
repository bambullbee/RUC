import React, { memo, useEffect, useRef, useState } from "react";
import { Dispatch, SetStateAction } from "react";

type className = "right-sms" | "left-sms";

interface MessagePropsI {
  className: className;
  text: string;
  isHidden: boolean;
  timeout: number;
  isTyping: boolean;
  partIndex: number;
  typeFn: <S>(
    i: number,
    t: number,
    ie: string,
    setState: Dispatch<SetStateAction<S>>,
    className: string,
    block: HTMLElement | null
  ) => void;
}

const Message = memo(
  ({
    className,
    text,
    isHidden,
    partIndex,
    timeout,
    typeFn,
  }: MessagePropsI) => {
    const messageBlockRef = useRef(null);

    const [isDisplayed, setIsDisplayed] = useState(
      timeout === 0 ? true : false
    );

    const [currentText, setCurrentText] = useState("");

    useEffect(() => {
      const block = document.querySelector(".dialogue-window") as HTMLElement;
      if (!isDisplayed) {
        setTimeout(() => {
          setIsDisplayed(true);

          typeFn(0, 30, text, setCurrentText, className, block);
        }, timeout);
      } else {
        typeFn(0, 30, text, setCurrentText, className, block);
      }
    }, []);

    return isDisplayed ? (
      <div
        className="sms-wrapper"
        style={{ display: isHidden ? "none" : "block" }}
        ref={messageBlockRef}
      >
        <p className={`${"sms " + className}`} aria-label="Ваше сообщение">
          {className === "right-sms" ? text : currentText}
        </p>
      </div>
    ) : (
      ""
    );
  }
);

export default Message;
