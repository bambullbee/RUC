import React, {
  useEffect,
  useState,
  memo,
  useLayoutEffect,
  forwardRef,
} from "react";
import { processStringBySex } from "../features/processStringBySex";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { changeSex } from "@/app/features/profileSlice";

interface answerI {
  text: string;
  answerIndex: number;
  partIndex: number;
  onClick: (partIndex: number, answerIndex: number) => void;
  isHidden: boolean;
  timeout: number;
  isScrolling: boolean;
  extra?: any;
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
        extra,
      }: answerI,
      ref: { current: HTMLElement }
    ) => {
      const dispatch = useDispatch();
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
            if (extra) {
              if (extra.t === "state") {
                dispatch(extra.fn(extra.arg));
              }
              if (extra.t === "input") {
                // !!!
              }
            }
            onClick(partIndex, answerIndex);
          }}
          className="answer"
          aria-label="Вариант ответа"
          style={{ display: isHidden ? "none" : "block" }}
        >
          {processStringBySex(text)}
        </button>
      ) : (
        ""
      );
    }
  )
);

export default Answer;
