import React, { useMemo, useState } from "react";
import { localData } from "../data/localData";
import LifeBlock from "../UI/LifeBlock";

const LifeBlocks = () => {
  const [activeBlocks, setActiveBlocks] = useState(localData.map(() => false));
  const [visibilityLifeBlocks, setVisibility] = useState(true);
  const [messages, setMessages] = useState<string[]>([]);
  function chooseBlockHandler(index: number) {
    setActiveBlocks((prevState) => {
      const copy = [...prevState];
      return copy.map((el, ind) => {
        if (index === ind) {
          return true;
        } else {
          return el;
        }
      });
    });
    setVisibility(false);
    setMessages((prevState) => {
      const copy = [...prevState];
      copy.push(localData[index].q);
      return copy;
    });
    setTimeout(() => {
      setMessages((prevState) => {
        const copy = [...prevState];
        copy.push(localData[index].a);
        return copy;
      });
    }, 600);
    setTimeout(() => {
      setVisibility(true);
    }, 1200);
  }
  const blocks: JSX.Element[] = useMemo(() => {
    return localData.map((block, i) => (
      <LifeBlock
        text={block.q}
        index={i}
        inactive={activeBlocks[i]}
        onClick={chooseBlockHandler}
      />
    ));
  }, [activeBlocks]);
  return (
    <>
      {messages.map((text, ind) => {
        if (ind % 2 === 0) {
          return (
            <div className="sms-wrapper">
              <div className="sms right-sms">{text}</div>
            </div>
          );
        } else {
          return (
            <div className="sms-wrapper">
              <div className="sms left-sms current-sms left-current-sms">
                {text}
              </div>
            </div>
          );
        }
      })}{" "}
      {visibilityLifeBlocks ? <div className="life-blocks">{blocks}</div> : ""}
    </>
  );
};

export default LifeBlocks;
