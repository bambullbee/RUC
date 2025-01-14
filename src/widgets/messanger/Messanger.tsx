import {
  Dispatch,
  forwardRef,
  memo,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

import data from "@/app/data/data";

import Message from "./UI/Message";
import Answer from "./UI/Answer";
import Banner from "../../entities/Banner/components/Banner";

function isEventSupported(eventName: keyof HTMLDivElement) {
  var el = document.createElement("div");
  (eventName as string) = "on" + eventName;
  var isSupported = eventName in el;
  if (!isSupported) {
    el.setAttribute(eventName, "return;");
    isSupported = typeof el[eventName as keyof HTMLDivElement] == "function";
  }
  el = null;
  return isSupported;
}

function hasTouch() {
  if (
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/Android/i)
  ) {
    return true;
  } else return false;
}

const isTouch = hasTouch();

let touchOrMouse = isEventSupported("touchmove" as keyof HTMLDivElement)
  ? "touchmove"
  : "wheel";

if (touchOrMouse === "wheel" && isTouch) {
  touchOrMouse = "iPhone";
}

interface messangerPropsI {
  isScrolling: boolean;
  setIsScrolling: Dispatch<SetStateAction<boolean>>;
}

const Messanger = memo(
  forwardRef(({ isScrolling, setIsScrolling }: messangerPropsI, ref) => {
    // !!!
    const isTyping = useSelector((state: RootState) => {
      return state.mainState.isTyping;
    });
    const restart = useSelector(
      (state: RootState) => state.navigation.isRestarted
    );
    const messangerBlock = useRef(null);
    const currentLocation: keyof RootState["navigation"]["routes"] =
      useSelector((state: RootState) => state.navigation.currentLocation);
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
    }, [currentLocation, restart]);

    useEffect(() => {
      const el = messangerBlock.current;
      function wheelHandler() {
        setIsScrolling(true);
      }

      if (touchOrMouse !== "iPhone") {
        el.addEventListener(touchOrMouse, wheelHandler);
      }

      return () => {
        if (touchOrMouse !== "iPhone") {
          el.removeEventListener(touchOrMouse, wheelHandler);
        }
      };
    }, []);

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
        newState[partIndex].part.na =
          prevState[partIndex].part.na[answerIndex].a;
        newState[partIndex].part.r =
          prevState[partIndex].part.na[answerIndex].r;
        return newState;
      });
    }

    function changeTimeout(timeout: { t: number }, multiplier: number): void {
      timeout.t = 30 * multiplier + 1500;
      return undefined;
    }
    let timeout = { t: 0 };
    return (
      <>
        {" "}
        <section
          className="dialogue-window container"
          ref={messangerBlock}
          aria-label="Диалоговое окно"
        >
          <div className="messanger">
            {messagesHistory.map((el: any, ind: any) => {
              return (
                <div key={ind}>
                  <Message
                    className="left-sms"
                    text={el.part.q}
                    isHidden={el.isHidden}
                    timeout={timeout.t}
                    isTyping={true}
                    partIndex={el.index}
                    ref={messangerBlock}
                    isScrolling={isScrolling}
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
                            timeout={el.part.q.length * 30 + timeout.t + 1000}
                            ref={messangerBlock}
                            isScrolling={isScrolling}
                            extra={l.extra ? l.extra : null}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <>
                      <Message
                        text={el.part.na}
                        className="right-sms"
                        isHidden={el.isHidden}
                        timeout={0}
                        isTyping={false}
                        partIndex={el.index}
                        ref={messangerBlock}
                        isScrolling={isScrolling}
                      />
                      <Message
                        text={el.part.r}
                        className="left-sms"
                        isHidden={el.isHidden}
                        timeout={0}
                        isTyping={true}
                        partIndex={el.index}
                        ref={messangerBlock}
                        isScrolling={isScrolling}
                      />
                      {changeTimeout(timeout, el.part.r.length)}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </>
    );
  })
);

export default Messanger;
