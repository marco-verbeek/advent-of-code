import { part1, part2 } from "./day";

const assertionsP1 = [
  { given: "mjqjpqmgbljsphdztnvjfqwrcgsmlb", expected: 7 },
  { given: "bvwbjplbgvbhsrlpgdmjqwftvncz", expected: 5 },
  { given: "nppdvjthqldpwncqszvftbrmjlhg", expected: 6 },
  { given: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", expected: 10 },
  { given: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", expected: 11 },
];

const assertionsP2 = [
  { given: "mjqjpqmgbljsphdztnvjfqwrcgsmlb", expected: 19 },
  { given: "bvwbjplbgvbhsrlpgdmjqwftvncz", expected: 23 },
  { given: "nppdvjthqldpwncqszvftbrmjlhg", expected: 23 },
  { given: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", expected: 29 },
  { given: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", expected: 26 },
];

for (const assertion of assertionsP1) {
  test(`Part 1 > expects ${assertion.expected}`, () => {
    expect(part1(assertion.given)).toBe(assertion.expected);
  });
}

for (const assertion of assertionsP2) {
  test(`Part 2 > expects ${assertion.expected}`, () => {
    expect(part2(assertion.given)).toBe(assertion.expected);
  });
}
