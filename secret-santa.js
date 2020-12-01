const { prompt } = require("enquirer");
const chalk = require("chalk");

class Person {
  constructor(name, partner) {
    this.name = name;
    this.partner = partner;
  }
}

const Raul = new Person("Raul", "Carla");
const Carla = new Person("Carla", "Raul");
const Meg = new Person("Meg", "Aidan");
const Aidan = new Person("Aidan", "Meg");
const Natalie = new Person("Natalie", "Maxine");
const Maxine = new Person("Maxine", "Natalie");

let unassigned_santa = [Raul, Carla, Meg, Aidan, Natalie, Maxine];
let unassigned_receiver = [Raul, Carla, Meg, Aidan, Natalie, Maxine];

let assigned_santa = [];
let assigned_receiver = [];

let results = {};

let pairing;
let mismatch = 0;
while (unassigned_santa.length) {
  // Reset pairing process
  pairing = true;
  // Select an secretSanta
  const secretSanta = unassigned_santa[0];
  // Execute pairing process
  while (pairing) {
    // Pick a random index
    let randomIndex = Math.floor(Math.random() * unassigned_receiver.length);
    // Pick a random person according to the random index
    let giftReceiver = unassigned_receiver[randomIndex];
    if (
      giftReceiver.name !== secretSanta.name &&
      giftReceiver.name !== secretSanta.partner
    ) {
      // move giver from unassigned_santa to assigned_santa
      assigned_santa.push(unassigned_santa.shift());
      // move gift receiver to assigned_to_Receive
      unassigned_receiver.splice(randomIndex, 1);
      assigned_receiver.push(giftReceiver);
      results[secretSanta.name] = giftReceiver;
      pairing = false;
    } else {
      // If this part of the loop has occurred more than 6 times, than restart the entire pairing process.
      mismatch++;
      if (mismatch > 6) {
        unassigned_santa = [Raul, Carla, Meg, Aidan, Natalie, Maxine];
        unassigned_receiver = [Raul, Carla, Meg, Aidan, Natalie, Maxine];
        assigned_santa = [];
        assigned_receiver = [];
        results = {};
        pairing = false;
        mismatch = 0;
      }
    }
  }
}

const prompts = [];
let i = 1;
for (const santa in results) {
  const message = `Ok, ${santa}, you're up! Make sure nobody's looking. Are you ready? Hit that return key!`;
  prompts.push({
    name: santa,
    type: "confirm",
    message: i % 2 ? chalk.green.bold(message) : chalk.red.bold(message),
  });
  i++;
}

(async () => {
  for (const p in prompts) {
    const santa_prompt = prompts[p];
    const santa_name = prompts[p].name;
    const result = results[santa_name].name;
    const response = await prompt(santa_prompt);
    console.log(
      chalk.white.bold(
        `\n \n ${santa_name} has been elected santa for ${result}! \n \n`
      )
    );
  }
})();
