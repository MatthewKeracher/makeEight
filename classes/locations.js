class map {
  constructor() {
    this.locations = [];
  }

  n(name) {
    let result = this.locations.find(
      (loc) => loc.name.toUpperCase() === name.toUpperCase()
    );

    return checkForUndefined(result, `locations.n(${name})`);
  }

  search(name) {
    let result = this.locations.filter(
      //filter first.
      (loc) => loc.name.toUpperCase().includes(name.toUpperCase())
    );

    if (result.length === 1) {
      result = result[0];
    }

    return checkForUndefined(result, `locations.n(${name})`);
  }

  add(data) {
    //Character, Location, etc.
    this.locations.push(data);
    return this.locations;
  }

  all() {
    return this.locations;
  }

  delete(key, value) {
    this.locations = this.locations.filter((ent) => ent[key] !== value);
    return this.locations;
  }

  removeFromLocations(variable) {
    this.locations.forEach((loc) => {
      if (loc.occupants.length > 0) {
        if (loc.safety === 0) {
          console.error(`${loc.name} has no safety to lose.`);
          console.error(`Zombies are attacking ${loc.name}!`);
        } else {
          loc[variable] = Math.max(0, loc[variable] - 1);
          console.log(
            `${loc.name} has lost ${variable}. Current ${variable}: ${loc[variable]}`
          );
        }
      }
    });
  }
}

class Location {
  name = "";
  options = {};
  safety = 0;
  occupants = [];
  zombies = 0;

  constructor(loc) {
    this.name = loc?.name || "Empty Location";
    this.options = loc?.options || [];
    this.safety = loc?.safety || rand(1, 6);
    this.occupants = loc?.occupants || [];
    this.zombies = 0;
  }

  addChar(occupant) {
    const exists = this.occupants.includes(occupant);
    if (!exists) {
      this.occupants.push(occupant);
      occupant.location = this;
      // occupant.note(`Entered ${this.name}`, `${occupant.name} went to ${this.name}`)
      return `${occupant.name} is now at ${this.name}.`;
    } else {
      return `${occupant.name} is already at ${this.name}.`;
    }
  }

  remChar(occupant) {
    this.occupants = this.occupants.filter((o) => o !== occupant);
    occupant.location = {};
  }

  zombies() {
    const zombies = rand(1, 6);
    console.error(`You have encountered ${zombies} zombies!`);
  }
}



