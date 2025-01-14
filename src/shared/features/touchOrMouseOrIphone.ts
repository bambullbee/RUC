function isEventSupported(eventName: keyof HTMLDivElement) {
  var el = document.createElement("div");
  (eventName as string) = "on" + eventName;
  var isSupported = eventName in el;
  if (!isSupported) {
    el.setAttribute(eventName, "return;");
    isSupported = typeof el[eventName as keyof HTMLDivElement] == "function";
  }
  el = null;
  return isSupported;
}

function hasTouch() {
  if (
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/Android/i)
  ) {
    return true;
  } else return false;
}

const isTouch = hasTouch();

let touchOrMouse = isEventSupported("touchmove" as keyof HTMLDivElement)
  ? "touchmove"
  : "wheel";

if (touchOrMouse === "wheel" && isTouch) {
  touchOrMouse = "iPhone";
}

export default touchOrMouse;
