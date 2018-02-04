import axios from 'axios';

const ST_PATH = 'Website/AMSREG/AMSRegWeb.nsf';
const ROOT_URL = `https://burghquayregistrationoffice.inis.gov.ie/${ST_PATH}`;

export const APPOINTMENT_DATES = 'APPOINTMENT_DATES';

function appointmentDates(response) {
    return {
        type: APPOINTMENT_DATES,
        payload: response
    };
}

export function fetchAppointmentAvailDts(category, type) {
    const URL = `${ROOT_URL}/(getAppsNear)?openpage&cat=${category}&sbcat=All&typ=${type}`;
    
    return (dispatch) => {
        axios.get(URL)
            .then((response) => {
                dispatch(appointmentDates(response));
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
}