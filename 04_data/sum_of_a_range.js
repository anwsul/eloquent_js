function my_range (start, end) {
  _array = []
  for (let i = start; i <= end; i++) {
    _array.push(i);
  }

  return _array;
}

function my_sum (_array) {
  _sum = 0;
  for (let num of _array) {
    _sum += num;
  }

  return _sum;
}

console.log(my_sum(my_range(1, 10)));