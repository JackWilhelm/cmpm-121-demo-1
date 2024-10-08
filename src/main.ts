import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazing, awesome, spectacular game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Counter
let counter: number = 0;
let lastTime: number = performance.now();
function updateCounter() {
  counter++;
  console.log(counter);
  updateDivElement();
}

//Button
const button: HTMLButtonElement = document.createElement("button");
button.innerHTML = "🍬";
app.append(button);
button.addEventListener("click", () => {
  updateCounter();
});

//divElement
const divElement: HTMLDivElement = document.createElement("div");
divElement.id = "Trick or Treat!"; //Unit Label
divElement.innerHTML = `${counter} treats!`;
app.append(divElement);

//Every second counter goes up one whole unit
function updateCounterTime() {
  counter += (performance.now() - lastTime)/1000;
  lastTime = performance.now();
  updateDivElement();
  requestAnimationFrame(updateCounterTime);
}
requestAnimationFrame(updateCounterTime);

//update the Text
function updateDivElement() {
  if (counter == 1) {
    divElement.textContent = `${counter} treat!`; //proper grammar
  } else {
    divElement.textContent = `${counter} treats!`;
  }
}


