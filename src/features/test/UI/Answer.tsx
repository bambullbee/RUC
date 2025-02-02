import React, {
  useEffect,
  useState,
  memo,
  forwardRef,
  MutableRefObject,
  useRef,
} from "react";
import { processStringBySex } from "../features/processStringBySex";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { changeLoyalty, changeSpecies } from "@/app/features/profileSlice";
import { extraI } from "../types/types";
import touchOrMouse from "@/shared/features/touchOrMouseOrIphone";
import { spec } from "node:test/reporters";

interface answerI {
  text: string;
  index: number;
  onClick: (index: number) => void;
  extra: extraI;
}

const Answer = (
  { text, index, onClick, extra }: answerI,
  ref: MutableRefObject<HTMLElement>
) => {
  const answer = useRef(null);
  const input = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const isScrolling = useSelector(
    (state: RootState) => state.mainState.isScrolling
  );
  const species = useSelector((state: RootState) => state.profile.species);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    // WTF
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      // if (!isScrolling && touchOrMouse === "wheel") {
      if (!isScrolling) {
        ref.current.scrollTo({
          top: ref.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 800);
  }, []);
  useEffect(() => {
    function click() {
      if (species === "") {
        console.log("fired");
        input.current.focus();
      }
    }
    if (isVisible) {
      if (!input.current) {
        return undefined;
      }
      if (extra?.t === "input") {
        answer.current.addEventListener("click", click);
      }
    }
    return () => {
      if (answer.current) {
        answer.current.removeEventListener("click", click);
      }
    };
  }, [isVisible]);
  return (
    <>
      {isVisible ? (
        <>
          {" "}
          <button
            className={
              extra?.t === "input" ? "answer answer__down-padding" : "answer"
            }
            onClick={() => {
              if (extra) {
                if (extra.t === "state") {
                  dispatch(extra.fn(extra.arg));
                }
                if (extra.t === "rate") {
                  dispatch(changeLoyalty(extra.v));
                }
              }
              if (extra?.t === "input") {
                if (species === "") {
                  return undefined;
                }
              }
              onClick(index);
            }}
            ref={answer}
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
              ref={input}
            ></input>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default memo(forwardRef(Answer));
