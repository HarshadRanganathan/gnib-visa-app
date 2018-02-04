import _ from 'lodash';
import { APPOINTMENT_DATES } from '../actions/gnib';
const url = require('url');
const querystring = require('querystring');

function payloadTransformer(payload) {
    let response = {};
    _.map(payload, (payload) => {
        const { request, data } = payload;
        const { cat, typ } = querystring.parse(url.parse(request.responseURL).query);
        response = _.merge(response, { [cat]: { [typ]: data } });
    });
    return response;
}

export default function(state={}, action) {
    switch(action.type) {
        case APPOINTMENT_DATES:
            return payloadTransformer(action.payload);
        default:
            return state;
    }
}