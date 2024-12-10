import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type Position = {
    col: number,
    row: number,
    direction: string,
}

function moveUp(pos: Position, map: string[][]): Position {
    let newPos = pos;
    for (let i = pos.row; i >= 0; i--) {
        if (map[i][pos.col] === "#") {
            console.log("hit # when moving up", pos.col, i)
            newPos = {row: i+1, col: pos.col, direction: ">"};
            break;
        }
        else {
            map[i][pos.col] = "X";
            newPos = {row: i, col: pos.col, direction: "^"};
        }
    }

    return newPos;
}

function moveDown(pos: Position, map: string[][]): Position {
    let newPos = pos;
    for (let i = pos.row; i < map.length; i++) {
        if (map[i][pos.col] === "#") {
            console.log("hit # when moving down", pos.col, i)
            newPos = {row: i-1, col: pos.col, direction: "<"};
            return newPos;
        }
        else {
            map[i][pos.col] = "X";
            newPos = {row: i, col: pos.col, direction: "v"};
        }
    }

    return newPos;
}

function moveLeft(pos: Position, map: string[][]): Position {
    let newPos = pos;
    for (let i = pos.col; i >= 0; i--) {
        if (map[pos.row][i] === "#") {
            console.log("hit # when moving left", pos.row, i)
            newPos = {row: pos.row, col: i+1, direction: "^"};
            return newPos;
        }
        else {
            map[pos.row][i] = "X";
            newPos = {row: pos.row, col: i, direction: "<"};
        }
    }

    return newPos;
}

function moveRight(pos: Position, map: string[][]): Position {
    let newPos = pos;
    for (let i = pos.col; i < map[pos.row].length; i++) {
        if (map[pos.row][i] === "#") {
            console.log("hit # when moving right", pos.row, i)
            newPos = {row: pos.row, col: i-1, direction: "v"};
            return newPos;
        }
        else {
            map[pos.row][i] = "X";
            newPos = {row: pos.row, col: i, direction: ">"};
        }
    }

    return newPos;
}




const part1 = (rawInput: string): number => {
    const input = parseInput(rawInput);
    let arr = input.split("\n").map((row) => row.split(""));
    console.log(arr);

    let pos: Position = {col: 0, row: 0, direction: "^"};
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === "^") {
                pos = {row: i, col: j, direction: "^"};
                console.log(pos)
            }
        }
    }

    console.log(arr[8][0])
    let offMap = false;
    while (!offMap) {
        switch (pos.direction) {
            case "^":
                console.log("moving up", pos)
                pos = moveUp(pos, arr);
                break;
            case "v":
                console.log("moving down", pos)
                pos = moveDown(pos, arr);
                break;
            case "<":
                console.log("moving left", pos)
                pos = moveLeft(pos, arr);
                break;
            case ">":
                console.log("moving right", pos)
                pos = moveRight(pos, arr);
                break;
            default:
                console.log("invalid direction", pos.direction)
                offMap = true;
                break;
        }
        console.log("new pos", pos)
        if (pos.row <= 0 || pos.row >= arr.length - 1 || pos.col <= 0 || pos.col >= arr[0].length - 1) {
            console.log("off map at", pos.row, pos.col, "heading", pos.direction)
            offMap = true;
        }
    }

    console.log(arr)

    let count = 0;
    arr.forEach((row) => {
        row.forEach((cell) => {
            if (cell === "X") {
                count++;
            }
        })
    })
    console.log(count)

    return count;
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);

    return;
};

run({
  part1: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 41,
      },
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
