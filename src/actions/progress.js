import axios from 'axios';

export const REQUESTS_PROGRESS = 'REQUESTS_PROGRESS';
var requestsCounter = 0;

export function emitRequestsProgress(dispatch) {
    let percentCompleted = 0;
    const progress = ({loaded, total}) => {
        percentCompleted = Math.floor((loaded * 100) / (total * requestsCounter));                
        dispatch({
            type: REQUESTS_PROGRESS,
            payload: percentCompleted
        });
    }
    axios.defaults.onDownloadProgress = progress;
    axios.defaults.onUploadProgress = progress;
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
}
