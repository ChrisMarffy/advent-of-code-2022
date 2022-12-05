const fs = require("fs");
const input_array = fs.readFileSync("day3-input.txt").toString().split("\n");
// const input_array = fs
//   .readFileSync("day3-input test.txt")
//   .toString()
//   .split("\n");

const elfKnapsacksWithCompartments = input_array
  .filter((val) => val != "")
  .map((contents) => {
    const compartmentSize = Math.floor(contents.length / 2);
    return [
      contents.slice(0, compartmentSize),
      contents.slice(compartmentSize),
    ];
  });

const isUpperCase = (letter) => {
  return letter.toUpperCase() === letter;
};

const priority = (letter) => {
  if (isUpperCase(letter)) {
    return letter.charCodeAt(0) - 38;
  } else {
    return letter.charCodeAt(0) - 96;
  }
};

const commonElsBetweenCompartments = elfKnapsacksWithCompartments
  .map((compartments) => {
    const commonElement = compartments[0]
      .split("")
      .filter((elA) => compartments[1].split("").includes(elA))
      .filter((val) => val != "");

    return [...new Set(commonElement)];
  })
  .flat();

const prioritySums = (els) =>
  els.reduce((sum, el) => {
    return sum + priority(el);
  }, 0);

console.log(`Task 1: ` + prioritySums(commonElsBetweenCompartments));

const elfKnapsacksInGroupings = input_array
  .filter((val) => val != "")
  .reduce((arr, item) => {
    if (arr.length > 0 && arr[arr.length - 1].length < 3) {
      return [...arr.slice(0, arr.length - 1), [...arr[arr.length - 1], item]];
    } else {
      return [...arr, [item]];
    }
  }, []);

const commonBadgeEls = elfKnapsacksInGroupings
  .map((group) => {
    console.log(group);
    const commonElement = group[0]
      .split("")
      .filter((elA) => group[1].split("").includes(elA))
      .filter((elA) => group[2].split("").includes(elA))
      .filter((val) => val != "");

    return [...new Set(commonElement)];
  })
  .flat();

console.log(`Task 2: ` + prioritySums(commonBadgeEls));
