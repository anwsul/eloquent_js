// flatten arrays
let arrays = [[1, 2, 3], [4, 5], [6]];

let merged = arrays.reduce((acc, curr) => acc.concat(curr));
let vals = [1, 2, 3];
console.log(merged);