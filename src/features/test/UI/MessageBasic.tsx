import React, { memo } from "react";

interface messageBasicI {
  text: string | [string, string, string];
  type: string;
}

const MessageBasic = ({ text, type }: messageBasicI) => {
  return (
    <div className="sms-wrapper">
      <div
        className={`${
          "sms " +
          (type === "question" || type === "response"
            ? "left-sms"
            : "right-sms")
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default memo(MessageBasic);
