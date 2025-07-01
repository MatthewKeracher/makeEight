//Turn Sequence
let timeSlot = 3;
let day = 1;

function help() {
  log(`nextTurn(): moves time forward.`);
  log(`scavenge(): search Location.`);
  log(`walk("n"|"e"|"s"|"w"): move to another Location.`);
  log(`fortify(): increase safety at Location. Requires materials.`);
  log(`use(item name): Use item in inventory.`);
  log(`sleep(): recover 1d6 energy.`);
  log(`play(): recover 1 morale. Requires Toy.`);
}

function nextTurn() {

  console.clear()

  for (const location of loc.all()) {
    if (location.occupants.length > 0 && location.zombies > 0) {
      return `Cannot proceed while ${location.occupants[0].name} is facing zombies at the ${location.name}!`;
    }
  }
  timeSlot++;

  if (timeSlot > 6) {
    timeSlot = 1; // Reset to first time slot after reaching the last one
    day++;
  }

  let timeNow = "";

  switch (timeSlot) {
    case 1:
      timeNow = `Day: ${day}, Time: 00:00 - 04:00`;
      player.removeFromPlayers("morale");
      loc.removeFromLocations("safety");
      function addZombies() {
        for (const location of loc.all()) {
          if (location.occupants.length > 0 && location.safety === 0) {
            location.zombies = location.zombies + rand(1, 6);
            return `You encounter ${location.zombies} zombies in the ${location.name}.`;
          }
        }
      }
      addZombies();
      break;
    case 2:
      timeNow = `Day: ${day}, Time: 04:00 - 08:00`;
      player.removeFromPlayers("food");
      break;
    case 3:
      timeNow = `Day: ${day}, Time: 08:00 - 12:00`;
      player.removeFromPlayers("water");
      break;
    case 4:
      timeNow = `Day: ${day}, Time: 12:00 - 16:00`;
      player.removeFromPlayers("food");
      break;
    case 5:
      timeNow = `Day: ${day}, Time: 16:00 - 20:00`;
      player.removeFromPlayers("water");
      break;
    case 6:
      timeNow = `Day: ${day}, Time: 20:00 - 24:00`;
      break;
  }

  player.all().forEach((player) => {
    player.hasActed = false;
  });

  const me = player.n("Matthew")

  log(`You have: 
    ${me.ammo} Ammo
    ${me.energy} Energy
    ${me.food} Food
    ${me.fuel} Fuel
    ${me.materials} Materials
    ${me.morale} Morale
    ${me.water} Water`);

    me.inventory.forEach(item => log(item.name, `${item.wear}/${item.quality}`))

    log(`You are at ${me.location.name}:
    ${me.location.safety} Safety (fortify)
    ${me.location.zombies} Zombies`)

    log(`Scavenge() here for chance of:
    1. ${me.location.options[0]} 
    2. ${me.location.options[1]} 
    3. ${me.location.options[2]} 
    4. ${me.location.options[3]} 
    5. ${me.location.options[4]} 
    6. ${me.location.options[5]}`);

  return timeNow;
}

//1. New Time Slot (4 Hours):

//1: 00:00 - 04:00
//2: 04:00 - 08:00
//3: 08:00 - 12:00
//4: 12:00 - 16:00
//5: 16:00 - 20:00
//6: 20:00 - 24:00

//1.5 Resolve Needs: Refer to the clock, each timeslot requires 1 of the following tokens, it may be:

// - Food Token: 1 per player. Can pay for other players sharing the same hex tile.
// - Water Token: 1 per player. Can pay for other platers sharing the same hex tile.
// - Morale Token: 1 per player.

//2. Players act simultaneously, choosing an action for their character.

//2.5 Resolve Possible Actions:
//a. Move to another location:
// - Walk to an adjascent hextile.
// - Cycle to a hex tile up to 2 tiles away.
// - Drive to a hex tile up to a distance equal to fuel tokens spent.

//b. Search current hex tile:
// - Roll 1d6 and refer to options on hex tile. Rolling a 1 always means Zombies.

//Zombies:

//If you Encounter Zombies, roll a 1d6 for the Zombie strength. The next roll must be higher than this to escape.

// If the number is very high, the player can use weapons to lower the number.
// Melee Weapons reduce the number by 1.
// Guns reduce the number equal to ammo spent.

// If the roll fails, player can use armour to roll again.

//Example Location: Abandoned Gas Station
// - 1: Zombies!
// - 2: Fuel Tokens (1d6)
// - 3: Food Tokens (1d6)
// - 4: Water Tokens (1d6)
// - 5: Materials (1d6)
// - 6: Tools (1d6)

//Some Locations may be more dangerous, with more options being Zombies. Others may have special options.

//Example Location: Pharmacy
// - 1: Zombies!
// - 2: Safe Key (1)
// - 3: Food Tokens (1d6)
// - 4: Water Tokens (1d6)
// - 5: Materials (1d6)
// - 6: Safe, Locked (1) [1d6 Pills]

//Here, the Safe Key is required to open the Safe, which may contain useful items.

//*Note for Design:* Think of each location as telling a story through the combinaiton of the different items.
// How could different locations interact with each other?

//c. Rest:
// Sleep for 4 hours to recover equivalent of half your total Action Points (energy). [Requires at least 1 safety token on the title.]

//d. Fortify:
// - Fortify Location: Make 8 combining [Tool] + [Material] + [1 energy/1d6] to add a safety token to the hex tile.

//e. Maintain Equipment:
// - Repair Item: Make 8 combining [Tool] + [Object] + [1 energy/1d6] to repair an item. (Harder to repair items in worse condition!)
// - Upgrade Item:

//e. Leisure:
// Increases Morale. Make 8 combining [Toy] + [1 energy/1d6] + [1 for every other person playing] to increase morale by 1d6.
