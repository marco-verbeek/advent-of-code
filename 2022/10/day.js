import { AocClient, transforms } from "advent-of-code-client";
import * as dotenv from "dotenv";
dotenv.config();

const client = new AocClient({
  year: 2022,
  day: 10,
  token: process.env.AOC_TOKEN,
});

const input = await client.getInput();
client.setInputTransform(transforms.lines);

// Part 1 - Code
export const part1 = (data) => {
  const milestones = [20, 60, 100, 140, 180, 220];
  const valuesX = [];

  let cycle = 0,
    x = 1;

  function incrementCycle(amount) {
    for (let i = 0; i < amount; i++) {
      cycle++;

      if (milestones.includes(cycle)) {
        console.log(`Milestone ${cycle} * ${x} = ${cycle * x}`);
        valuesX.push(cycle * x);
      }
    }
  }

  for (let idx = 0; idx < data.length + 2; idx++) {
    const cycleElem = data[idx - 2];
    if (!cycleElem || cycleElem === "noop") {
      incrementCycle(1);
      continue;
    }

    const [, amount] = cycleElem.split(" ");
    x += parseInt(amount);

    incrementCycle(2);
  }

  return valuesX.reduce((total, current) => total + current, 0);
};

// Part 2 - Code
export const part2 = (data) => {
  let image = [];
  let px = -1,
    x = 1;

  function isVisible(px, x) {
    px = px % 40;
    return x - 1 <= px && px <= x + 1;
  }

  function getPx(px, x) {
    return isVisible(px, x) ? "#" : ".";
  }

  function incrementAndWrite(px, x) {
    px++;
    image[px] = getPx(px, x);
  }

  for (const op of data) {
    if (op === "noop") {
      incrementAndWrite(px, x);
    } else {
      // Write first, then run op.
      incrementAndWrite(px, x);
      incrementAndWrite(px, x);

      const [, amount] = op.split(" ");
      x += parseInt(amount);
    }
  }

  for (let x = 0; x <= 200; x += 40) {
    console.log(image.slice(x, x + 40).toString());
  }

  return 0;
};
