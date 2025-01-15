import { useDispatch, useSelector } from "react-redux";

import { changeTypingSpeed } from "@/app/features/mainStateSlice";
import { RootState } from "@/app/store";

const LanguageButton = () => {
  const typingSpeed = useSelector(
    (state: RootState) => state.mainState.typingSpeed
  );
  const dispatch = useDispatch();
  return (
    <button
      className="sett-btn btn-display"
      onClick={() => {
        dispatch(changeTypingSpeed());
      }}
    >
      Скорость печатанья{" "}
      {typingSpeed === 1
        ? "СРЕДНЯЯ"
        : typingSpeed === 0.5
        ? "НИЗКАЯ"
        : "ВЫСОКАЯ"}
    </button>
  );
};

export default LanguageButton;
