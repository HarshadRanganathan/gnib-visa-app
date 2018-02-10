import _ from 'lodash';
import axios from 'axios';
const url = require('url');
const querystring = require('querystring');
const shortid = require('shortid');

const ST_PATH = 'website/INISOA/IOA.nsf';
const ROOT_URL = `/visa-proxy/${ST_PATH}`;
export const VISA_APPOINTMENT_DATES = 'VISA_APPOINTMENT_DATES';
export const TYPES = [
    {_id: shortid.generate(), type: 'Individual', val: 'I'},
    {_id: shortid.generate(), type: 'Family', val: 'F'}
];

function appointmentDates(responses) {
    return {
        type: VISA_APPOINTMENT_DATES,
        payload: responses
    }
}

function requestDts() {
    return _.map(TYPES, ({ val }) => {
        const URL = `${ROOT_URL}/(getDTAvail)?openagent&type=${val}`;
        return axios.get(URL);
    });
}

function requestAppts(payload) {
    return _.flatMap(payload, (payload) => {
        const { request, data } = payload;
        const { dates } = data;
        const { type } = querystring.parse(url.parse(request.responseURL).query);
        if(dates) {
            return _.map(dates, (date) => {
                const URL = `${ROOT_URL}/(getApps4DT)?openagent&dt=${date}&type=${type}&num=x`;
                return axios.get(URL);
            });
        }
    });
}

export function fetchAppointmentAvailDts() {
    return (dispatch) => {
        axios.all(requestDts())
        .then((responses) => {
            axios.all(requestAppts(responses))
            .then((responses) => {
                dispatch(appointmentDates(responses));        
            })
            .catch((error) => {
                console.log(error);                
            });
        })
        .catch((error) => {
            console.log(error);            
        });
    };
}