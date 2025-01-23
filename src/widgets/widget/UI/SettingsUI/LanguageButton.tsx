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
      Печатать{" "}
      {typingSpeed === 30
        ? "ОБЫЧНО"
        : typingSpeed === 20
        ? "БЫСТРО"
        : "МЕДЛЕННО"}
    </button>
  );
};

export default LanguageButton;
