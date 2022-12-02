import { AocClient, transforms } from "advent-of-code-client";
import * as dotenv from "dotenv";
dotenv.config();

const client = new AocClient({
  year: 2022,
  day: 2,
  token: process.env.AOC_TOKEN,
});

const input = await client.getInput();
client.setInputTransform(transforms.lines);

const points = {
  X: 1, // Rock (1) or lose (2)
  Y: 2, // Paper (1) or draw (2)
  Z: 3, // Scissors (1) or win (2)
  A: 1,
  B: 2,
  C: 3,
  win: 6,
  draw: 3,
  lose: 0,
};

// Part 1 - Code
export const part1 = (data) => {
  let totalPoints = 0;

  for (const round of data) {
    const [other, you] = round.split(" ");
    totalPoints += points[you];

    // Draw
    if (points[other] === points[you]) {
      totalPoints += points.draw;
      continue;
    }

    const diff = points[you] - points[other];
    if (diff === 1 || diff === -2) {
      totalPoints += points.win;
    } else {
      totalPoints += points.lose;
    }
  }

  return totalPoints;
};

// Part 2 - Code
export const part2 = (data) => {
  let totalPoints = 0;

  for (const round of data) {
    const [other, you] = round.split(" ");

    if (points[you] === points.X) {
      const otherPts = points[other];
      const losing = otherPts === 3 ? "Y" : otherPts === 2 ? "X" : "Z";

      totalPoints += points[losing] + points.lose;
    } else if (points[you] === points.Y) {
      totalPoints += points[other] + points.draw;
    } else {
      const otherPts = points[other];
      const winning = otherPts === 3 ? "X" : otherPts === 2 ? "Z" : "Y";

      totalPoints += points[winning] + points.win;
    }
  }

  return totalPoints;
};
