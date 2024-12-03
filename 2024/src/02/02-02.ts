import * as fs from 'fs';
import * as readline from 'readline';

function willPass(array: number[]): boolean {
    const diffs: number[] = [];

    for (let i = 1; i < array.length; i++) {
        diffs.push(array[i] - array[i-1]);
    }

    const increasing = diffs.every((d) => d >= 1 && d <= 3);
    const decreasing = diffs.every((d) => d <= -1 && d >= -3);

    return increasing || decreasing;
}

async function processFile(filePath: string): Promise<number> {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let safe = 0;

    for await (const line of rl) {
        var levels = line.split(" ").map(Number);
        let allow = false;
        // check for any permutation of the array, without an element that will pass
        for (let i=0; i < levels.length; i++) {
            const removed = [...levels.slice(0, i), ...levels.slice(i+1)];
            if (willPass(removed)) {
                allow = true;
                break;
            }
        }
        if (willPass(levels) || allow ) safe++;
    }

    return safe;
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
