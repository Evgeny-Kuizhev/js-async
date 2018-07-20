const
    fs = require('fs'),
    mustache = require('mustache'),
    async = require('async');


function readFiles(files, resolve, reject) {
    async.map(
        // --------DATA---------
        files,
        // ------FUNCTION------
        (file, cb) => {
            fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
                if (err) reject(err);
                data = JSON.parse(data);
                cb(err, data);
            });
        },
        // ------CALLBACK------
        (err, result) => {
        if (err) reject(err);
        const view = Object.assign(...result);
        resolve(view);
    });
}

new Promise((resolve, reject) => {
    const files = ['data.json', 'data2.json'];
    readFiles(files, resolve, reject);
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

