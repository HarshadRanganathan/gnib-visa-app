import _ from 'lodash';
import axios from 'axios';
import { PAGE_KEY, getPageKey } from './gnib';

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

function isKeyExpired(data) {
    if(data && data['error'] && _.includes(data.error, 'reloading')) {       
        return true;
    }
    return false;
}

export function axiosInterceptors() { 
    axios.interceptors.request.use((config) => {
        requestsCounter++;
        return config;
    });

    axios.interceptors.response.use(async (response) => {
        --requestsCounter;
        if(isKeyExpired(response.data)) {
            const pageKey = await getPageKey();
            sessionStorage.setItem(PAGE_KEY, pageKey);
            // replace url with refreshed page key
            const config = response.config;
            config.url = config.url.replace(/(k=(\d+\w+|\w+\d+)+)|(&p=(\d+\w+|\w+\d+)+)/g,'') + pageKey;
            return axios.request(response.config);
        } 
        return response;
    }, (error) => {
        --requestsCounter;
        return Promise.reject(error);
    });
}
