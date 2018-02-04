import { APPOINTMENT_DATES } from '../actions/gnib';

export default function(state={}, action) {
    switch(action.type) {
        case APPOINTMENT_DATES:
            return action.payload.data;
        default:
            return state;
    }
}