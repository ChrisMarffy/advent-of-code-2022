const fs = require("fs");

const file = fs.readFileSync("day5-input.txt");
// const file = fs.readFileSync("day5-input test.txt");
const input_sections = file.toString().split("\n\n");
const stackLines = input_sections[0].split("\n").filter((val) => val != "");
const instructions = input_sections[1].split("\n").filter((val) => val != "");

const stackNums = stackLines[stackLines.length - 1]
  .replace(/\s/g, "")
  .split("")
  .map((n) => Number(n));

const parseStackLine = (line) => {
  let boxArray = [];
  for (let index = 0; index < stackNums.length; index++) {
    boxArray.push(line.slice(index * 4 + 1, index * 4 + 2));
  }

  return boxArray;
};

const stacks = () =>
  stackNums.map((stackNum) => {
    let stack = [];
    stackLines
      .slice(0, stackLines.length - 1)
      .reverse()
      .forEach((line) => {
        const parsedStackLine = parseStackLine(line);
        stack.push(parsedStackLine[stackNum - 1]);
      });
    return stack.filter((val) => val != " " && val != "");
  });

const parseInstruction = (line) => {
  const regex = /move (\d*) from (\d*) to (\d*)/gm;
  const regexResults = regex.exec(line);
  return [
    Number(regexResults[1]),
    Number(regexResults[2]) - 1,
    Number(regexResults[3]) - 1,
  ];
};

const instructionsOnStacks = (stacks, reverse = true) => {
  let newStacks = [...stacks];
  instructions.forEach((line) => {
    const instructionNums = parseInstruction(line);
    const amount = instructionNums[0];
    const fromIndex = instructionNums[1];
    const toIndex = instructionNums[2];

    if (reverse) {
      newStacks[toIndex].push(
        ...newStacks[fromIndex]
          .slice(
            newStacks[fromIndex].length - amount,
            newStacks[fromIndex].length
          )
          .reverse()
      );
    } else {
      newStacks[toIndex].push(
        ...newStacks[fromIndex].slice(
          newStacks[fromIndex].length - amount,
          newStacks[fromIndex].length
        )
      );
    }

    newStacks[fromIndex] = newStacks[fromIndex].slice(
      0,
      newStacks[fromIndex].length - amount
    );
  });
  return newStacks;
};

console.log(
  `Task 1: ` +
    instructionsOnStacks(stacks())
      .map((stack) => stack[stack.length - 1])
      .join("")
);
console.log(
  `Task 2: ` +
    instructionsOnStacks(stacks(), false)
      .map((stack) => stack[stack.length - 1])
      .join("")
);
