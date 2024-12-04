import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string): number => {
    const input = parseInput(rawInput);
    let matches = 0;

    // find horizontal
    const xmasRe = /XMAS|SAMX/g;
    matches += input.match(xmasRe)?.length || 0;

    let arr = input.split("\n").map((row) => row.split(""));

    // find vertical
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === "X") {
                // look for vertical down
                if (i + 1 < arr.length && arr[i + 1][j] === "M") {
                    if (i + 2 < arr.length && arr[i + 2][j] === "A") {
                        if (i + 3 < arr.length && arr[i + 3][j] === "S") {
                            matches++;
                        }
                    }
                }
                // look for vertical up
                if (i - 1 >= 0 && arr[i - 1][j] === "M") {
                    if (i - 2 >= 0 && arr[i - 2][j] === "A") {
                        if (i - 3 >= 0 && arr[i - 3][j] === "S") {
                            matches++;
                        }
                    }
                }
            }
        }
    }
    
    // find diag
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === "X") {
                // look for diag down right
                if (j + 1 < arr[i].length && i + 1 < arr.length && arr[i + 1][j + 1] === "M") {
                    if (j + 2 < arr[i].length && i + 2 < arr.length && arr[i + 2][j + 2] === "A") {
                        if (j + 3 < arr[i].length && i + 3 < arr.length && arr[i + 3][j + 3] === "S") {
                            matches++;
                        }
                    }
                }
                // look for diag down left
                if (j - 1 >= 0 && i + 1 < arr.length && arr[i + 1][j - 1] === "M") {
                    if (j - 2 >= 0 && i + 2 < arr.length && arr[i + 2][j - 2] === "A") {
                        if (j - 3 >= 0 && i + 3 < arr.length && arr[i + 3][j - 3] === "S") {
                            matches++;
                        }
                    }
                }
                // look for diag up left
                if (j - 1 >= 0 && i - 1 >= 0 && arr[i - 1][j - 1] === "M") {
                    if (j - 2 >= 0 && i - 2 >= 0 && arr[i - 2][j - 2] === "A") {
                        if (j - 3 >= 0 && i - 3 >= 0 && arr[i - 3][j - 3] === "S") {
                            matches++;
                        }
                    }
                }
                // look for diag up right
                if (j + 1 < arr[i].length && i - 1 >= 0 && arr[i - 1][j + 1] === "M") {
                    if (j + 2 < arr[i].length && i - 2 >= 0 && arr[i - 2][j + 2] === "A") {
                        if (j + 3 < arr[i].length && i - 3 >= 0 && arr[i - 3][j + 3] === "S") {
                            matches++;
                        }
                    }
                }
            }
        }
    }

    return matches;
};

const part2 = (rawInput: string): number => {
    const input = parseInput(rawInput);
    let matches = 0;

    let arr = input.split("\n").map((row) => row.split(""));
    
    for (let i = 1; i < arr.length; i++) {
        
        for (let j = 1; j < arr[i].length; j++) {
            if (arr[i][j] === "A") {
                let masUpLeft = false;
                let masUpRight = false;
                let masDownLeft = false;
                let masDownRight = false;

                // look for MAS diag up left
                if (j + 1 < arr[i].length && i + 1 < arr.length && (arr[i + 1][j + 1] === "M" )) {
                    if (j - 1 >= 0 && i - 1 >= 0 && arr[i - 1][j - 1] === "S") {
                        masUpLeft = true;
                    }
                }
                // look for MAS diag up right
                if (j - 1 >= 0 && i + 1 < arr.length && (arr[i + 1][j - 1] === "M")) {
                    if (j + 1 < arr[i].length && i - 1 >= 0 && arr[i - 1][j + 1] === "S") {
                        masUpRight = true;
                    }
                }
                // look for MAS diag down right
                if (j - 1 >= 0 && i - 1 >= 0 && (arr[i - 1][j - 1] === "M")) {
                    if (j + 1 < arr[i].length && i + 1 < arr.length && arr[i + 1][j + 1] === "S") {
                        masDownRight = true;
                    }
                }
                // look for MAS diag down left
                if (j + 1 < arr[i].length && i - 1 >= 0 && (arr[i - 1][j + 1] === "M")) {
                    if (j - 1 >= 0 && i + 1 < arr.length && arr[i + 1][j - 1] === "S") {
                        masDownLeft = true;
                    }
                }
                if ((masUpLeft && masUpRight) || (masUpLeft && masDownLeft) || (masDownLeft && masDownRight) || (masUpRight && masDownRight)) {
                    matches++;
                    masUpLeft = false;
                    masUpRight = false;
                    masDownLeft = false;
                    masDownRight = false;
                }
            }
        }
    }

    return matches;
};

run({
  part1: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
