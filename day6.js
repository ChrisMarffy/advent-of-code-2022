const fs = require("fs");

const file = fs.readFileSync("day6-input.txt");
// const file = fs.readFileSync("day6-input test.txt");
const input_string = file.toString().split("\n")[0];

const hasDuplicates = (array) => {
  return new Set(array).size !== array.length;
};

const findFirstPacket = (input_string, string_match_length) => {
  let index = string_match_length;
  while (index <= input_string.length) {
    const latest4 = input_string.slice(index - string_match_length, index);
    if (!hasDuplicates(latest4.split(""))) {
      return index;
    }
    index++;
  }
};

console.log(`Task 1: ` + findFirstPacket(input_string, 4));
console.log(`Task 2: ` + findFirstPacket(input_string, 14));
