import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    console.log(input);
    let total: number = 0;
    const regex = /mul\(\d+,\d+\)/g;
    input.match(regex)?.forEach((match: string) => {
        const parts = match.match(/\d+/g);
        if (parts) total += parseInt(parts[0]) * parseInt(parts[1]);
    });
    console.log(total);

    return total;
};

const part2 = (rawInput: string): number => {
    const input = parseInput(rawInput);
    let doMul = true;
    let total = 0;
    const regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;
    input.match(regex)?.forEach((match: string) => {
        const parts = match.match(/\d+/g);
        const doRe = match.match(/do\(\)/);
        const dontRe = match.match(/don't\(\)/);
        if (doRe) doMul = true;
        if (dontRe) doMul = false;
        if (parts) { 
            if (doMul) total += parseInt(parts[0]) * parseInt(parts[1]);
        };
    });

    return total
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
