import React, {
  useEffect,
  useState,
  memo,
  useLayoutEffect,
  forwardRef,
} from "react";

interface answerI {
  text: string;
  answerIndex: number;
  partIndex: number;
  onClick: (partIndex: number, answerIndex: number) => void;
  isHidden: boolean;
  timeout: number;
  isScrolling: boolean;
}

const Answer = memo(
  forwardRef(
    (
      {
        text,
        answerIndex,
        partIndex,
        onClick,
        isHidden,
        timeout,
        isScrolling,
      }: answerI,
      ref: { current: HTMLElement }
    ) => {
      const [isDisplayed, setIsDisplayed] = useState(
        timeout === 0 ? true : false
      );

      useEffect(() => {
        const timer = setTimeout(() => {
          if (!isDisplayed) {
            setIsDisplayed(!isDisplayed);
          }
        }, timeout);
        return () => {
          clearTimeout(timer);
        };
      }, []);

      useEffect(() => {
        const timer = setTimeout(() => {
          if (isDisplayed && !isScrolling) {
            ref.current.scrollTo({
              top: ref.current.scrollHeight,
              behavior: "smooth",
            });
          }
        }, 300);
        return () => {
          clearTimeout(timer);
        };
      }, [isScrolling, isDisplayed]);

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
  )
);

export default Answer;
