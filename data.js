const loc = new map ("Locations")
const player = new players ("Players")
const inv = new items ("Items")

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

loc.add(new Location({
    name: "Gas Station",
    options: ["Zombies!", "fuel", "food", "water", "materials", "tools"]
}));

inv.add(new item({"name": "First Aid Kit", "type": "medical", "description": "A kit containing medical supplies."}));

loc.add(new Location({
    name: "Pharmacy",
    safety: 0,
    options: [inv.getItem("medical"), inv.getItem("medical"), inv.getItem("medical"), inv.getItem("medical"), inv.getItem("medical"), inv.getItem("medical")]
}));

player.add(new Player({"name": "Matthew"}));



loc.n("Pharmacy").addChar(player.n("Matthew"));

loc.all().forEach((entry) => {
  log(entry)
});

player.all().forEach((entry) => {
  log(entry)
});

inv.all().forEach((entry) => {
  log(entry)
});
