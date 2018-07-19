const
    fs = require('fs'),
    mustache = require('mustache');


function func(files, pos, arr, end) {
    if(files.length === pos) {
        if (end) return;
        end = true;
        const view = Object.assign(...arr);
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
        return;
    }
    fs.readFile(files[pos], {encoding: 'utf-8'}, (err, data) => {
        if (err) throw err;
        arr.push(JSON.parse(data));
        func(files, pos+1, arr, end)
    });
}

const files = ['data.json', 'data2.json'];

func(files, 0, [], false);
