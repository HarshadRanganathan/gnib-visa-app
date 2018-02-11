import axios from 'axios';

export const REQUESTS_PROGRESS = 'REQUESTS_PROGRESS';
var requestsCounter = 0;
var percentCompleted = 0;

export function emitRequestsProgress(dispatch) {
    let progressIntervalId = setInterval(() => {
        if(percentCompleted == 100) {
            clearInterval(progressIntervalId);
        } else {
            return dispatch({
                type: REQUESTS_PROGRESS,
                payload: percentCompleted
            });
        }
    }, 5);
}

function progress({loaded, total}) {   
    percentCompleted = Math.floor((loaded * 100) / (total * requestsCounter)); 
}

export function progressTracker() { 
    axios.interceptors.request.use(function(config) {
        requestsCounter++;
        return config;
    });
    axios.interceptors.response.use(function(response) {
        --requestsCounter;
        return response;
    }, function(error) {
        --requestsCounter;
        return Promise.reject(error);
    });
    axios.defaults.onDownloadProgress = progress;
    axios.defaults.onUploadProgress = progress;
}
