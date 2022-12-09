import { transforms } from "advent-of-code-client";
import { part1, part2 } from "./day";

// const given = transforms.lines("R 4\nU 4\nL 3\nD 1\nR 4\nD 1\nL 5\nR 2");
const given = transforms.lines("R 2");

const expectedP1 = 13;
const expectedP2 = 1;

test.skip(`Part 1 > expects ${expectedP1}`, () => {
  expect(part1(given)).toBe(expectedP1);
});

test(`Part 2 > expects ${expectedP2}`, () => {
  expect(part2(given)).toBe(expectedP2);
});

const given2 = transforms.lines("R 5\nU 8\nL 8\nD 3\nR 17\nD 10\nL 25\nU 20");

const expected2 = 36;

test(`Part 2b > expects ${expected2}`, () => {
  expect(part2(given2)).toBe(expected2);
});
