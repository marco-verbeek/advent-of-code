import { AocClient, transforms } from "advent-of-code-client";
import * as dotenv from "dotenv";
dotenv.config();

const client = new AocClient({
  year: 2022,
  day: 9,
  token: process.env.AOC_TOKEN,
});

const input = await client.getInput();
client.setInputTransform(transforms.lines);

const directions = {
  U: { x: 0, y: 1 },
  D: { x: 0, y: -1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
};

const doMove = ({ lead, follow }) => {
  const deltaX = Math.abs(lead[0] - follow[0]);
  const deltaY = Math.abs(lead[1] - follow[1]);

  // follow is close enough to not have to move
  if (deltaX <= 1 && deltaY <= 1) {
    return;
  }

  // make tail follow lead
  if (deltaX >= 1) {
    follow[0] += lead[0] - follow[0] > 0 ? 1 : -1;
  }
  if (deltaY >= 1) {
    follow[1] += lead[1] - follow[1] > 0 ? 1 : -1;
  }
};

// Part 1 - Code
export const part1 = (data) => {
  const visited = new Set();

  const head = [0, 0];
  const tail = [0, 0];

  for (const move of data) {
    const [dir, amount] = move.split(" ");

    for (let i = 0; i < amount; i++) {
      head[0] += directions[dir].x;
      head[1] += directions[dir].y;

      visited.add(`${tail[0]}${tail[1]}`);
      doMove({ lead: head, follow: tail });
    }
  }

  return visited.size;
};

// Part 2 - Code
export const part2 = (data) => {
  const visited = new Set();

  // Note: this does not work - same ref for each array
  // const tails = Array(9).fill([0, 0]);

  const head = [0, 0];
  const tails = [];

  for (let i = 0; i < 9; i++) {
    tails.push([0, 0]);
  }

  for (const move of data) {
    const [dir, amount] = move.split(" ");

    for (let i = 0; i < amount; i++) {
      head[0] += directions[dir].x;
      head[1] += directions[dir].y;

      for (let ii = 0; ii < tails.length; ii++) {
        const leader = ii === 0 ? head : tails[ii - 1];
        doMove({ lead: leader, follow: tails[ii] });
        console.log(leader, tails[ii]);

        if (ii === tails.length - 1) {
          visited.add(`${tails[ii][0]}.${tails[ii][1]}`);
        }
      }
    }
  }

  return visited.size;
};
