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
  amountPurchased: 0,
};

const upgradeB: Upgrade = {
  upgradeButtonName: "upgradeBButton",
  cost: 100,
  countersPerSec: 2,
  amountPurchased: 0,
};

const upgradeC: Upgrade = {
  upgradeButtonName: "upgradeCButton",
  cost: 1000,
  countersPerSec: 50,
  amountPurchased: 0,
};

const allUpgrades: Upgrade[] = [upgradeA, upgradeB, upgradeC];

function counterRate(): number {
  let result = 0;
  for (const upgrade of allUpgrades) {
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
  for (const upgrade of allUpgrades) {
    rate += upgrade.countersPerSec * upgrade.amountPurchased;
  }
  formattedRate = rate.toFixed(2);
  console.log(rate);
  roundedCounter = counter.toFixed(2);
  if (roundedCounter == "1") {
    divElement.innerHTML = `${roundedCounter} treat!<br>${formattedRate} treats/sec`; //proper grammar
  } else {
    divElement.innerHTML = `${roundedCounter} treats!<br>${formattedRate} treats/sec`;
  }
}

//update the button text
function updateButtonElement() {
  for (const upgrade of allUpgrades) {
    const currentButton = document.querySelector(
      `button[name="${upgrade.upgradeButtonName}"]`,
    ) as HTMLButtonElement | null; //looking to see if there is a button element with the name
    if (currentButton) {
      let stringCost = (upgrade.cost).toFixed(2);
      currentButton.innerHTML = `${currentButton.id}: ${upgrade.amountPurchased}<br>Upgrade cost: ${stringCost}`;
    }
  }
}

//Upgrade buttons
const upgradeAButton: HTMLButtonElement = document.createElement("button");
upgradeAButton.innerHTML = `Upgrade A: ${upgradeA.amountPurchased}`;
upgradeAButton.id = `Upgrade A`;
upgradeAButton.disabled = true;
upgradeAButton.name = "upgradeAButton";
app.append(upgradeAButton);

const upgradeBButton: HTMLButtonElement = document.createElement("button");
upgradeBButton.innerHTML = `Upgrade B: ${upgradeB.amountPurchased}`;
upgradeBButton.id = `Upgrade B`;
upgradeBButton.disabled = true;
upgradeBButton.name = "upgradeBButton";
app.append(upgradeBButton);

const upgradeCButton: HTMLButtonElement = document.createElement("button");
upgradeCButton.innerHTML = `Upgrade C: ${upgradeC.amountPurchased}`;
upgradeCButton.id = `Upgrade C`;
upgradeCButton.disabled = true;
upgradeCButton.name = "upgradeCButton";
app.append(upgradeCButton);

//Disabled until ten
function unlockUpgrade() {
  for (const upgrade of allUpgrades) {
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
