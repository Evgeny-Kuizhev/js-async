const
    fs = require('fs'),
    mustache = require('mustache');


// чтение данных
fs.readFile('data.json', {encoding: 'utf-8'}, (err, data) => {
    if (err) throw err;

    const view = JSON.parse(data);
    // чтение шаблона
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
});

