import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

function reduce(currentTotal: number, remaining: number[], results: number[]) {
    if (remaining.length === 0) {
        results.push(currentTotal);
        return;
    }

    const next = remaining[0];
    const rest = remaining.slice(1);

    reduce(currentTotal + next, rest, results);
    reduce(currentTotal * next, rest, results);
}

function reducep2(currentTotal: number, remaining: number[], results: number[]) {
    if (remaining.length === 0) {
        results.push(currentTotal);
        return;
    }

    const next = remaining[0];
    const rest = remaining.slice(1);

    reducep2(currentTotal + next, rest, results);
    reducep2(currentTotal * next, rest, results);

    const concat = currentTotal.toString() + next.toString();
    reducep2(+concat, rest, results);
}

const part1 = (rawInput: string): number => {
    const input = parseInput(rawInput);

    let solution = 0;
    for (const line in input.split("\n")) {
        let l = input.split("\n")[line];
        const parts = l.split(":").map((item) => item.trim());

        let result = +parts[0];
        let operands = parts[1].split(" ").map((num) => +num);

        let res: number[] = [];
        reduce(operands[0], operands.slice(1), res);
        if (res.includes(result)) {
            solution+=result;
        }
    }
    
    return solution;
};

const part2 = (rawInput: string): number => {
    const input = parseInput(rawInput);

    let solution = 0;
    for (const line in input.split("\n")) {
        let l = input.split("\n")[line];
        const parts = l.split(":").map((item) => item.trim());

        let result = +parts[0];
        let operands = parts[1].split(" ").map((num) => +num);

        let res: number[] = [];
        reducep2(operands[0], operands.slice(1), res);
        if (res.includes(result)) {
            solution+=result;
        }
    }
    
    return solution;
};

run({
  part1: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        // input: `7290: 6 8 6 15`,
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
