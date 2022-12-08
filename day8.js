const fs = require("fs");

const file = fs.readFileSync("day8-input.txt");
// const file = fs.readFileSync("day8-input test.txt");
const rowLines = file
  .toString()
  .split("\n")
  .filter((val) => val != "");

const rows = rowLines.map((rowText) => rowText.split("").map((c) => Number(c)));

const rowLength = rows[0].length;
const columnHeight = rowLines.length;

const visible = (x, y) => {
  if (x == 0 || y == 0 || x == rowLength - 1 || y == columnHeight - 1) {
    return true;
  } else {
    let blockedLeft = false;
    let blockedRight = false;
    let blockedTop = false;
    let blockedBottom = false;

    for (let xtree = x - 1; xtree >= 0; xtree--) {
      if (rows[y][xtree] >= rows[y][x]) {
        blockedLeft = true;
      }
    }
    for (let xtree = x + 1; xtree < rowLength; xtree++) {
      if (rows[y][xtree] >= rows[y][x]) {
        blockedRight = true;
      }
    }
    for (let ytree = y - 1; ytree >= 0; ytree--) {
      if (rows[ytree][x] >= rows[y][x]) {
        blockedBottom = true;
      }
    }
    for (let ytree = y + 1; ytree < columnHeight; ytree++) {
      if (rows[ytree][x] >= rows[y][x]) {
        blockedTop = true;
      }
    }

    if (blockedLeft && blockedRight && blockedTop && blockedBottom)
      return false;
  }

  return true;
};

let numVisible = 0;
for (let x = 0; x < rowLength; x++) {
  for (let y = 0; y < columnHeight; y++) {
    if (visible(x, y)) {
      numVisible += 1;
    }
  }
}

const viewDistanceScore = (x, y) => {
  let leftTreesVisible = 0;
  let rightTreesVisible = 0;
  let topTreesVisible = 0;
  let bottomTreesVisible = 0;
  if (x == 0 || y == 0 || x == rowLength - 1 || y == columnHeight - 1) {
    return 0;
  } else {
    for (let xtree = x - 1; xtree >= 0; xtree--) {
      leftTreesVisible++;
      if (rows[y][xtree] >= rows[y][x]) {
        break;
      }
    }
    for (let xtree = x + 1; xtree < rowLength; xtree++) {
      rightTreesVisible++;
      if (rows[y][xtree] >= rows[y][x]) {
        break;
      }
    }
    for (let ytree = y - 1; ytree >= 0; ytree--) {
      bottomTreesVisible++;
      if (rows[ytree][x] >= rows[y][x]) {
        break;
      }
    }
    for (let ytree = y + 1; ytree < columnHeight; ytree++) {
      topTreesVisible++;
      if (rows[ytree][x] >= rows[y][x]) {
        break;
      }
    }
  }
  return (
    leftTreesVisible * rightTreesVisible * bottomTreesVisible * topTreesVisible
  );
};

let topScore = 0;
for (let x = 0; x < rowLength; x++) {
  for (let y = 0; y < columnHeight; y++) {
    if (viewDistanceScore(x, y) > topScore) {
      topScore = viewDistanceScore(x, y);
    }
  }
}

console.log(`Task 1: ` + numVisible);
console.log(`Task 2: ` + topScore);
