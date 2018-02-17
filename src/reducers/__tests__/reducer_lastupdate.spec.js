import reducer from '../reducer_lastupdate';

const initialState = {};

describe('Last Update Reducer', () => {
    it('should return the current time', () => {
        expect(reducer(undefined, {})).toHaveProperty('time');
        expect(reducer(undefined, {}).time).toMatch(new RegExp('((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))'));
    });
});