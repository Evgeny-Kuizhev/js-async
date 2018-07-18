const
    fs = require('fs'),
    mustache = require('mustache');

const promise = new Promise((resolve, reject) => {
    fs.readFile('data.json', {encoding: 'utf-8'}, (err, data) => {
        console.log(1)
        if (err) reject(err);
        else resolve(JSON.parse(data));
    });
});
promise.then(view => {
    return new Promise((resolve, reject) => {
        console.log(2)
        fs.readFile('template.html', {encoding: 'utf-8'}, (err, template) => {
            if (err) reject(err);
            else {
                // необязательно, ускоряет последующее использование
                mustache.parse(template);
                // генерация выходного html
                console.log(3)
                resolve(mustache.render(template, view));
            };
        });
    });
});
promise.then(build => {
    console.log(4);
    // запись сгенерированного файла
    fs.writeFile('build.html', build, err => {
        if (err) throw err;
    });
});

promise.catch(err => console.log(err));
