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
import { changeSex, changeSpecies } from "@/app/features/profileSlice";

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
      const species = useSelector((state: RootState) => state.profile.species);
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
        <>
          <button
            onClick={() => {
              if (extra) {
                if (extra.t === "state") {
                  dispatch(extra.fn(extra.arg));
                }
              }
              if (extra?.t === "input" && species.length === 0) {
                return;
              }
              onClick(partIndex, answerIndex);
            }}
            aria-label="Вариант ответа"
            style={{ display: isHidden ? "none" : "block" }}
            className={
              extra?.t === "input" ? "answer answer__down-padding" : "answer"
            }
          >
            {processStringBySex(text)}
          </button>
          {extra?.t === "input" ? (
            <input
              className="answer-input"
              value={species}
              placeholder="Кто ты?"
              onChange={(e) => {
                dispatch(changeSpecies(e.target.value));
              }}
            ></input>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      );
    }
  )
);

export default Answer;
