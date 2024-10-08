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
app.append(divElement);

//Upgrade
interface Upgrade {
  upgradeButtonName: string;
  cost: number;
  countersPerSec: number;
  amountPurchased: number;
}

const upgradeA: Upgrade = {
  upgradeButtonName: "candyCollectorsButton",
  cost: 10,
  countersPerSec: 0.1,
  amountPurchased: 0,
};

const upgradeB: Upgrade = {
  upgradeButtonName: "chocolateChumsButton",
  cost: 100,
  countersPerSec: 2,
  amountPurchased: 0,
};

const upgradeC: Upgrade = {
  upgradeButtonName: "sugarSpecialistsButton",
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
    divElement.innerHTML = `${roundedCounter}<br>treat trick-or-treated!<br>${formattedRate} treats/sec`; //proper grammar
  } else {
    divElement.innerHTML = `${roundedCounter}<br>treats trick-or-treated!<br>${formattedRate} treats/sec`;
  }
}

//update the button text
function updateButtonElement() {
  for (const upgrade of allUpgrades) {
    const currentButton = document.querySelector(
      `button[name="${upgrade.upgradeButtonName}"]`,
    ) as HTMLButtonElement | null; //looking to see if there is a button element with the name
    if (currentButton) {
      const stringCost = upgrade.cost.toFixed(2);
      currentButton.innerHTML = `${currentButton.id}: ${upgrade.amountPurchased}<br>Upgrade cost: ${stringCost}`;
    }
  }
}

//Upgrade buttons
const candyCollectorsButton: HTMLButtonElement =
  document.createElement("button");
candyCollectorsButton.innerHTML = `Upgrade A: ${upgradeA.amountPurchased}`;
candyCollectorsButton.id = `Candy Collectors`;
candyCollectorsButton.disabled = true;
candyCollectorsButton.name = "candyCollectorsButton";
app.append(candyCollectorsButton);

const chocolateChumsButton: HTMLButtonElement =
  document.createElement("button");
chocolateChumsButton.innerHTML = `Upgrade B: ${upgradeB.amountPurchased}`;
chocolateChumsButton.id = `Chocolate Chums`;
chocolateChumsButton.disabled = true;
chocolateChumsButton.name = "chocolateChumsButton";
app.append(chocolateChumsButton);

const sugarSpecialistsButton: HTMLButtonElement =
  document.createElement("button");
sugarSpecialistsButton.innerHTML = `Upgrade C: ${upgradeC.amountPurchased}`;
sugarSpecialistsButton.id = `Sugar Specialists`;
sugarSpecialistsButton.disabled = true;
sugarSpecialistsButton.name = "sugarSpecialistsButton";
app.append(sugarSpecialistsButton);

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
