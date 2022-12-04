import { transforms } from "advent-of-code-client";
import { part1, part2 } from "./day";

const given = transforms.lines(
  "2-4,6-8\n2-3,4-5\n5-7,7-9\n2-8,3-7\n6-6,4-6\n2-6,4-8"
);

const expectedP1 = 2;
const expectedP2 = 4;

test(`Part 1 > expects ${expectedP1}`, () => {
  expect(part1(given)).toBe(expectedP1);
});

test(`Part 2 > expects ${expectedP2}`, () => {
  expect(part2(given)).toBe(expectedP2);
});
