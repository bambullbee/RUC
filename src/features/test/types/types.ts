type setCurrentMessageTypeT = "question" | "answers" | "answer" | "response";

interface extraI {
  t?: "rate" | "state" | "input";
  fn?: (arg: string | number | undefined) => {
    type: string;
    action: string | number | undefined;
  };
  arg?: string | number;
  v?: number;
}

export { setCurrentMessageTypeT, extraI };
