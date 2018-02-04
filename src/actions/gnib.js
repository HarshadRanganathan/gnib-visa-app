import axios from 'axios';

const ST_PATH = 'Website/AMSREG/AMSRegWeb.nsf';
const ROOT_URL = `https://burghquayregistrationoffice.inis.gov.ie/${ST_PATH}`;
const CATEGORIES = ['Work', 'Study', 'Other'];
const TYPE = ['New', 'Renewal'];

export const APPOINTMENT_DATES = 'APPOINTMENT_DATES';

function appointmentDates(response) {
    return {
        type: APPOINTMENT_DATES,
        payload: response
    };
}

function requests() {
    return _.flatMap(CATEGORIES, (category) => {
        return _.map(TYPE, (type) => {
            const URL = `${ROOT_URL}/(getAppsNear)?openpage&cat=${category}&sbcat=All&typ=${type}`;
            return axios.get(URL);
        });
    });
}

export function fetchAppointmentAvailDts() {    
    return (dispatch) => {
        axios.all(requests())
            .then((responses) => {
                dispatch(appointmentDates(responses));
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
}