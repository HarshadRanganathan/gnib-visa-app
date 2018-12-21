import cheerio from 'cheerio';
import { VISA_CURRENT_PROCESSING_TIMES, VISA_ERROR } from '../actions/visa';

const RE_ENTRY_VISA_SELECTOR = 'tr:contains("Re-entry") td.visa-decision:nth-of-type(2)';

export const CURRENT_PROCESSING_TIMES = 'CurrentProcessingTimes';
export const RE_ENTRY = 'Re-Entry';

function payloadTransformer({ data }) {
    let response = {};
    let $ = cheerio.load(data);
    response[CURRENT_PROCESSING_TIMES] = {}
    response[CURRENT_PROCESSING_TIMES][RE_ENTRY] = $(RE_ENTRY_VISA_SELECTOR).text();
    return response;
}

export default function(state={}, action) {
    switch(action.type) {
        case VISA_CURRENT_PROCESSING_TIMES:
            return payloadTransformer(action.payload);
        case VISA_ERROR:
            return action;
        default:
            return state;
    }
}