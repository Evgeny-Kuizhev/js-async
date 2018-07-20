const
    fs = require('fs'),
    mustache = require('mustache'),
    async = require('async');


async.map(
    // --------DATA---------
    ['data.json', 'data2.json'],
    // ------FUNCTION------
    (file, cb) => {
        fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
            data = JSON.parse(data);
            cb(err, data);
        });
    },
    // ------CALLBACK------
    (err, result) => {
    if (!err) {
        view = Object.assign(...result);
        fs.readFile('template.html', {encoding: 'utf-8'}, (err, template) => {
            if (err) throw err
            // необязательно, ускоряет последующее использование
            mustache.parse(template);
            // генерация выходного html
            const build = mustache.render(template, view);
            // запись сгенерированного файла
            fs.writeFile('build.html', build, err => {
                if (err) throw err;
            });
        });
    } else {
        console.log('Error:', err);
    }
});
