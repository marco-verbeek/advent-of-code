import { AocClient, transforms } from "advent-of-code-client";
import * as dotenv from "dotenv";
dotenv.config();

const client = new AocClient({
  year: 2022,
  day: 6,
  token: process.env.AOC_TOKEN,
});

const input = await client.getInput();
//client.setInputTransform(transforms.lines);

const checkAllDifferent = (last4) => {
  const set = new Set();

  for (let i = 0; i < last4.length; i++) {
    set.add(last4[i]);
  }

  return set.size === last4.length;
};

// Part 1 - Code
export const part1 = (data) => {
  const last4 = [];

  let idx = 0;
  for (const char of data) {
    if (last4.length === 4) {
      last4.shift();
    }

    last4.push(char);
    idx++;

    if (last4.length === 4 && checkAllDifferent(last4)) {
      break;
    }
  }

  return idx;
};

// Part 2 - Code
export const part2 = (data) => {
  const last14 = [];

  let idx = 0;
  for (const char of data) {
    if (last14.length === 14) {
      last14.shift();
    }

    last14.push(char);
    idx++;

    if (last14.length === 14 && checkAllDifferent(last14)) {
      break;
    }
  }

  return idx;
};
