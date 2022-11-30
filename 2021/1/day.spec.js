import { transforms } from "advent-of-code-client";
import { part1, part2 } from "./day";

const given = transforms.numbers(
  "199\n200\n208\n210\n200\n207\n240\n269\n260\n263"
);

const expectedP1 = 7;
const expectedP2 = 5;

test(`Part 1 > expects ${expectedP1}`, () => {
  expect(part1(given)).toBe(expectedP1);
});

test(`Part 2 > expects ${expectedP2}`, () => {
  expect(part2(given)).toBe(expectedP2);
});
