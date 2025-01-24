import { RootState } from "@/app/store";
import { store } from "@/app/store";

export function processStringBySex(string: string): string {
  const arrayString = string.split("");
  const sex = store.getState().profile.sex;
  for (let i = 0; i < arrayString.length; i++) {
    if (arrayString[i] === "s") {
      if (sex === "female") {
        arrayString[i] = "a";
      } else {
        arrayString[i] = "";
      }
    }
    if (arrayString[i] === "b") {
      if (sex === "female") {
        arrayString[i - 1] = "ь";
        arrayString[i] = "";
      } else {
        arrayString[i] = "";
      }
    }
  }
  return arrayString.join("");
}
