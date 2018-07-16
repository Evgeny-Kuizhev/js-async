const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

const myEmitter = new MyEmitter();

myEmitter.on('привет', (res) => {
    res.answer = 'и тебе привет';
});

myEmitter.on('как дела?', (res) => {
    res.answer = 'Все отлично!';
});

myEmitter.on('что делаешь?', (res) => {
    res.answer = 'чаек пью';
});


module.exports = {
    myEmitter
}