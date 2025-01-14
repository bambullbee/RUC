function generateRandomColor() {
  let maxVal = 0xffffff; // 16777215
  let randomNumber: string | number = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, "0");
  return `#${randColor.toUpperCase()}`;
}

console.log(generateRandomColor());

export default generateRandomColor;
