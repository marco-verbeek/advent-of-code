import { transforms } from "advent-of-code-client";
import { part1, part2 } from "./day";

const given = transforms.splitBy("\nMonkey ")(
  "Monkey 0:\nStarting items: 79, 98\nOperation: new = old * 19\nTest: divisible by 23\n  If true: throw to monkey 2\n  If false: throw to monkey 3\nMonkey 1:\nStarting items: 54, 65, 75, 74\nOperation: new = old + 6\nTest: divisible by 19\n  If true: throw to monkey 2\n  If false: throw to monkey 0\nMonkey 2:\nStarting items: 79, 60, 97\nOperation: new = old * old\nTest: divisible by 13\n  If true: throw to monkey 1\n  If false: throw to monkey 3\nMonkey 3:\nStarting items: 74\nOperation: new = old + 3\nTest: divisible by 17\n  If true: throw to monkey 0\n  If false: throw to monkey 1"
);

const expectedP1 = 10605;
const expectedP2 = 2713310158;

test(`Part 1 > expects ${expectedP1}`, () => {
  expect(part1(given)).toBe(expectedP1);
});

test(`Part 2 > expects ${expectedP2}`, () => {
  expect(part2(given)).toBe(expectedP2);
});
