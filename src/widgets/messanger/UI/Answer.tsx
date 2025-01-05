import React, { useEffect, useState, memo, useLayoutEffect } from "react";

interface answerI {
  text: string;
  answerIndex: number;
  partIndex: number;
  onClick: (partIndex: number, answerIndex: number) => void;
  isHidden: boolean;
  timeout: number;
}

const Answer = memo(
  ({ text, answerIndex, partIndex, onClick, isHidden, timeout }: answerI) => {
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
      <button
        onClick={() => {
          onClick(partIndex, answerIndex);
        }}
        className="answer"
        aria-label="Вариант ответа"
        style={{ display: isHidden ? "none" : "block" }}
      >
        {text}
      </button>
    ) : (
      ""
    );
  }
);

export default Answer;
