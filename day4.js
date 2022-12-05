const fs = require("fs");
const input_array = fs
  .readFileSync("day4-input.txt")
  .toString()
  .split("\n")
  .filter((val) => val != "");
// const input_array = fs
//   .readFileSync("day4-input test.txt")
//   .toString()
//   .split("\n")
//   .filter((val) => val != "");

const elfPairs = input_array.map((row) =>
  row
    .split(",")
    .map((elfRange) => elfRange.split("-").map((num) => Number(num)))
);

const fullyContainedPairs = elfPairs.filter(
  (pair) =>
    (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
    (pair[1][0] >= pair[0][0] && pair[1][1] <= pair[0][1])
);

const overlappedAtAll = elfPairs.filter(
  (pair) =>
    (pair[0][0] >= pair[1][0] && pair[0][0] <= pair[1][1]) ||
    (pair[0][1] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
    (pair[1][0] >= pair[0][0] && pair[1][0] <= pair[0][1]) ||
    (pair[1][1] >= pair[0][0] && pair[1][1] <= pair[0][1])
);

console.log(`Task 1: ` + fullyContainedPairs.length);
console.log(`Task 2: ` + overlappedAtAll.length);
