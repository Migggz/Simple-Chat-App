const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('Should Reject non-string values', () => {
        var res = isRealString(90);
        expect(res).toBe(false);
    });
    it('Should Reject string with only spaces', () => {
        var res = isRealString('    ');
        expect(res).toBe(false);
    });
    it('Should Allow string with non-space characters', () => {
        var res = isRealString( '  Maged  ');
        expect(res).toBe(true);
    });
});