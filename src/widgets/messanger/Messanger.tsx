import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { Dispatch, SetStateAction } from "react";

import data from "@/app/data/data";

import Message from "./UI/Message";
import Answer from "./UI/Answer";

const isScrolling = { is: false };

function typeFn<S>(
  i: number,
  t: number,
  ie: string,
  setState: Dispatch<SetStateAction<S>>,
  className: string,
  block: HTMLElement | null
): void {
  if (className === "right-sms") {
    return undefined;
  }
  setState((prevState: S): S => {
    const newState = prevState + ie.charAt(i);
    return newState as S;
  });

  if (block && !isScrolling.is) {
    block.scrollTo({ top: block.scrollHeight, behavior: "smooth" });
  }
  setTimeout(function () {
    i < ie.length - 1
      ? typeFn<S>(i + 1, t, ie, setState, className, block)
      : false;
  }, t);
}

function hasTouch() {
  console.log(navigator.userAgent);

  if (
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/Android/i)
  ) {
    return true;
  } else return false;
}

const isTouch = hasTouch();

const Messanger = () => {
  const currentLocation: keyof RootState["navigation"]["routes"] = useSelector(
    (state: RootState) => state.navigation.currentLocation
  );
  let i: any = useSelector<RootState>((state) => {
    return state.navigation.routes[currentLocation];
  });
  let endI = i;
  let startI = parseInt((endI / 100).toFixed(0)) * 100;
  const [messagesHistory, setMessageHistory] = useState<any>([]);
  useLayoutEffect(() => {
    const mHistory = [];
    while (data[i as number] && i <= endI) {
      const part: any = {
        part: data[i as number],
        index: (i - startI) / 1,
      };
      if (i > startI) {
        part.isHidden = true;
        mHistory.push(part);
      } else {
        part.isHidden = false;
        mHistory.push(part);
      }
      (i as number) += 1;
    }
    setMessageHistory(mHistory);
  }, []);

  function scrollThrottlingFn() {
    let isThrottle = false;
    return (e: PointerEvent) => {
      if (!(e.target as Element).closest(".answer")) {
        if (!isThrottle) {
          isThrottle = true;
          isScrolling.is = true;
          setTimeout(() => {
            isScrolling.is = false;
          }, 7000);
          setTimeout(() => {
            isThrottle = false;
          }, 50);
        }
      }
    };
  }

  const fn = scrollThrottlingFn();
  const fn1 = (e: Event, block: HTMLElement) => {
    return () => {
      if (block.scrollTop === block.scrollHeight) {
        isScrolling.is = false;
      }
    };
  };

  useEffect(() => {
    const dialogueWindow = document.querySelector(
      ".dialogue-window"
    ) as HTMLElement;
    dialogueWindow.addEventListener("wheel", fn);
    dialogueWindow.addEventListener("scroll", fn1(event, dialogueWindow));
    if (isTouch) {
      dialogueWindow.addEventListener("click", fn);
    }
    return () => {
      dialogueWindow.removeEventListener("wheel", fn);
      dialogueWindow.removeEventListener("scroll", fn1(event, dialogueWindow));
      if (isTouch) {
        dialogueWindow.removeEventListener("click", fn);
      }
    };
  }, []);

  // !!!!ADD CLICK EVENT FOR TOUCH SCREENS

  function applyNewAnswer(partIndex: any, answerIndex: any) {
    setMessageHistory((prevState: any) => {
      const newState = JSON.parse(JSON.stringify(prevState));

      if (data[partIndex + 101]) {
        newState.push({
          part: data[partIndex + 101],
          index: partIndex + 1,
          isHidden: false,
        });
      }
      newState[partIndex].part.na = prevState[partIndex].part.na[answerIndex].a;
      newState[partIndex].part.r = prevState[partIndex].part.na[answerIndex].r;
      return newState;
    });
  }

  function changeTimeout(timeout: { t: number }, multiplier: number): void {
    timeout.t = 30 * multiplier;
    return undefined;
  }
  let timeout = { t: 0 };
  return (
    <section className="dialogue-window container" aria-label="Диалоговое окно">
      <div className="messanger">
        {messagesHistory.map((el: any, ind: any) => {
          return (
            <div key={ind}>
              <Message
                typeFn={typeFn}
                className="left-sms"
                text={el.part.q}
                isHidden={el.isHidden}
                timeout={timeout.t}
                isTyping={true}
                partIndex={el.index}
              />
              {typeof el.part.na === "object" ? (
                <div className="choose-answer">
                  {el.part.na.map((l: any, i: any) => {
                    return (
                      <Answer
                        text={l.a}
                        answerIndex={i}
                        partIndex={el.index}
                        onClick={applyNewAnswer}
                        isHidden={el.isHidden}
                        key={i}
                        timeout={el.part.q.length * 30 + timeout.t}
                      />
                    );
                  })}
                </div>
              ) : (
                <>
                  <Message
                    typeFn={typeFn}
                    text={el.part.na}
                    className="right-sms"
                    isHidden={el.isHidden}
                    timeout={0}
                    isTyping={false}
                    partIndex={el.index}
                  />
                  <Message
                    typeFn={typeFn}
                    text={el.part.r}
                    className="left-sms"
                    isHidden={el.isHidden}
                    timeout={0}
                    isTyping={true}
                    partIndex={el.index}
                  />
                  {changeTimeout(timeout, el.part.r.length)}
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Messanger;
