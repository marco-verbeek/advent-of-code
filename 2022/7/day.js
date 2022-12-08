import { AocClient, transforms } from "advent-of-code-client";
import set from "lodash.set";
import get from "lodash.get";
import * as dotenv from "dotenv";
dotenv.config();

const client = new AocClient({
  year: 2022,
  day: 7,
  token: process.env.AOC_TOKEN,
});

const input = await client.getInput();
client.setInputTransform(transforms.numbers);

// Filesystem
let fs = { "/": { total: 0 } };
// Current working directory
let cwd = [];

const handleCommand = (line) => {
  const [, command] = line.split("$ ");
  const [cmd, arg] = command.split(" ");

  switch (cmd) {
    case "ls":
      // Nothing to do: handleListing will do its job using cwd.
      break;
    case "cd":
      handleChangeDir(arg);
      break;
  }
};

const handleChangeDir = (dir) => {
  switch (dir) {
    case "/":
      cwd = ["/"];
      break;

    case "..":
      cwd.pop();
      break;

    default:
      cwd.push(dir);
      break;
  }
};

const handleListing = (line) => {
  const [prefix, suffix] = line.split(" ");

  if (prefix === "dir") {
    createDir({ name: suffix });
  } else {
    createFile({ name: suffix, size: parseInt(prefix) });
  }
};

const createDir = ({ name }) => {
  // Lesson: don't nest paths, just use a combined one
  fs[[...cwd, name].join(".")] = { total: 0 };
  // set(fs, [...cwd, name].join("."), { total: 0 });
};

const addFileSizeToParentDirs = (size) => {
  const dirs = [...cwd];

  for (let i = 0; i < cwd.length; i++) {
    const path = dirs.slice(0, cwd.length - i).join(".");
    fs[path].total += size;
    // get(fs, path).total += size;
  }
};

const createFile = ({ name, size }) => {
  addFileSizeToParentDirs(size);

  // Lesson: you don't need individual file size
  // get(fs, cwd.join("."))[name] = size;
};

const sumOfPathLess100k = () => {
  return Object.values(fs).reduce((total, path) => {
    if (path.total <= 100000) {
      return (total += path.total);
    }

    return total;
  }, 0);
};

const findSmallestEnoughDir = () => {
  const totalSizeTaken = fs["/"].total;
  const totalSizeAvailable = 70000000 - totalSizeTaken;
  const sizeNeeded = 30000000;

  return Object.values(fs)
    .filter((path) => totalSizeAvailable + path.total >= sizeNeeded)
    .sort((a, b) => a.total - b.total)[0].total;
};

// Part 1 - Code
export const part1 = (data) => {
  for (const line of data) {
    if (line[0] === "$") {
      handleCommand(line);
    } else {
      handleListing(line);
    }
  }

  return sumOfPathLess100k();
};

// Part 2 - Code
export const part2 = (data) => {
  // reset previous fs
  fs = { "/": { total: 0 } };
  cwd = [];

  for (const line of data) {
    if (line[0] === "$") {
      handleCommand(line);
    } else {
      handleListing(line);
    }
  }

  return findSmallestEnoughDir();
};
