function reverseArray (array) {
  _newArray = [];

  for (let i = array.length - 1; i >= 0; i--) {
    _newArray.push(array[i]);
  }

  return _newArray;
}

function reverseArrayInPlace (array) {
  _diff = array.length - 1;

  for (let i = 0; _diff > 0; i++) {
    temp = array[i];
    array[i] = array[i + _diff];
    array[i + _diff] = temp;
    _diff -= 2;
  }
}