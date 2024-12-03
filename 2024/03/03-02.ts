import * as fs from 'fs';
import * as readline from 'readline';

async function processFile(filePath: string): Promise<void> {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });


    let doMul = true;
    let total = 0;
    for await (const line of rl) {
        const regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;

        line.match(regex)?.forEach((match: string) => {
            const parts = match.match(/\d+/g);
            const doRe = match.match(/do\(\)/);
            const dontRe = match.match(/don't\(\)/);
            if (doRe) doMul = true;
            if (dontRe) doMul = false;
            if (parts) { 
                if (doMul) total += parseInt(parts[0]) * parseInt(parts[1]);
            };
        });
    }

    console.log(total);
}

async function main() {
    try {
        const filePath = "./input.txt";
        await processFile(filePath);
    } catch (error) {
            console.error(error);
    }
}

main();
