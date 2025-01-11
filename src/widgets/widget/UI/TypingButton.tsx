import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/app/store";
import { changeIsTyping } from "@/app/features/mainStateSlice";

const TypingButton = () => {
  const isTyping = useSelector((state: RootState) => state.mainState.isTyping);
  const dispatch = useDispatch();
  return (
    <button
      className="sett-btn"
      onClick={() => {
        if (isTyping === true) {
          dispatch(changeIsTyping(false));
        } else {
          dispatch(changeIsTyping(true));
        }
      }}
    >
      Печатанье сообщений{isTyping ? " ВКЛ" : " ВЫКЛ"}
    </button>
  );
};

export default TypingButton;
