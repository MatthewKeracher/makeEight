class players {
  constructor() {
    this.characters = [];
  }

  n(name) {
    let result = this.characters.find(
      (ent) => ent.name.toUpperCase() === name.toUpperCase()
    );

    return checkForUndefined(result, `characters.n(${name})`);
  }

  search(name) {
    let result = this.characters.filter(
      //filter first.
      (char) => char.name.toUpperCase().includes(name.toUpperCase())
    );

    if (result.length === 1) {
      result = result[0];
    }

    return checkForUndefined(result, `characters.n(${name})`);
  }

  add(data) {
    //Character, Location, etc.
    this.characters.push(data);
    return this.characters;
  }

  all() {
    return this.characters;
  }

  delete(key, value) {
    this.characters = this.characters.filter((ent) => ent[key] !== value);
    return this.characters;
  }

  removeFromPlayers(variable) {
    this.characters.forEach((char) => {
      if (char[variable] === 0) {
        //If none of food/water, character loses 1 Energy instead.
        if (char.energy !== 0) {
          console.warn(`${char.name} has no ${variable} to lose.`);
          char.energy = Math.max(0, char.energy - 1);
          console.warn(`${char.name} has lost 1 Action Point.`);
        } else {
          console.error(
            `${char.name} has no Actions Points Left. They are dead!`
          );
          return;
        }
      } else {
        char[variable] = Math.max(0, char[variable] - 1);
        console.log(
          `${char.name} has lost ${variable}. Current ${variable}: ${char[variable]}`
        );
      }
    });
  }
}

class Player {
  name = "";
  location = [];
  hasActed = false;

  energy = 0;
  morale = 0;
  food = 0;
  water = 0;
  fuel = 0;
  materials = 0;
  tools = 0;
  morale = 0;

  inventory = [];

  constructor(char) {
    this.name = char?.name || "New Player";
    this.hasActed = false;

    this.food = rand(5, 10);
    this.water = rand(5, 10);
    this.fuel = 0;
    this.materials = 0;
    this.tools = 0;
    this.morale = rand(5, 10);
    this.energy = rand(5, 10);

    this.inventory = [];
  }

  goTo(location) {
    this.location = location;
    location.addChar(this);
  }

  loseEnergy() {
    this.energy = this.energy - 1;
    this.hasActed = true;

    if (this.energy === 3) {
      console.warn(`Your energy is low, you should rest soon.`);
    }

    if (this.energy === 0) {
      console.error(`Your energy is depleted, you cannot perform any actions.`);
      this.sleep();
    }
  }

  fortify() {
    if (this.hasActed) {
      return `${this.name} has already acted this turn.`;
    }

    if (this.materials === 0) {
      return `You do not have enough materials to fortify your position.`;
    } else {
      this.materials--;
      this.location.safety++;
      this.loseEnergy();

      return `You fortify your position at ${this.location.name}. Current safety: ${this.location.safety}.`;
    }
  }

  sleep() {
    if (this.location.safety === 0) {
      return `You cannot sleep here, it is not safe.`;
    }

    if (this.hasActed) {
      return `${this.name} has already acted this turn.`;
    }

    this.energy = this.energy + rand(1, 6);

    if (this.energy >= 12) {
      this.energy = 12;
    }

    this.hasActed = true;

    return `You get some sleep, and now have ${this.energy} energy.`;
  }

  scavenge() {
    if (this.energy <= 0) {
      return `${this.name} has no Action Points left to scavenge.`;
    }

    if (this.hasActed) {
      return `${this.name} has already acted this turn.`;
    }

    const rollResult = rand(1, 6);
    const result = this.location.options[rollResult - 1];
    const amountFound = rand(1, 6);

    this.loseEnergy();

    if (rollResult === 1) {
      return `You have encountered zombies! You must flee!`;
    } else if (typeof result === "object") {
      this.inventory.push(result);
    }else {
      this[result] = this[result] + amountFound;
      return (
        `You have found ${amountFound} ${result} at ${this.location.name}. You now have ${this[result]} ${result}.` ||
        "Nothing found."
      );
    }
  }
}
