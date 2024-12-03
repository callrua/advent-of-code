import * as fs from 'fs';
import * as readline from 'readline';

function isSorted<T>(array: T[]): boolean {
    let increasing = true;
    let decreasing = true;

    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            increasing = false;
        }
        if (array[i] < array[i + 1]) {
            decreasing = false;
        }
    }

    return increasing || decreasing;
}

function isDiff(array: number[]): boolean {
    let diff = true;

    for (let i = 0; i < array.length - 1; i++) {
        var d = Math.abs(array[i] - array[i+1]) 
        if ( d < 1 || d > 3) {
            diff = false;
            break;
        }
    }

    return diff;
}

async function processFile(filePath: string): Promise<number> {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });


    var safe: number = 0;

    for await (const line of rl) {
        var level = line.split(" ").map(Number);
        console.log(level);

        // Levels are either increasing or decreasing
        if (!isSorted(level)) {
            continue;
        }

        // Levels have a difference of 1 or 3
        if (!isDiff(level)) {
            continue;
        }

        safe++;
    }

    return safe
}

async function main() {
    try {
        const filePath = "./input.txt";
        let safe = await processFile(filePath);
        console.log(safe);
    } catch (error) {
            console.error(error);
    }
}

main();
