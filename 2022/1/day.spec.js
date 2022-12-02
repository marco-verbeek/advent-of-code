import { transforms } from "advent-of-code-client";
import { part1, part2 } from "./day";

const given = transforms.numbers(
  "1000\n2000\n3000\n\n4000\n\n5000\n6000\n\n7000\n8000\n9000\n\n10000"
);

const expectedP1 = 24000;
const expectedP2 = 45000;

test(`Part 1 > expects ${expectedP1}`, () => {
  expect(part1(given)).toBe(expectedP1);
});

test(`Part 2 > expects ${expectedP2}`, () => {
  expect(part2(given)).toBe(expectedP2);
});
