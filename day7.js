const fs = require("fs");

const file = fs.readFileSync("day7-input.txt");
// const file = fs.readFileSync("day7-input test.txt");
const input_string = file
  .toString()
  .split("\n")
  .filter((val) => val != "");

const getCurrDir = (dirPath, directories) =>
  dirPath.reduce(function (o, name) {
    return o && o[name];
  }, directories);

const process_directories = (input) => {
  const directories = { "/": {} };
  const currDirPath = [];
  input.forEach((line) => {
    if (line.startsWith("$ cd")) {
      if (line == "$ cd ..") {
        currDirPath.pop();
      } else {
        currDirPath.push(line.slice(5));
      }
    } else if (line == "$ ls") {
      //ignore
    } else if (line.startsWith("dir ")) {
      getCurrDir(currDirPath, directories)[line.slice(4)] = {};
    } else {
      const regexResults = /(\d*) ([a-zA-Z.]*)/gm.exec(line);

      getCurrDir(currDirPath, directories)[regexResults[2]] = regexResults[1];
    }
  });
  return directories;
};

const calcDirectorySize = (directory) => {
  let size = 0;
  if (typeof directory != "object") {
    return Number(directory);
  }
  for (const file in directory) {
    size += calcDirectorySize(directory[file]);
  }
  return size;
};

const findDirSizes = (directories, key_prefix = []) => {
  let sizes = {};

  for (const file in directories) {
    if (typeof directories[file] == "object") {
      sizes[[...key_prefix, file].join("/")] = calcDirectorySize(
        directories[file]
      );
      sizes = {
        ...sizes,
        ...findDirSizes(directories[file], [...key_prefix, file]),
      };
    }
  }

  return sizes;
};

const filteredSizes = (dirSizes) => {
  return Object.keys(dirSizes)
    .filter((key) => dirSizes[key] <= 100000)
    .reduce((obj, key) => {
      obj[key] = dirSizes[key];
      return obj;
    }, {});
};

const sumDirSizes = (dirs) => {
  let sum = 0;
  for (const key in dirs) {
    sum += dirs[key];
  }
  return sum;
};

const smallestDirToDelete = (directory_sizes) => {
  const current = directory_sizes["/"];
  const total = 70000000;
  const needed = 30000000;

  const amount_to_free = needed - (total - current);

  const dirs_big_enough = Object.keys(directory_sizes)
    .filter((key) => directory_sizes[key] >= amount_to_free)
    .reduce((obj, key) => {
      obj[key] = directory_sizes[key];
      return obj;
    }, {});

  return Math.min(...Object.values(dirs_big_enough));
};

console.log(
  `Task 1: ` +
    sumDirSizes(filteredSizes(findDirSizes(process_directories(input_string))))
);
console.log(
  `Task 2: ` +
    smallestDirToDelete(findDirSizes(process_directories(input_string)))
);
