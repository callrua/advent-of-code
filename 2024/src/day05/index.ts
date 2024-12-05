import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string): number => {
    const input = parseInput(rawInput);

    let [pages, updates] = input.split("\n\n");
    let order = new Map<string, string[]>();

    pages.split("\n").forEach((page) => {
        const [from, to] = page.split("|").map(item => item.trim());
        if (order.has(from)) {
            order.get(from)?.push(to);
        } else {
            order.set(from, [to]);
        }
    });

    let orderTotal = 0;
    updates.split("\n").forEach((update) => {
        const items = update.split(",");
        let inOrder = true;
        items.forEach((value, index) => {
            // cant break out of a forEach, so just set a flag
            if ( inOrder ) {
                const after = update.split(",").slice(index+1);
                const before = update.split(",").slice(0,index);
                const y = order.get(value) as string[];
                // ensure all items after are in the map, and all items before are not in the map
                if (y) inOrder = after.every((element) => y.includes(element)) && !y.every((element) => before.includes(element));
            }
        });
        
        if (inOrder) orderTotal+= +items[Math.round((items.length - 1) / 2)];
    });

    return orderTotal;
};

const part2 = (rawInput: string): number => {
    const input = parseInput(rawInput);

    let [pages, updates] = input.split("\n\n");
    let order = new Map<string, string[]>();

    pages.split("\n").forEach((page) => {
        const [from, to] = page.split("|").map(item => item.trim());
        if (order.has(from)) {
            order.get(from)?.push(to);
        } else {
            order.set(from, [to]);
        }
    });

    let orderTotal = 0;
    let outOfOrder: string[][] = [];
    updates.split("\n").forEach((update) => {
        const items = update.split(",");
        let inOrder = true;
        items.forEach((value, index) => {
            // cant break out of a forEach, so just set a flag
            if ( inOrder ) {
                const after = update.split(",").slice(index+1);
                const before = update.split(",").slice(0,index);
                const y = order.get(value) as string[];
                // ensure all items after are in the map, and all items before are not in the map
                if (y) inOrder = after.every((element) => y.includes(element)) && !y.every((element) => before.includes(element));
            }
        });
        
        // prep for part2
        if (!inOrder) outOfOrder.push(items);
    });

    // part2
    for (let i = 0; i < outOfOrder.length; i++) {
        let toSort = [...outOfOrder[i]];
        let sorted = false;

        do {
            sorted = false;
            for (let j = 1; j <toSort.length; j++) {
                if (order.get(toSort[j])?.includes(toSort[j-1])) {
                    // swap the two elements
                    [toSort[j], toSort[j-1]] = [toSort[j-1], toSort[j]];
                    sorted = true;
                }
            }

        } while (sorted);

        orderTotal+= +toSort[Math.round((toSort.length - 1) / 2)];
    }
    

    return orderTotal;
};

run({
  part1: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
    {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 123,
            },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
