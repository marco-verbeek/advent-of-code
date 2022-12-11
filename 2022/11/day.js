import { AocClient, transforms } from "advent-of-code-client";
import * as dotenv from "dotenv";
dotenv.config();

const client = new AocClient({
  year: 2022,
  day: 11,
  token: process.env.AOC_TOKEN,
});

const input = await client.getInput();
client.setInputTransform(transforms.splitBy("\nMonkey"));

const parseMonkeys = (data) => {
  const monkeys = [];

  for (const monkeyData of data) {
    const [, startingItems, operation, test, testTrue, testFalse] =
      monkeyData.split("\n");

    // Parse items
    let [, items] = startingItems.split(": ");
    items = items.split(", ").map(Number);

    // Parse operation
    let [, op] = operation.split("= ");
    op = op.replace(/old/g, "val");

    // Handle test condition
    let [, testDivide] = test.split("by ");
    testDivide = parseInt(testDivide);

    // onTruePass, onFalsePass
    let [, onTruePass] = testTrue.split("monkey ");
    onTruePass = parseInt(onTruePass);
    let [, onFalsePass] = testFalse.split("monkey ");
    onFalsePass = parseInt(onFalsePass);

    monkeys.push({
      items,
      passes: 0,
      operation: function (val) {
        return eval(op);
      },
      test: function (val) {
        return val % testDivide === 0 ? onTruePass : onFalsePass;
      },
    });
  }

  return monkeys;
};

const playRound = (monkeys, divide) => {
  for (let monkeyIdx = 0; monkeyIdx < monkeys.length; monkeyIdx++) {
    const monkey = monkeys[monkeyIdx];

    for (let itemIdx = 0; itemIdx < monkey.items.length; itemIdx++) {
      const item = monkey.items[itemIdx];
      const checkAndBored = Math.floor(monkey.operation(item) / divide);

      monkey.items[itemIdx] = checkAndBored;

      // Pass to next monkey
      const throwToNextMonkeyIdx = monkey.test(checkAndBored);
      monkeys[throwToNextMonkeyIdx].items.push(checkAndBored);
    }

    // Increase stat to match amount of items (thrown)
    monkey.passes += monkey.items.length;
    // All items are thrown to other monkeys
    monkey.items = [];
  }
};

// Part 1 - Code
export const part1 = (data) => {
  const monkeys = parseMonkeys(data);

  // Play 20 rounds
  for (let i = 0; i < 20; i++) {
    playRound(monkeys, 3);
  }

  // Calc monkey business factor
  return monkeys
    .map((monkey) => monkey.passes)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((total, current) => total * current, 1);
};

// Part 2 - Code
export const part2 = (data) => {
  const monkeys = parseMonkeys(data);

  // Play 10000 rounds
  for (let i = 0; i < 10000; i++) {
    playRound(monkeys, 1);
  }

  console.log(monkeys);

  // Calc monkey business factor
  return monkeys
    .map((monkey) => monkey.passes)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((total, current) => total * current, 1);
};
