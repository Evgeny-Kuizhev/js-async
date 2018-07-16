const
    assert = require('assert'),
    emitter = require('../eventEmitter').myEmitter;



describe('EventEmitter', () => {
    
    it('Ответ на привет', () => {
        let res = {};
        emitter.emit('привет', res)
        assert.equal(res.answer, 'и тебе привет');
    });

    it('ответ на как дела?', () => {
        let res = {};
        emitter.emit('как дела?', res)
        assert.equal(res.answer, 'Все отлично!');
    });

    it('ответ на что делаешь?', () => {
        let res = {};
        emitter.emit('что делаешь?', res)
        assert.equal(res.answer, 'чаек пью');
    });
});