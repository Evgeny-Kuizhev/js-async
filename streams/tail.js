const
    fs = require('fs'),

    fileName = process.argv[2];
    n = +process.argv[3] || 10;
    file = fs.createReadStream(fileName, 'utf8');

let lastItems = [];
file.on('data', chunk => {
    let lines = chunk.split('\n');
    if (lines.length >= n) {
        lastItems = lines.slice(-n);
    } else {
        lastItems.push(lines);
        lastItems = lastItems.slice(-n);
    }
})

file.on('end', () => {
    lastItems.forEach(el => process.stdout.write(`${el}\n`));
})
