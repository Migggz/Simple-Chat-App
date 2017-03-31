var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('Should Generate Correct Message Object', () => {
        var from = 'Jen';
        var text = 'Some Message';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    });
});

describe('generateLocationMessage', () => {
    it('Should Generate Correct Location Message Object', () => {
        var from = 'Maged';
        var latitude = 10;
        var longitude = 20;
        var url = 'https://www.google.com/maps?q=10,20';
        var message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});