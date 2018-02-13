import _ from 'lodash';
import axios from 'axios';
import { emitRequestsProgress } from './progress';
const url = require('url');
const querystring = require('querystring');
const shortid = require('shortid');

export const VISA_APPOINTMENT_DATES = 'VISA_APPOINTMENT_DATES';
export const INDIVIDUAL = 'Individual';
export const FAMILY = 'Family';
export const IND_CODE = 'I';
export const FAM_CODE = 'F';
export const TYPES = [
    {_id: shortid.generate(), type: `${INDIVIDUAL}`, code: `${IND_CODE}`},
    {_id: shortid.generate(), type: `${FAMILY}`, code: `${FAM_CODE}`}
];

const ST_PATH = 'website/INISOA/IOA.nsf';
const ROOT_URL = `/visa-proxy/${ST_PATH}`;

function appts(responses) {
    return {
        type: VISA_APPOINTMENT_DATES,
        payload: responses
    }
}

function requestDts() {
    return _.map(TYPES, ({ code }) => {
        const URL = `${ROOT_URL}/(getDTAvail)?openagent&type=${code}`;
        return axios.get(URL);
    });
}

function getRequests(date, code) {
    if(code == IND_CODE) {        
        const URL = `${ROOT_URL}/(getApps4DT)?openagent&dt=${date}&type=${code}&num=x`;
        return axios.get(URL);
    } else if(code == FAM_CODE) {
        return _.map(_.range(1, 11), (val) => {
            const URL = `${ROOT_URL}/(getApps4DT)?openagent&dt=${date}&type=${code}&num=${val}`;
            return axios.get(URL);
        });
    }
}

function requestAppts(payload) {
    return _.flatMap(payload, (payload) => {
        const { request, data } = payload;
        const { dates } = data;
        const { type: code } = querystring.parse(url.parse(request.responseURL).query);
        if(dates) {
            return _.flatMap(dates, (date) => {
                return getRequests(date, code);                  
            });
        }
    });
}

export function fetchVisaAppointmentAvailDts(responseCallback) {
    return (dispatch) => {
        emitRequestsProgress(dispatch);
        axios.all(requestDts())
        .then((responses) => {
            axios.all(requestAppts(responses))
            .then((responses) => {
                if(responseCallback) responseCallback();
                return responses;
            })
            .then((responses) => {
                dispatch(appts(responses));        
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