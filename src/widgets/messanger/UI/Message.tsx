import React from "react";

type className = "right-sms" | "left-sms";

interface MessagePropsI {
  className: className;
  text: string;
  typing: boolean;
}

const Message = ({ className, text, typing }: MessagePropsI) => {
  return (
    <div className="sms-wrapper">
      <p
        className={`${"sms " + className}`}
        aria-label="Ваше сообщение"
        tabIndex={1}
      >
        {text}
      </p>
    </div>
  );
};

export default Message;
