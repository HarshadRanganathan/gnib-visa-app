import _ from 'lodash';
import { VISA_APPOINTMENT_DATES, VISA_API_ERROR, TYPES, INDIVIDUAL, FAMILY } from '../actions/visa';
const url = require('url');
const querystring = require('querystring');
const moment = require('moment');

function formatTimeSlots({data}) {
    if(data.slots) {
        _.forEach(data.slots, (slot) => {
            _.setWith(slot, 'time', moment(slot.time, 'DD/MM/YYYY hh:mm A').format('DD MMMM YYYY - hh:mm A')); 
        });
    } 
}

function payloadTransformer(response, payload) {
    _.map(payload, (payload) => {
        formatTimeSlots(payload);
        const { config, data } = payload;
        const { dt, type: code, num } = querystring.parse(url.parse(config.url).query);        
        const { type } = _.find(TYPES, ['code', code]);
        if(type == INDIVIDUAL) {
            response[INDIVIDUAL].appts.push(_.merge({ date: dt }, data));
        } else if(type == FAMILY) {
            if(_.find(response[FAMILY].appts, { date: dt })) {
                const index = _.findIndex(response[FAMILY].appts, { date: dt });
                response[FAMILY].appts[index].familyMembers.push(_.merge({ num }, data));
            } else {
                const familyMembers = { familyMembers: [_.merge({ num }, data)] };
                response[FAMILY].appts.push(_.merge({ date: dt }, familyMembers));
            }
        }
    });
    return response;
}

export default function(state={}, action) {
    switch(action.type) {
        case VISA_APPOINTMENT_DATES:
            let response = {};
            _.map(TYPES, ({ type }) => {
                const typeObj = { [type]: { appts: [] } };
                response = _.merge(response, typeObj)
            });
            return payloadTransformer(response, action.payload);  
        case VISA_API_ERROR:
            return action;
        default:
            return state;
    }
}