import { useDispatch, useSelector } from "react-redux";

import { changeLanguage } from "@/app/features/mainStateSlice";
import { RootState } from "@/app/store";

const LanguageButton = () => {
  const language = useSelector((state: RootState) => state.mainState.language);
  const dispatch = useDispatch();
  return (
    <button
      className="sett-btn btn-display"
      onClick={() => {
        if (language === "russian") {
          dispatch(changeLanguage("kitties"));
        } else {
          dispatch(changeLanguage("russian"));
        }
      }}
    >
      Язык {language === "russian" ? "РУССКИЙ" : "КОТЯЧИЙ"}
    </button>
  );
};

export default LanguageButton;
