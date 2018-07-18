const fs = require('fs');
const mustache = require('mustache');

const data = {};

fs.readFile('data.json', {encoding: 'utf-8'}, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        data.course = JSON.parse(res).course;

        fs.readFile('template.html', {encoding: 'utf-8'}, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                data.template = res;

                mustache.parse(data.template);


                console.log(mustache.render(data.template, data.course))
            }
        });
    }
});

