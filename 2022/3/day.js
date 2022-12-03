import { AocClient, transforms } from "advent-of-code-client";
import * as dotenv from "dotenv";
dotenv.config();

const client = new AocClient({
  year: 2022,
  day: 3,
  token: process.env.AOC_TOKEN,
});

const input = await client.getInput();
client.setInputTransform(transforms.lines);

const getCommonLetter = (setA, setB, setC) => {
  for (const letter of setA) {
    if (setB.has(letter) && (!setC || setC.has(letter))) {
      return letter;
    }
  }

  return null;
};

const getPriority = (char) => {
  const uppercaseAdd = char === char.toUpperCase() ? 26 : 0;
  return char.toUpperCase().charCodeAt(0) - 64 + uppercaseAdd;
};

// Part 1 - Code
export const part1 = (data) => {
  const priorities = [];

  for (const line of data) {
    const left = new Set(line.substring(0, line.length / 2));
    const right = new Set(line.substring(line.length / 2));

    const common = getCommonLetter(left, right);
    const prio = getPriority(common);

    priorities.push(prio);
  }

  return priorities.reduce((total, current) => total + current, 0);
};

// Part 2 - Code
export const part2 = (data) => {
  const priorities = [];

  for (let i = 0; i < data.length; i += 3) {
    const [elf1, elf2, elf3] = [
      new Set(data[i]),
      new Set(data[i + 1]),
      new Set(data[i + 2]),
    ];

    const common = getCommonLetter(elf1, elf2, elf3);
    const prio = getPriority(common);

    priorities.push(prio);
  }

  return priorities.reduce((total, current) => total + current, 0);
};
