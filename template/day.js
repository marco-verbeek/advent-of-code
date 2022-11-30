import { AocClient, transforms } from "advent-of-code-client";
import * as dotenv from "dotenv";
dotenv.config();

const client = new AocClient({
  year: 2021,
  day: 1,
  token: process.env.AOC_TOKEN,
});

const input = await client.getInput();
client.setInputTransform(transforms.numbers);

// Part 1 - Code
export const part1 = (data) => {
  return 0;
};

// Part 2 - Code
export const part2 = (data) => {
  return 0;
};
