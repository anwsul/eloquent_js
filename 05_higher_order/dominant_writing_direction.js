let SCRIPTS = require('./scripts.js');

// takes in a unicode code point and returns the corresponding alphabet system
// ex: 121 -> Latin
function characterScript (code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => code >= from && code < to)) {
      return script;
    }
  }
  return null;
}

// computes the dominant writing direction in a string of text
function dominantDirection (text) {
  let directions = { "ltr": 0, "rtl": 0, "ttb": 0 };

  for (let character of text) {
    let script = characterScript(character.charCodeAt(0));
    if (script) {
      directions[script.direction] += 1;
    }
  }

  return Object.keys(directions).reduce((prev, current) => {
    return directions[prev] > directions[current] ? prev : current;
  });
}

console.log(dominantDirection("Hey, مساء الخير"));
