import React, { memo } from "react";
import { processStringBySex } from "../features/processStringBySex";
processStringBySex;

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
        {processStringBySex(text as string)}
      </div>
    </div>
  );
};

export default memo(MessageBasic);
