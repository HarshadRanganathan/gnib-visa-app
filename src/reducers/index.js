import { combineReducers } from 'redux'; 
import ReducerGNIB from './reducer_gnib';
import ReducerVISA from './reducer_visa';
import ReducerLastUpdate from './reducer_lastupdate';

const reducers = combineReducers({
    lastUpdate: ReducerLastUpdate,
    gnib: ReducerGNIB,
    visa: ReducerVISA
});

export default reducers;