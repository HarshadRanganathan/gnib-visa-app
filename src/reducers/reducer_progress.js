import { REQUESTS_PROGRESS } from '../actions/progress';

export default function(state={}, action) {
    switch(action.type) {
        case REQUESTS_PROGRESS:       
            return { percent: action.payload };
        default: 
            return state;
    }
}