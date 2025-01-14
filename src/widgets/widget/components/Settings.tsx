import React from "react";

import LanguageButton from "../UI/SettingsUI/LanguageButton";
import ThemeButton from "../UI/SettingsUI/ThemeButton";
import RestartButton from "../UI/SettingsUI/RestartButton";
import TypingButton from "../UI/SettingsUI/TypingButton";
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
