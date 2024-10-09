import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazing, awesome, spectacular game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

document.body.style.fontFamily = '"Papyrus", fantasy, sans-serif';
document.body.style.color = "orange";

//Counter
let counter: number = 0;
let lastTime: number = performance.now();
let rate: number = 0;
let formattedRate: string = rate.toFixed(2);
let roundedCounter: string = counter.toFixed(2);
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
button.style.fontSize = "128px";
button.style.border = "none";
button.style.padding = "0";
button.style.backgroundColor = "transparent";

//divElement
const divElement: HTMLDivElement = document.createElement("div");
divElement.id = "Trick or Treat!"; //Unit Label
divElement.innerHTML = `${counter} treats!`;
divElement.style.fontSize = "36px";
app.append(divElement);

//Upgrade
interface Item {
  upgradeButtonName: string;
  cost: number;
  countersPerSec: number;
  amountPurchased: number;
  description: string;
  name: string;
}

const availableItems: Item[] = [
  {
    upgradeButtonName: "candyCollectorsButton",
    cost: 10,
    countersPerSec: 0.1,
    amountPurchased: 0,
    description: "Your run of the mill trick or treaters at your service",
    name: "Candy Collectors",
  },
  {
    upgradeButtonName: "chocolateChumsButton",
    cost: 100,
    countersPerSec: 2,
    amountPurchased: 0,
    description:
      "These guys really know their chocolates ... and where to find them",
    name: "Chocolate Chums",
  },
  {
    upgradeButtonName: "sugarSpecialistsButton",
    cost: 1000,
    countersPerSec: 50,
    amountPurchased: 0,
    description: "Experts on all things toothache-inducing",
    name: "Sugar Specialists",
  },
  {
    upgradeButtonName: "bigBarBraniacsButton",
    cost: 5000,
    countersPerSec: 200,
    amountPurchased: 0,
    description: "The mathmatical masters of finding the biggest candy bars",
    name: "Big Bar Braniacs",
  },
  {
    upgradeButtonName: "sweettoothTrackersButton",
    cost: 10000,
    countersPerSec: 1000,
    amountPurchased: 0,
    description: "Hunters on the best deals for candy",
    name: "Sweettooth Trackers",
  },
];

function counterRate(): number {
  let result = 0;
  for (const upgrade of availableItems) {
    const currentButton = document.querySelector(
      `button[name="${upgrade.upgradeButtonName}"]`,
    ) as HTMLButtonElement | null; //looking to see if there is a button element with the name
    if (currentButton) {
      //check if button is null
      if (!currentButton.disabled) {
        result +=
          ((performance.now() - lastTime) / 1000) *
          (upgrade.countersPerSec * upgrade.amountPurchased);
      }
    }
  }
  return result;
}

//Every second counter goes up one whole unit
function updateCounterTime() {
  counter += counterRate();
  lastTime = performance.now();
  updateDivElement();
  updateButtonElement();
  unlockUpgrade();
  requestAnimationFrame(updateCounterTime);
}
requestAnimationFrame(updateCounterTime);

/*
let secondCounter = counter;
setInterval(() => {console.log(rate, (counter - secondCounter).toFixed(1));
  secondCounter = counter;
}, 1000);
*/ //Rate tester

//update the Text
function updateDivElement() {
  rate = 0;
  for (const upgrade of availableItems) {
    rate += upgrade.countersPerSec * upgrade.amountPurchased;
  }
  formattedRate = rate.toFixed(2);
  console.log(rate);
  roundedCounter = counter.toFixed(2);
  if (roundedCounter == "1") {
    divElement.innerHTML = `${roundedCounter}<br>treat trick-or-treated!<br>${formattedRate} treats/sec`; //proper grammar
  } else {
    divElement.innerHTML = `${roundedCounter}<br>treats trick-or-treated!<br>${formattedRate} treats/sec`;
  }
}

//update the button text
function updateButtonElement() {
  for (const upgrade of availableItems) {
    const currentButton = document.querySelector(
      `button[name="${upgrade.upgradeButtonName}"]`,
    ) as HTMLButtonElement | null; //looking to see if there is a button element with the name
    if (currentButton) {
      const stringCost = upgrade.cost.toFixed(2);
      currentButton.innerHTML = `${currentButton.id}: ${upgrade.amountPurchased}<br>Upgrade cost: ${stringCost}<br><br>${upgrade.description}`;
    }
  }
}

//Upgrade buttons
const buttonArray: HTMLButtonElement[] = [];
for (const upgrade of availableItems) {
  const button = document.createElement("button");
  button.id = upgrade.name;
  button.disabled = true;
  button.name = upgrade.upgradeButtonName;
  app.append(button);
  buttonArray.push(button);
}

function unlockUpgrade() {
  for (const upgrade of availableItems) {
    const currentButton = document.querySelector(
      `button[name="${upgrade.upgradeButtonName}"]`,
    ) as HTMLButtonElement | null; //looking to see if there is a button element with the name
    if (currentButton) {
      //check if button is null
      if (currentButton.disabled && counter >= upgrade.cost) {
        console.log(upgrade.upgradeButtonName);
        currentButton.disabled = false;
        currentButton.addEventListener("click", () => {
          if (counter >= upgrade.cost) {
            counter -= upgrade.cost;
            upgrade.amountPurchased += 1;
            upgrade.cost *= 1.15;
          }
        });
      }
    }
  }
}
