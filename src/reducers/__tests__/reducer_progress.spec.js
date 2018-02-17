import reducer from '../reducer_progress';
import { REQUESTS_PROGRESS } from '../../actions/progress';

const initialState = {};

describe('Progress Reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
    it('should not affect state', () => {
        expect(reducer(undefined, {type: 'NOT_EXISTING'})).toEqual(initialState);
    });
    it(`should handle ${REQUESTS_PROGRESS}`, () => {
        const action = { type: REQUESTS_PROGRESS, payload: 50 };
        expect(reducer(undefined, action)).toHaveProperty('percent');
        expect(reducer(undefined, action).percent).toEqual(50);
    });
});