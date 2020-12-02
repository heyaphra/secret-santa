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
  pairing = true;
  const secretSanta = unassigned_santa[0];
  while (pairing) {
    let randomIndex = Math.floor(Math.random() * unassigned_receiver.length);
    let giftReceiver = unassigned_receiver[randomIndex];
    if (
      giftReceiver.name !== secretSanta.name &&
      giftReceiver.name !== secretSanta.partner
    ) {
      assigned_santa.push(unassigned_santa.shift());
      unassigned_receiver.splice(randomIndex, 1);
      assigned_receiver.push(giftReceiver);
      results[secretSanta.name] = giftReceiver;
      pairing = false;
    } else {
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
  prompts.push(
    {
      name: santa,
      type: "confirm",
      message: i % 2 ? chalk.green.bold(message) : chalk.red.bold(message),
    },
    {
      name: "intermission",
      type: "confirm",
      message:
        i % 3
          ? chalk.green.bold("Write it down and hit enter to prepare it for the next santa!")
          : chalk.red.bold("Write it down and hit enter to prepare it for the next santa!"),
    }
  );
  i++;
}

(async () => {
  for (const p in prompts) {
    if (prompts[p].name === "intermission") {
      await prompt(prompts[p])
      console.clear();
    } else {
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
  }
})();
