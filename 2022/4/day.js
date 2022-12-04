import { AocClient, transforms } from "advent-of-code-client";
import * as dotenv from "dotenv";
dotenv.config();

const client = new AocClient({
  year: 2022,
  day: 4,
  token: process.env.AOC_TOKEN,
});

const input = await client.getInput();
client.setInputTransform(transforms.numbers);

const splitLine = (line) => {
  const [left, right] = line.split(",");

  const [ll, lr] = left.split("-");
  const [rl, rr] = right.split("-");

  return [Number(ll), Number(lr), Number(rl), Number(rr)];
};

const fullOverlap = (line) => {
  const [ll, lr, rl, rr] = splitLine(line);
  return (ll >= rl && lr <= rr) || (rl >= ll && rr <= lr);
};

const partialOverlap = (line) => {
  if (fullOverlap(line)) {
    return true;
  }

  const [ll, lr, rl, rr] = splitLine(line);
  return !(lr < rl || rr < ll);
};

// Part 1 - Code
export const part1 = (data) => {
  let count = 0;

  for (const line of data) {
    if (fullOverlap(line)) {
      count++;
    }
  }

  return count;
};

// Part 2 - Code
export const part2 = (data) => {
  let count = 0;

  for (const line of data) {
    if (partialOverlap(line)) {
      count++;
    }
  }

  return count;
};
