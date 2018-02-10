import _ from 'lodash';
import { VISA_APPOINTMENT_DATES, TYPES } from '../actions/visa';
const url = require('url');
const querystring = require('querystring');

function payloadTransformer(payload) {
    let response = {};
    _.map(payload, (payload) => {
        const { request, data } = payload;
        const { type: val } = querystring.parse(url.parse(request.responseURL).query);        
        const { _id: typeId, type} = _.find(TYPES, ['val', val]);
        response = _.merge(response, { [type]: _.merge({_id: typeId}, data)});
    });
    return response;
}

export default function(state={}, action) {
    switch(action.type) {
        case VISA_APPOINTMENT_DATES:
            return payloadTransformer(action.payload);
        default:
            return state;
    }
}