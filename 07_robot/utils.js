/**
 * Randomly picks a value from a given array.
 * 
 * @param {Array} array - The array from which a random value is to be selected.
 * @returns {Object} A randomly selected value from the given array.
 */
function randomPick (array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

module.exports = randomPick;