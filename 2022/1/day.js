import { AocClient, transforms } from "advent-of-code-client";
import * as dotenv from "dotenv";
dotenv.config();

const client = new AocClient({
  year: 2022,
  day: 1,
  token: process.env.AOC_TOKEN,
});

const input = await client.getInput();
client.setInputTransform(transforms.numbers);

function groupSum(data) {
  const elves = [0];

  for (const calories of data) {
    if (calories === 0) {
      elves.push(0);
    }

    // Add the calories to the last elf
    elves[elves.length - 1] += calories;
  }

  return elves;
}

// Part 1 - Code
export const part1 = (data) => {
  return groupSum(data).sort((a, b) => b - a)[0];
};

// Part 2 - Code
export const part2 = (data) => {
  return groupSum(data)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((total, current) => total + current, 0);
};
