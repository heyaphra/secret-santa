//Raul =1
//Carla=2

// overall while loop to iterate throughout the whole sequence of picking for 6 people

/*

names = [1,2,3,4,5,6]
partners = [2,]

*/


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
    console.log("Choosing person for", secretSanta.name, "to give gifts to.")

    // Execute pairing process
    while (pairing) {
        // Pick a random index
        let randomIndex = Math.floor(Math.random() * unassigned_receiver.length);
        // Pick a random person according to the random index
        let giftReceiver = unassigned_receiver[randomIndex];
        if (giftReceiver.name !== secretSanta.name && giftReceiver.name !== secretSanta.partner) {

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


console.log(results)



      // console.log(secretSanta.name, "has been assigned to", giftReceiver.name);
            // console.log("\n");
            // console.log("Removing", giftReceiver.name, "from unassigned receivers");
            // console.log("\n")
            // console.log("Unassigned receivers left:", unassigned_receiver)

            // console.log("People who have not been assigned to give gifts:", unassigned_santa);
            // console.log("\n");
            // console.log("People who have been assigned to give gifts:", assigned_santa);
            // console.log("\n");
            // console.log("Pairings so far:", results)