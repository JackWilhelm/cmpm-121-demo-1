import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazing, awesome, spectacular game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Counter
let counter: number = 990;
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

//Upgrade
interface Upgrade {
  upgradeButtonName: string;
  cost: number;
  countersPerSec: number;
  amountPurchased: number;
}

const upgradeA: Upgrade = {
  upgradeButtonName: "upgradeAButton",
  cost: 10,
  countersPerSec: 0.1,
  amountPurchased: 0
}

const upgradeB: Upgrade = {
  upgradeButtonName: "upgradeBButton",
  cost: 100,
  countersPerSec: 2,
  amountPurchased: 0
}

const upgradeC: Upgrade = {
  upgradeButtonName: "upgradeCButton",
  cost: 1000,
  countersPerSec: 50,
  amountPurchased: 0
}

const allUpgrades: Upgrade[] = [
  upgradeA,
  upgradeB,
  upgradeC
];

function counterRate(): number {
  let result = 0;
  for (const upgrade of allUpgrades) {
    const currentButton = document.querySelector(`button[name="${upgrade.upgradeButtonName}"]`) as HTMLButtonElement | null;//looking to see if there is a button element with the name
    if (currentButton) { //check if button is null
      if (!currentButton.disabled) {
        result += ((performance.now() - lastTime) / 1000) * (upgrade.countersPerSec * upgrade.amountPurchased);
      }
    }
  }
  return result;
}

//Every second counter goes up one whole unit
function updateCounterTime() {
  counter += counterRate() ;
  lastTime = performance.now();
  updateDivElement();
  unlockUpgrade();
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

//Upgrade buttons
const upgradeAButton: HTMLButtonElement = document.createElement("button");
upgradeAButton.innerHTML = "Upgrade A";
upgradeAButton.disabled = true;
upgradeAButton.name = "upgradeAButton";
app.append(upgradeAButton);


const upgradeBButton: HTMLButtonElement = document.createElement("button");
upgradeBButton.innerHTML = "Upgrade B";
upgradeBButton.disabled = true;
upgradeBButton.name = "upgradeBButton";
app.append(upgradeBButton);

const upgradeCButton: HTMLButtonElement = document.createElement("button");
upgradeCButton.innerHTML = "Upgrade C";
upgradeCButton.disabled = true;
upgradeCButton.name = "upgradeCButton";
app.append(upgradeCButton);

//Disabled until ten
function unlockUpgrade() {
  for (const upgrade of allUpgrades) {
    const currentButton = document.querySelector(`button[name="${upgrade.upgradeButtonName}"]`) as HTMLButtonElement | null;//looking to see if there is a button element with the name
    if (currentButton) { //check if button is null
      if (currentButton.disabled && counter >= upgrade.cost) {
        console.log(upgrade.upgradeButtonName);
        currentButton.disabled = false;
        currentButton.addEventListener("click", () => {
          if (counter >= upgrade.cost) {
            counter -= upgrade.cost;
            upgrade.amountPurchased += 1;
          }
        });
      }
    }
  }
}
