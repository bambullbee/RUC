type currentLocation =
  | "about"
  | "sett"
  | "prof"
  | "quests"
  | "dict"
  | "menu"
  | "none";

type initialMainState = {
  theme: "dark" | "light";
  personality: string;
  language: "russian" | "kitties";
  isTyping: boolean;
};

export { currentLocation, initialMainState };
