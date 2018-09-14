import _ from 'lodash';
import axios from 'axios';
import { emitRequestsProgress } from './progress';

const ST_PATH = 'Website/AMSREG/AMSRegWeb.nsf';
const ROOT_URL = `/gnib-proxy/${ST_PATH}`;
export const GNIB_APPOINTMENT_DATES = 'GNIB_APPOINTMENT_DATES';
export const GNIB_API_ERROR = 'GNIB_API_ERROR';
export const CATEGORIES = [
    { category: 'Work' }, 
    { category: 'Study' },
    { category: 'Other' }
];
export const TYPES = [
    { type: 'New' },
    { type: 'Renewal' }
];

function appts(responses) {
    return {
        type: GNIB_APPOINTMENT_DATES,
        payload: responses
    };
}

function requestAppts() {
    return _.flatMap(CATEGORIES, ({category}) => {
        return _.map(TYPES, ({type}) => {
            const URL = `${ROOT_URL}/(getAppsNear)?readform&cat=${category}&sbcat=All&typ=${type}`;
            return axios.get(URL);
        });
    });
}

export function fetchGnibAppointmentAvailDts(responseCallback) {    
    return (dispatch) => {
        emitRequestsProgress(dispatch);
        axios.all(requestAppts())
        .then((responses) => {
            if(responseCallback) responseCallback();
            return responses;
        })
        .then((responses) => {
            dispatch(appts(responses));
        })
        .catch((error) => {
            dispatch({type: GNIB_API_ERROR, error: 'We are temporarily facing issues in getting the available appointment slots. Please try again after some time.'});
        });
    };
}