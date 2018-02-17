import reducer from '../reducer_visa';
import { VISA_APPOINTMENT_DATES, VISA_API_ERROR } from '../../actions/visa';
import payload from './visa_payload.json';
import finalState from './visa_state.json';

const initialState = {};

describe('VISA Reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
    it('should not affect state', () => {
        expect(reducer(undefined, {type: 'NOT_EXISTING'})).toEqual(initialState);
    });
    it(`should handle ${VISA_APPOINTMENT_DATES}`, () => {        
        const action = { type: VISA_APPOINTMENT_DATES, payload };
        expect(reducer(undefined, action)).toEqual(finalState);
    });
    it(`should handle ${VISA_API_ERROR}`, () => {
        const action = { type: VISA_API_ERROR, error: 'We are temporarily facing issues in getting the available appointment slots. Please try again after some time.' };
        expect(reducer(finalState, action)).toEqual(action);
    });
});