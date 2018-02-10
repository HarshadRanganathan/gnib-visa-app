import axios from 'axios';
const shortid = require('shortid');

const ST_PATH = 'Website/AMSREG/AMSRegWeb.nsf';
const ROOT_URL = `/gnib-proxy/${ST_PATH}`;
export const GNIB_APPOINTMENT_DATES = 'GNIB_APPOINTMENT_DATES';
export const CATEGORIES = [
    {_id: shortid.generate(), category: 'Work'}, 
    {_id: shortid.generate(), category: 'Study'},
    {_id: shortid.generate(), category: 'Other'}
];
export const TYPES = [
    {_id: shortid.generate(), type: 'New'},
    {_id: shortid.generate(), type:  'Renewal'}
];

function appointmentDates(response) {
    return {
        type: GNIB_APPOINTMENT_DATES,
        payload: response
    };
}

function requests() {
    return _.flatMap(CATEGORIES, ({category}) => {
        return _.map(TYPES, ({type}) => {
            const URL = `${ROOT_URL}/(getAppsNear)?openpage&cat=${category}&sbcat=All&typ=${type}`;
            return axios.get(URL);
        });
    });
}

export function fetchAppointmentAvailDts(responseCallback) {    
    return (dispatch) => {
        axios.all(requests())
            .then((responses) => {
                if(responseCallback) responseCallback();
                return responses;
            })
            .then((responses) => {
                dispatch(appointmentDates(responses));
            })
            .catch((error) => {
                /* TODO: UI handling */
                console.log(error);
            });
    };
}