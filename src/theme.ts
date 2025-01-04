export default function applyTheme() {
  const body = document.querySelector("body");
  //   const themeTrigger = document.querySelector(".s-1");
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    body.classList.add("dark");
  }
  //   themeTrigger.addEventListener("click", () => {
  //     body.classList.toggle("dark");
  //   });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      const newColorScheme = event.matches ? true : false;
      if (newColorScheme) {
        body.classList.add("dark");
      } else {
        body.classList.remove("dark");
      }
    });
}
