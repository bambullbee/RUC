import React, { memo, useEffect, useState } from "react";

type className = "right-sms" | "left-sms";

interface MessagePropsI {
  className: className;
  text: string;
  isHidden: boolean;
  timeout: number;
  isTyping: boolean;
  partIndex: number;
}

const Message = memo(
  ({ className, text, isHidden, partIndex, timeout }: MessagePropsI) => {
    const [isDisplayed, setIsDisplayed] = useState(
      timeout === 0 ? true : false
    );
    useEffect(() => {
      if (!isDisplayed) {
        setTimeout(() => {
          setIsDisplayed(true);
        }, timeout);
      }
    }, []);
    useEffect(() => {
      if (isDisplayed) {
        setTimeout(() => {
          const messangerBlock = document.querySelector(".messanger");
          console.log(messangerBlock, "scroll useEffect was fired");
          messangerBlock.scrollTop = messangerBlock.scrollHeight;
        }, timeout);
      }
    }, [isDisplayed]);
    return isDisplayed ? (
      <div
        className="sms-wrapper"
        style={{ display: isHidden ? "none" : "block" }}
      >
        <p className={`${"sms " + className}`} aria-label="Ваше сообщение">
          {text}
        </p>
      </div>
    ) : (
      ""
    );
  }
);

export default Message;
