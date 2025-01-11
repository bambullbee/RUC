import React from "react";

import LanguageButton from "../UI/LanguageButton";
import ThemeButton from "../UI/ThemeButton";
import RestartButton from "../UI/RestartButton";
import TypingButton from "../UI/TypingButton";
import { bubblePropsI } from "../types/types";

const Settings = ({ style }: bubblePropsI) => {
  return (
    <div className="sett" style={{ opacity: style }}>
      <LanguageButton />
      <ThemeButton />
      <RestartButton />
      <TypingButton />
    </div>
  );
};

export default Settings;
