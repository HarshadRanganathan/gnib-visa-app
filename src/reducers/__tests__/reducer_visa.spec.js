import fs from 'fs';
import path from 'path';
import reducer from '../reducer_visa';
import { VISA_CURRENT_PROCESSING_TIMES, VISA_ERROR } from '../../actions/visa';

const initialState = {};
const finalState = {"CurrentProcessingTimes":{"Re-Entry":"14 September 2020"}};

describe('VISA Reducer', () => {
    let payload = {};
    beforeEach(() => {
        payload['data'] = fs.readFileSync(path.resolve(__dirname, 'visa_current_processing_times.html'), 'utf-8');
    });
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
    it('should not affect state', () => {
        expect(reducer(undefined, {type: 'NOT_EXISTING'})).toEqual(initialState);
    });
    it(`should handle ${VISA_CURRENT_PROCESSING_TIMES}`, () => {
        const action = { type: VISA_CURRENT_PROCESSING_TIMES, payload };
        expect(reducer(undefined, action)).toEqual(finalState);
    });
    it(`should handle ${VISA_ERROR}`, () => {
        const action = { type: VISA_ERROR, error: 'We are temporarily facing issues in getting the current processing times. Please try again after some time.' };
        expect(reducer(finalState, action)).toEqual(action);
    });
});