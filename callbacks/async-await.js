const
    Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs')),
    mustache = require('mustache');


async function generateHTML(files) {
    const data = [];
    for (let file of files) {
        let temp =  await fs.readFileSync(file, 'utf-8');
        data.push(JSON.parse(temp));
    }
    const
        view = Object.assign(...data);
        template = await fs.readFileSync('template.html', 'utf-8');
        build = mustache.render(template, view);
    await fs.writeFileSync('build.html', build);
}

const files = ['data.json', 'data2.json'];
try {
    generateHTML(files);
} catch (err) {
    console.log(err);
}
