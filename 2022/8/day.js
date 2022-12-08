import { AocClient, transforms } from "advent-of-code-client";
import * as dotenv from "dotenv";
dotenv.config();

const client = new AocClient({
  year: 2022,
  day: 8,
  token: process.env.AOC_TOKEN,
});

const input = await client.getInput();
client.setInputTransform(transforms.numbers);

const formatTree = (data) => {
  const trees = [];

  for (let y = 0; y < data.length; y++) {
    trees.push([]);

    for (let x = 0; x < data[y].length; x++) {
      trees[y][x] = parseInt(data[y][x]);
    }
  }

  return trees;
};

const getVisibleTrees = (trees) => {
  let count = 0;

  for (let y = 0; y < trees.length; y++) {
    isVisibleLoop: for (let x = 0; x < trees[y].length; x++) {
      // Border tree always visible
      if (
        y === 0 ||
        y === trees.length - 1 ||
        x === 0 ||
        x === trees[y].length - 1
      ) {
        count++;
        continue;
      }

      // Are all the trees ABOVE shorter?
      for (let i = y - 1; i >= 0; i--) {
        if (trees[i][x] >= trees[y][x]) {
          break;
        }

        if (i === 0) {
          count++;
          continue isVisibleLoop;
        }
      }

      // Are all the trees UNDER shorter?
      for (let i = y + 1; i <= trees.length - 1; i++) {
        if (trees[i][x] >= trees[y][x]) {
          break;
        }

        if (i === trees.length - 1) {
          count++;
          continue isVisibleLoop;
        }
      }

      // Are all the trees to the RIGHT shorter?
      for (let i = x + 1; i <= trees[y].length - 1; i++) {
        if (trees[y][i] >= trees[y][x]) {
          break;
        }

        if (i === trees[y].length - 1) {
          count++;
          continue isVisibleLoop;
        }
      }

      // Are all the trees to the LEFT shorter?
      for (let i = x - 1; i >= 0; i--) {
        if (trees[y][i] >= trees[y][x]) {
          break;
        }

        if (i === 0) {
          count++;
          continue isVisibleLoop;
        }
      }
    }
  }

  return count;
};

const countTotalLowerOrEql = (value, rest) => {
  let count = 0;

  for (const other of rest) {
    count++;

    if (other >= value) {
      break;
    }
  }

  return count;
};

const calcScenicScore = (trees) => {
  const scenicScores = [];

  for (let y = 0; y < trees.length; y++) {
    scenicScores.push([]);

    for (let x = 0; x < trees[y].length; x++) {
      const current = trees[y][x];

      // Borders are special
      if (
        y === 0 ||
        y === trees.length - 1 ||
        x === 0 ||
        x === trees[y].length - 1
      ) {
        scenicScores[y].push(0);
        continue;
      }

      const leftScore = countTotalLowerOrEql(
        current,
        trees[y].slice(0, x).reverse()
      );

      const rightScore = countTotalLowerOrEql(
        current,
        trees[y].slice(x + 1, trees[y].length)
      );

      const topScore = countTotalLowerOrEql(
        current,
        trees
          .map((arr) => arr[x])
          .slice(0, y)
          .reverse()
      );

      const bottomScore = countTotalLowerOrEql(
        current,
        trees.map((arr) => arr[x]).slice(y + 1, trees.length)
      );

      scenicScores[y].push(leftScore * rightScore * topScore * bottomScore);
    }
  }

  return Math.max(...scenicScores.flat());
};

// Part 1 - Code
export const part1 = (data) => {
  const trees = formatTree(data);
  return getVisibleTrees(trees);
};

// Part 2 - Code
export const part2 = (data) => {
  const trees = formatTree(data);
  return calcScenicScore(trees);
};
