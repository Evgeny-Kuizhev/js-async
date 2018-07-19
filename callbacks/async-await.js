const
    fs = require('fs'),
    mustache = require('mustache');


async function generateHTML() {
    let data;
    await fs.readFile('data.json', {encoding: 'utf-8'}, (err, res) => {
        if (err) throw err;
        data = JSON.parse(res);
    });


}
new Promise((resole, reject) => {
    fs.readFile('data.json', {encoding: 'utf-8'}, (err, data) => {
        if (err) reject(err);
        else resole(JSON.parse(data));
    });
})
.then(view => {
    return new Promise((resole, reject) => {
        fs.readFile('template.html', {encoding: 'utf-8'}, (err, template) => {
            if (err) reject(err);
            else {
                // необязательно, ускоряет последующее использование
                mustache.parse(template);
                // генерация выходного html
                resole(mustache.render(template, view));
            };
        });
    });
})
.then(build => {
    // запись сгенерированного файла
    fs.writeFile('build.html', build, err => {
        if (err) throw err;
    });
})
.catch(err => console.log(err));

generateHTML()
