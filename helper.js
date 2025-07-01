function log(...args) {
    console.log(...args);
  }

function rand(num1, num2) {
  return (
    Math.floor(Math.random() * (Math.abs(num2 - num1) + 1)) +
    Math.min(num1, num2)
  );
}

function checkForUndefined(result, string){
    if(result){
    return result
    }else{
    return `Could not do ${string}`
    } 
}

function compass(dir, coords){

  let compass = {x:0, y:0}

    if (dir === "n" || dir === "north") {
      compass.x = coords.x + 0
      compass.y = coords.y + 1
    }

    if (dir === "s" || dir === "south") {
       compass.x = coords.x + 0
       compass.y = coords.y - 1
    }

    if (dir === "e" || dir === "east") {
      compass.x = coords.x + 1
      compass.y = coords.y + 0
    }

    if (dir === "w" || dir === "west"){
      compass.x = coords.x - 1
      compass.y = coords.y + 0
    }

    const location = loc.all().find(entry => 
        entry.coords.x === compass.x &&
        entry.coords.y === compass.y
       )

       if(location === undefined){ 
       return {name: `nothing`}
       }

       return location;

  }

