// using loop
function every1 (array, test) {
  for (let value of array) {
    if (!test(value)) {
      return false;
    }
  }

  return true;
}

// using some method
function every2 (array, test) {
  return !array.some((value) => !test(value));
}

