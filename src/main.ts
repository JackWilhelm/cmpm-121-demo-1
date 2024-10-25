import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazing, awesome, spectacular game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

document.body.style.fontFamily = '"Papyrus", fantasy, sans-serif';
document.body.style.color = "orange";

let counter: number = 0;
let lastTime: number = performance.now();
let rate: number = 0;
let formattedRate: string = rate.toFixed(2);
let roundedCounter: string = counter.toFixed(2);
const upgradeCostMultiplier = 1.15;
function updateCounter() {
  counter++;
  updateTreatDisplay();
}

const treatButton: HTMLButtonElement = document.createElement("button");
treatButton.innerHTML = "🍬";
app.append(treatButton);
treatButton.addEventListener("click", () => {
  updateCounter();
});
treatButton.style.fontSize = "128px";
treatButton.style.border = "none";
treatButton.style.padding = "0";
treatButton.style.backgroundColor = "transparent";

const treatsDisplay: HTMLDivElement = document.createElement("div");
treatsDisplay.id = "Trick or Treat!"; //Unit Label
treatsDisplay.innerHTML = `${counter} treats!`;
treatsDisplay.style.fontSize = "36px";
app.append(treatsDisplay);

//Upgrade
interface Item {
  upgradeButtonName: string;
  cost: number;
  treatsPerSec: number;
  amountPurchased: number;
  description: string;
  name: string;
}

const availableItems: Item[] = [
  {
    upgradeButtonName: "candyCollectorsButton",
    cost: 10,
    treatsPerSec: 0.1,
    amountPurchased: 0,
    description: "Your run of the mill trick or treaters at your service",
    name: "Candy Collectors",
  },
  {
    upgradeButtonName: "chocolateChumsButton",
    cost: 100,
    treatsPerSec: 2,
    amountPurchased: 0,
    description:
      "These guys really know their chocolates ... and where to find them",
    name: "Chocolate Chums",
  },
  {
    upgradeButtonName: "sugarSpecialistsButton",
    cost: 1000,
    treatsPerSec: 50,
    amountPurchased: 0,
    description: "Experts on all things toothache-inducing",
    name: "Sugar Specialists",
  },
  {
    upgradeButtonName: "bigBarBraniacsButton",
    cost: 5000,
    treatsPerSec: 200,
    amountPurchased: 0,
    description: "The mathmatical masters of finding the biggest candy bars",
    name: "Big Bar Braniacs",
  },
  {
    upgradeButtonName: "sweettoothTrackersButton",
    cost: 10000,
    treatsPerSec: 1000,
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
        result += getUpgradeIncrease(upgrade);
      }
    }
  }
  return result;
}

function getUpgradeIncrease(upgrade: Item): number {
  const timeSinceLastTick: number = (performance.now() - lastTime) / 1000; //1000 for time conversion
  const upgradeRate: number = upgrade.treatsPerSec * upgrade.amountPurchased;
  return timeSinceLastTick * upgradeRate;
}

//Every second counter goes up one whole unit
function updateCounterTime() {
  updateCounterState();
  updateVisuals();
  upgradeUnlockCheck();
  requestAnimationFrame(updateCounterTime);
}
requestAnimationFrame(updateCounterTime);

function updateCounterState() {
  counter += counterRate();
  lastTime = performance.now();
}

function updateVisuals() {
  updateTreatDisplay();
  updateButtonElement();
}

function updateTreatDisplay() {
  rate = 0;
  for (const upgrade of availableItems) {
    rate += upgrade.treatsPerSec * upgrade.amountPurchased;
  }
  formattedRate = rate.toFixed(2);
  roundedCounter = counter.toFixed(2);
  if (roundedCounter == "1") {
    treatsDisplay.innerHTML = `${roundedCounter}<br>treat trick-or-treated!<br>${formattedRate} treats/sec`; //proper grammar
  } else {
    treatsDisplay.innerHTML = `${roundedCounter}<br>treats trick-or-treated!<br>${formattedRate} treats/sec`;
  }
}

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

function upgradeUnlockCheck() {
  for (const upgrade of availableItems) {
    const currentButton = document.querySelector(
      `button[name="${upgrade.upgradeButtonName}"]`,
    ) as HTMLButtonElement | null; //looking to see if there is a button element with the name
    if (currentButton) {
      //check if button is null
      unlockUpgrade(currentButton, upgrade);
    }
  }
}

function unlockUpgrade(currentButton: HTMLButtonElement, upgrade: Item) {
  if (currentButton.disabled && counter >= upgrade.cost) {
    currentButton.disabled = false;
    currentButton.addEventListener("click", () => {
      if (counter >= upgrade.cost) {
        counter -= upgrade.cost;
        upgrade.amountPurchased += 1;
        upgrade.cost *= upgradeCostMultiplier;
      }
    });
  }
}
