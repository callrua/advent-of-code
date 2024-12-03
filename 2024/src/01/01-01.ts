import * as fs from 'fs';
import * as readline from 'readline';

type ColumnData = {
    firstColumn: number[];
    secondColumn: number[];
};

async function processFile(filePath: string): Promise<ColumnData> {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const firstColumn: number[] = [];
    const secondColumn: number[] = [];

    for await (const line of rl) {
        const columns = line.split(/\s+/); // Split by any number of spaces
        if (columns.length >= 2) {
            firstColumn.push(parseInt(columns[0]));
            secondColumn.push(parseInt(columns[1]));
        }
    }

    return { firstColumn, secondColumn }
}

async function main() {
    try {
        const filePath = "./01-01_input.txt";
        const { firstColumn, secondColumn } = await processFile(filePath);

        var sorted1: number[] = firstColumn.sort();
        var sorted2: number[] = secondColumn.sort();
        var result: number[] = [];

        for (var index in sorted1) {
            if (sorted1[index] > sorted2[index]) {
                result.push(sorted1[index] - sorted2[index]);
            } else {
                result.push(sorted2[index] - sorted1[index]);
            }
        }

        var total: number = 0;
        for (var val of result) {
            total += val;
        }
        console.log(total);

        } catch (error) {
            console.error(error);
        }
}

main();
