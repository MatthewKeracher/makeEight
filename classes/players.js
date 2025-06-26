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
  ammo = 0;
  materials = 0;
  tools = 0;
  morale = 0;

  inventory = [];

  constructor(char) {
    this.name = char?.name || "New Player";
    this.hasActed = false;

    this.food = rand(1, 6);
    this.water = rand(1, 6);
    this.fuel = 0;
    this.ammo = 6;
    this.materials = 0;
    this.tools = 0;
    this.morale = rand(1, 6);
    this.energy = rand(1, 6);

    this.inventory = [];
  }

  goTo(location) {
    if (this.location.zombies > 0) {
      const fleeRoll = rand(1, 6);
      log("Roll against Zombies...");
      log(`You roll a ${fleeRoll} against the ${this.location.zombies}`);

      if (fleeRoll <= this.location.zombies) {
        
        return `The zombies have bitten you. Game Over.`;
      }

    } else if (this.hasActed) {
      return `${this.name} has already acted this turn.`;
    }

    this.loseEnergy();

    this.location.remChar(this);
    this.location = location;
    location.addChar(this);

    log(`${this.name} has gone to the ${this.location.name}.`)
    log(`Available to scavenge()`, this.location.options)

    return this;
  }

  loseEnergy() {
    this.energy = this.energy - 1;
    this.hasActed = true;

    if (this.energy === 3) {
      console.warn(`You have ${this.energy} energy left, you should rest soon.`);
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

    if (this.location.zombies > 0) {
      return `You cannot do this with zombies nearby.`;
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

    if (this.location.zombies > 0) {
      return `You cannot do this with zombies nearby.`;
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
      return `${this.name} has no Energy to scavenge. They should sleep first.`;
    }

    if (this.hasActed) {
      return `${this.name} has already acted this turn.`;
    }

    if (this.location.zombies > 0) {
      return `You cannot do this with zombies nearby.`;
    }

    const rollResult = 1 //rand(1, 6);
    const result = this.location.options[rollResult - 1];
    const amountFound = rand(1, 6);

    this.loseEnergy();

    if (rollResult === 1) {
      //Zombies
      this.location.zombies = this.location.zombies + rand(1, 6);
      return `You encounter ${this.location.zombies} zombies in the ${this.location.name}.`;
    } else if (typeof result === "object") {
      this.inventory.push({ ...result });
      return `You have found ${result.name} at the ${this.location.name}.`;
    } else {
      this[result] = this[result] + amountFound;
      return (
        `You have found ${amountFound} ${result} at the ${this.location.name}. You now have ${this[result]} ${result}.` ||
        "Nothing found."
      );
    }
  }

  play() {
    if (this.energy <= 0) {
      return `${this.name} has no Energy to play. They should sleep first.`;
    }

    if (this.hasActed) {
      return `${this.name} has already acted this turn.`;
    }

    if (this.location.zombies > 0) {
      return `You cannot do this with zombies nearby.`;
    }

    const toys = this.inventory.filter((item) => item.type === "toy");

    if (toys && toys.length > 0) {
      this.loseEnergy();
      let moraleBoost = this.location.occupants.length;
      return `You gain ${moraleBoost} Morale from playing with ${toys[0].name}.`;
    } else {
      return `You need something to play with.`;
    }
  }

  use(name) {
    // if (this.energy <= 0) {
    //   return `${this.name} has no Energy to play. They should sleep first.`;
    // }

    // if (this.hasActed) {
    //   return `${this.name} has already acted this turn.`;
    // }

    //Check I have the item.
    const item = this.inventory.find((item) => item.name === name);
    console.log(item);

    if (item !== undefined) {
      if (item.effect === "None") {
        return `You gaze blankly at the ${item.name}, unsure what to do with it.`;
      }

      if (item.wear === item.quality) {
        return `You cannot use ${item.name}. It is broken or empty.`;
      }

      item.wear++;

      const rollResult = rand(item.range[0], item.range[1]);

      if(item.effect === "zombies"){
      
        if(item.type === "melee"){
          this.energy --
          this.location[item.effect] =  this.location[item.effect] - rollResult;
          return `You kill ${rollResult} zombie with the ${item.name}. There are ${this.location.zombies} zombies left. You have ${this.energy} bullet left.`
        }else if (item.type === "ranged" && this.ammo > 0){
          this.ammo --
          this.location[item.effect] =  this.location[item.effect] - rollResult;
          return `You kill ${rollResult} zombie with the ${item.name}. There are ${this.location.zombies} zombies left. You have ${this.ammo} bullet left.`;
        }

      }else{
      this[item.effect] = this[item.effect] + rollResult;
       return `You gain ${rollResult} ${item.effect} from using ${item.name}.`;
      }
    
    } else {
      return `You do not have "${name}" in your inventory.`;
    }
  }
}

