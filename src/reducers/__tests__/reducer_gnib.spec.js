import reducer from '../reducer_gnib';
import { GNIB_APPOINTMENT_DATES, GNIB_API_ERROR } from '../../actions/gnib';
import payload from './gnib_payload.json';
import finalState from './gnib_state.json';

const initialState = {};

describe('GNIB Reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
    it('should not affect state', () => {
        expect(reducer(undefined, {type: 'NOT_EXISTING'})).toEqual(initialState);
    });
    it(`should handle ${GNIB_APPOINTMENT_DATES}`, () => {        
        const action = { type: GNIB_APPOINTMENT_DATES, payload };
        expect(reducer(undefined, action)).toEqual(finalState);
    });
    it(`should handle ${GNIB_API_ERROR}`, () => {
        const action = { type: GNIB_API_ERROR, error: 'We are temporarily facing issues in getting the available appointment slots. Please try again after some time.' };
        expect(reducer(finalState, action)).toEqual(action);
    });
});