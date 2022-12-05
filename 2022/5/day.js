import { AocClient, transforms } from "advent-of-code-client";
import * as dotenv from "dotenv";
dotenv.config();

const client = new AocClient({
  year: 2022,
  day: 5,
  token: process.env.AOC_TOKEN,
});

const input = await client.getInput();
client.setInputTransform(transforms.lines);

const getTopCrates = (piles) =>
  piles.map((pile) => pile[pile.length - 1]).join("");

const separatePilesFromMoves = (data) => {
  const rawPiles = [],
    rawMoves = [];

  let isDonePiles = false;
  for (const line of data) {
    if (!isDonePiles && line.includes("move")) {
      isDonePiles = true;
    }

    if (isDonePiles) {
      rawMoves.push(line);
    } else {
      rawPiles.push(line);
    }
  }

  return [createPiles(rawPiles), rawMoves];
};

const createPiles = (rawPiles) => {
  rawPiles = rawPiles.reverse();
  rawPiles.shift();
  const first = rawPiles[0];
  rawPiles.shift();

  const piles = [];
  for (const line of first) {
    if (line !== " ") {
      piles.push([]);
    }
  }

  for (let x = 0; x < first.length; x++) {
    for (let y = 0; y < rawPiles.length; y++) {
      if (
        rawPiles[y][x] === " " ||
        rawPiles[y][x] === "[" ||
        rawPiles[y][x] === "]"
      ) {
        continue;
      }

      const idx = first[x];
      piles[Number(idx) - 1].push(rawPiles[y][x]);
    }
  }

  return piles;
};

const moveToPile = (piles, amount, from, to) => {
  for (let i = 0; i < amount; i++) {
    piles[to - 1].push(piles[from - 1].pop());
  }
};

const moveToPileKeepOrder = (piles, amount, from, to) => {
  const movers = [];

  for (let i = 0; i < amount; i++) {
    movers.push(piles[from - 1].pop());
  }

  for (let i = 0; i < amount; i++) {
    piles[to - 1].push(movers.pop());
  }
};

// Part 1 - Code
export const part1 = (data) => {
  data[0] = "                        [Z] [W] [Z]";
  const [piles, rawMoves] = separatePilesFromMoves(data);

  for (const move of rawMoves) {
    const movement = move
      .replace("move ", "")
      .replace(" from ", ",")
      .replace(" to ", ",");

    const [amount, from, to] = movement.split(",");
    moveToPile(piles, amount, from, to);
  }

  return getTopCrates(piles);
};

// Part 2 - Code
export const part2 = (data) => {
  data[0] = "                        [Z] [W] [Z]";
  const [piles, rawMoves] = separatePilesFromMoves(data);

  for (const move of rawMoves) {
    const movement = move
      .replace("move ", "")
      .replace(" from ", ",")
      .replace(" to ", ",");

    const [amount, from, to] = movement.split(",");
    moveToPileKeepOrder(piles, amount, from, to);
  }

  return getTopCrates(piles);
};
