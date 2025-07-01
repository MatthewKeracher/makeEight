const player = new players("Players");
const loc = new map("Locations");
const inv = new Items("Items");


//medicine
inv.add(
  new Item({
    name: "Happy Pills",
    type: "medical",
    description: "Increase Morale by 1d6.",
    effect: "morale",
  })
);
inv.add(
  new Item({
    name: "Energy Pills",
    type: "medical",
    description: "Increase Energy by 1d6.",
    effect: "energy",
    wear: 0,
    quality: 5,
  })
);

//tools
inv.add(
  new Item({
    name: "Screwdriver",
    type: "tool",
    description: "A handheld tool for screwing.",
  })
);
inv.add(
  new Item({
    name: "Flashlight",
    type: "tool",
    description: "Illuminates dark areas. Requires batteries to operate.",
  })
);

inv.add(
  new Item({
    name: "Multi-tool",
    type: "tool",
    description:
      "A compact device with pliers, knife, and screwdriver attachments.",
  })
);

inv.add(
  new Item({
    name: "Duct Tape",
    type: "tool",
    description: "Can be used to repair broken equipment or seal small wounds.",
  })
);

//melee weapons
inv.add(
  new Item({
    name: "Crowbar",
    type: "melee",
    effect: "zombies",
    range: [1, 1],
    description:
      "Useful for prying open doors or crates. Can double as a weapon.",
  })
);

//ranged weapons
inv.add(
  new Item({
    name: "Handgun",
    type: "ranged",
    effect: "zombies",
    range: [1, 1],
    description: "Can shoot zombies, requires ammo tokens to fire.",
  })
);

//armor
inv.add(
  new Item({
    name: "Motorcycle Helmet",
    type: "armor",
    description: "Takes damage from Zombies instead of you.",
  })
);

inv.add(
  new Item({
    name: "Stab Vest",
    type: "armor",
    description: "Takes damage from Zombies instead of you.",
  })
);

//toys
inv.add(
  new Item({
    name: "Playing Cards",
    type: "toy",
    description: "Can be used with leisure to gain morale.",
  })
);

loc.add(
  new Location({
    name: "Hunting Store",
    options: [
      "zombies",
      "ammo",
      "food",
      "water",
      inv.getItem("toy"),
      inv.getItem("ranged"),
    ],
  })
);

loc.add(
  new Location({
    name: "Gas Station",
    options: [
      "zombies",
      "fuel",
      "food",
      "water",
      inv.getItem("toy"),
      inv.getItem("tool"),
    ],
  })
);

loc.add(
  new Location({
    name: "Pharmacy",
    safety: 0,
    options: [
      "zombies",
      inv.getItem("medical"),
      "food",
      "water",
      "materials",
      inv.getItem("medical"),
    ],
  })
);

loc.add(
  new Location({
    name: "Hardware Store",
    safety: 0,
    options: [
      "zombies",
      inv.getItem("armor"),
      "zombies",
      inv.getItem("tool"),
      "materials",
      inv.getItem("melee"),
    ],
  })
);

loc.add(
  new Location({
    name: "Diner",
    safety: 0,
    options: [
      "zombies",
      "food",
      "zombies",
      "water",
      "food",
      inv.getItem(),
    ],
  })
);

//after locations have been made, assign coordinates to each entry

function setCoords() {
  const locations = loc.all();
  let index = 0;
  for (let y = 1; y <= 6; y++) {
    for (let x = 1; x <= 5; x++) {
      if (index < locations.length) {
        log(locations[index])
        locations[index].coords.x = x;
        locations[index].coords.y = y;
        index++;
      }
    }
  }
}

setCoords();
loc.map();

player.add(new Player({ name: "Matthew" }));

// loc.all().forEach((entry) => {
//   log(entry)
// });

// inv.all().forEach((entry) => {
//   log(entry)
// });

player.n("Matthew").location = loc.n("Pharmacy");
loc.n("Pharmacy").occupants.push(player.n("Matthew"));



//Starting Items
player.n("Matthew").inventory.push({ ...inv.n("Crowbar") });
player.n("Matthew").inventory.push({ ...inv.n("Handgun") });
player.n("Matthew").inventory.push({ ...inv.n("Stab Vest") });

nextTurn();

const me = player.n("Matthew")
log(`type help() for functions`)


const nextTurnButton = document.getElementById("nextTurn")
nextTurnButton.addEventListener("click", function() {
  nextTurn();
});
