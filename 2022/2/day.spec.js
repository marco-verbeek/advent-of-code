import { transforms } from "advent-of-code-client";
import { part1, part2 } from "./day";

const given = transforms.lines("A Y\nB X\nC Z");

const expectedP1 = 15;
const expectedP2 = 12;

test(`Part 1 > expects ${expectedP1}`, () => {
  expect(part1(given)).toBe(expectedP1);
});

test(`Part 2 > expects ${expectedP2}`, () => {
  expect(part2(given)).toBe(expectedP2);
});
