const year = Number(process.argv[2]);
const day = Number(process.argv[3]);

if (!year || !day) {
  throw new Error("Must provide year and day to send result");
}

import { AocClient } from "advent-of-code-client";
import * as dotenv from "dotenv";
dotenv.config();

const { part1, part2 } = await import(`../${year}/${day}/day.js`);

const client = new AocClient({
  year,
  day,
  token: process.env.AOC_TOKEN,
});

await client.run([part1, part2]);
