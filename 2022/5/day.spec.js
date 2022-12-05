import { transforms } from "advent-of-code-client";
import { part1, part2 } from "./day";

const given = transforms.lines(
  "    [D]    \n[N] [C]    \n[Z] [M] [P]\n 1   2   3 \nmove 1 from 2 to 1\nmove 3 from 1 to 3\nmove 2 from 2 to 1\nmove 1 from 1 to 2"
);

const expectedP1 = "CMZ";
const expectedP2 = "MCD";

test(`Part 1 > expects ${expectedP1}`, () => {
  expect(part1(given)).toBe(expectedP1);
});

test(`Part 2 > expects ${expectedP2}`, () => {
  expect(part2(given)).toBe(expectedP2);
});
