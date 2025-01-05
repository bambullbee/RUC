import { useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

import data from "@/app/data/data";

import Message from "./UI/Message";
import Answer from "./UI/Answer";

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
      // if (newState[partIndex + 1]) {
      //   newState[partIndex + 1].isHidden = !newState[partIndex + 1].isHidden;
      // }
      return newState;
    });
  }

  function changeTimeout(timeout: { t: number }, multiplier: number): void {
    timeout.t = 30 * multiplier;
    return undefined;
  }
  // dev
  function checkTimeout(...args: any[]): undefined {
    console.log(...args);
    return undefined;
  }
  let timeout = { t: 0 };
  return (
    <section className="dialogue-window container" aria-label="Диалоговое окно">
      <div className="messanger">
        {messagesHistory.map((el: any, ind: any) => {
          return (
            <div key={ind}>
              {/* {checkTimeout(timeout, el.part.q)} */}
              <Message
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
                    text={el.part.na}
                    className="right-sms"
                    isHidden={el.isHidden}
                    timeout={0}
                    isTyping={false}
                    partIndex={el.index}
                  />
                  <Message
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
