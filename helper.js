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

