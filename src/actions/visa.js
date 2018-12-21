import axios from 'axios';
import { emitRequestsProgress } from './progress';

const CPT_PATH = 'en/INIS/Pages/Current_Processing_Times'
const ROOT_URL = `/inis-proxy/${CPT_PATH}`;

export const VISA_CURRENT_PROCESSING_TIMES = 'VISA_CURRENT_PROCESSING_TIMES';
export const VISA_ERROR = 'VISA_ERROR';

function currentProcessingTimes(response) {
    return {
        type: VISA_CURRENT_PROCESSING_TIMES,
        payload: response
    };
}

export function fetchVisaCurrentProcessingTimes(callback) {
    return (dispatch) => {
        emitRequestsProgress(dispatch);
        axios.get(`${ROOT_URL}`)
        .then((response) => {
            dispatch(currentProcessingTimes(response))
        })
        .catch((err) => {
            dispatch({type: VISA_ERROR, error: 'We are temporarily facing issues in getting the current processing times. Please try again after some time.'});
        });
    };
}