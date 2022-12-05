const fs = require("fs");
const input_array = fs.readFileSync("day2-input.txt").toString().split("\n");

const decodeOpponentMove = (code) => {
  switch (code) {
    case "A":
      return "rock";
      break;
    case "B":
      return "paper";
      break;
    case "C":
      return "scissors";
      break;
    default:
      console.error("nope2");
  }
};

const decodeMyMove = (code) => {
  switch (code) {
    case "X":
      return "rock";
      break;
    case "Y":
      return "paper";
      break;
    case "Z":
      return "scissors";
      break;
    default:
      console.error("nope1");
  }
};

const choiceScore = (move) => {
  switch (move) {
    case "rock":
      return 1;
      break;
    case "paper":
      return 2;
      break;
    case "scissors":
      return 3;
      break;
    default:
      console.error("nope4");
  }
};

const rockPaperScissors = (a, b) => {
  switch (a) {
    case "rock":
      switch (b) {
        case "rock":
          return 3;
          break;
        case "paper":
          return 0;
          break;
        case "scissors":
          return 6;
          break;
        default:
          console.error("nope");
      }
      break;
    case "paper":
      switch (b) {
        case "rock":
          return 6;
          break;
        case "paper":
          return 3;
          break;
        case "scissors":
          return 0;
          break;
        default:
          console.error("nope");
      }
      break;
    case "scissors":
      switch (b) {
        case "rock":
          return 0;
          break;
        case "paper":
          return 6;
          break;
        case "scissors":
          return 3;
          break;
        default:
          console.error("nope");
          break;
      }
    default:
      console.error("nope");
  }
};

const score1 = input_array.reduce((score, row) => {
  if (row == "") return score;
  const moves = row.split(" ");
  const theirMove = decodeOpponentMove(moves[0]);
  const myMove = decodeMyMove(moves[1]);
  return rockPaperScissors(myMove, theirMove) + choiceScore(myMove) + score;
}, 0);

const decodeMyPoints = (code) => {
  switch (code) {
    case "X":
      return 0;
      break;
    case "Y":
      return 3;
      break;
    case "Z":
      return 6;
      break;
    default:
      console.error("nope1");
  }
};
const reverseRockPaperScissors = (a, points) => {
  switch (a) {
    case "rock":
      switch (points) {
        case 3:
          return "rock";
          break;
        case 6:
          return "paper";
          break;
        case 0:
          return "scissors";
          break;
        default:
          console.error("nope");
      }
      break;
    case "paper":
      switch (points) {
        case 0:
          return "rock";
          break;
        case 3:
          return "paper";
          break;
        case 6:
          return "scissors";
          break;
        default:
          console.error("nope");
      }
      break;
    case "scissors":
      switch (points) {
        case 6:
          return "rock";
          break;
        case 0:
          return "paper";
          break;
        case 3:
          return "scissors";
          break;
        default:
          console.error("nope");
          break;
      }
    default:
      console.error("nope");
  }
};

const score2 = input_array.reduce((score, row) => {
  if (row == "") return score;
  const moves = row.split(" ");
  console.log(moves);
  const theirMove = decodeOpponentMove(moves[0]);
  const myPointsNeedes = decodeMyPoints(moves[1]);
  const myMove = reverseRockPaperScissors(theirMove, myPointsNeedes);

  console.log(choiceScore(myMove), myPointsNeedes);
  return myPointsNeedes + choiceScore(myMove) + score;
}, 0);

console.log(`Task 1: ` + score1);
console.log(`Task 2: ` + score2);
