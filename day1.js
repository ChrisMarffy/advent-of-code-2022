const fs = require("fs");
const input_array = fs.readFileSync("day1-input.txt").toString().split("\n");

const elfKnapsacks = input_array.reduce((knapsack, row) => {
  if (row == "") {
    return [...knapsack, 0];
  } else {
    return [
      ...knapsack.slice(0, -1),
      (knapsack[knapsack.length - 1] | 0) + Number(row),
    ];
  }
}, []);

const top3summed = elfKnapsacks
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((a, b) => a + b, 0);

console.log(`Task 1: ` + Math.max(...elfKnapsacks));
console.log(`Task 2: ` + top3summed);
