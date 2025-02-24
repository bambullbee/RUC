import React, {
  forwardRef,
  memo,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import LifeBlocks from "./components/LifeBlocks";

const Life = ({}, ref: MutableRefObject<HTMLElement>) => {
  useEffect(() => {
    ref.current.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="life">
      {" "}
      <div className="sms-wrapper">
        <div className="sms left-sms">
          Этот раздел создан для того, чтобы автор не забывал о том, как жить и
          не грустить. Здесь же и читатель может найти для себя слова, которые
          помогут в трудной ситуации. В любом случае, сюда вложена частичка моей
          души, и при желании вы можете с ней немного познакомиться.
        </div>
      </div>
      <LifeBlocks />
    </div>
  );
};

export default memo(forwardRef(Life));
