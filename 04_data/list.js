function arrayToList (array) {
  if (array.length == 0) {
    return null;
  }

  let list = { value: array[0], rest: null };
  let current = list;

  for (let i = 1; i < array.length; i++) {
    current.rest = { value: array[i], rest: null };
    current = current.rest;
  }

  return list;
}

function listToArray (list) {
  if (list == null) {
    return [];
  }

  array = [list.value];
  next = list.rest;

  while (next) {
    array.push(next.value);
    next = next.rest;
  }

  return array;
}

// return a new list by prepending the element to the old list
function prepend (element, list) {
  return { value: element, rest: list };
}

// returns the element at a given position from the list
function nth (list, position) {
  if (list == null) {
    return null;
  }

  count = 0;
  current = list;
  while (count < position && current.rest != null) {
    current = current.rest;
    count += 1;
  }

  return current.value;
}
