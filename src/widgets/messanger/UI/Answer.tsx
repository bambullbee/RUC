import React from "react";

interface answerI {
  tabIndex: number;
  text: string;
  typing: boolean;
}

const Answer = ({ tabIndex, text, typing }: answerI) => {
  return (
    <button className="answer" aria-label="Вариант ответа" tabIndex={tabIndex}>
      {text}
    </button>
  );
};

export default Answer;
