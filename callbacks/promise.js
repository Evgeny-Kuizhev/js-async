const
    fs = require('fs'),
    mustache = require('mustache');


new Promise((resolve, reject) => {
    fs.readFile('data.json', {encoding: 'utf-8'}, (err, data) => {
        if (err) reject(err);
        else resolve(JSON.parse(data));
    });
})
.then(view => {
    return new Promise((resolve, reject) => {
        fs.readFile('template.html', {encoding: 'utf-8'}, (err, template) => {
            if (err) reject(err);
            else {
                // необязательно, ускоряет последующее использование
                mustache.parse(template);
                // генерация выходного html
                resolve(mustache.render(template, view));
            };
        });
    });
})
.then(build => {
    // запись сгенерированного файла
    return new Promise((resolve, reject) => {
        fs.writeFile('build.html', build, err => {
            if (err ) reject(err);
        });
    })
})
.catch(err => console.log(err));

