import _ from 'lodash';
import { GNIB_APPOINTMENT_DATES, CATEGORIES, TYPES } from '../actions/gnib';
const url = require('url');
const querystring = require('querystring');

function payloadTransformer(payload) {
    let response = {};
    _.map(payload, (payload) => {
        const { request, data } = payload;
        const { cat, typ } = querystring.parse(url.parse(request.responseURL).query);
        const catId = _.find(CATEGORIES, ['category', cat])._id;
        const typId = _.find(TYPES, ['type', typ])._id;
        response = _.merge(response, { [cat]: 
            { 
                _id: catId,
                [typ]: _.merge({_id: typId}, data) 
            } 
        });
    });
    return response;
}

export default function(state={}, action) {
    switch(action.type) {
        case GNIB_APPOINTMENT_DATES:
            return payloadTransformer(action.payload);
        default:
            return state;
    }
}