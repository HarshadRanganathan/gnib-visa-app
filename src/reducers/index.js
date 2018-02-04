import { combineReducers } from 'redux'; 
import ReducerGNIB from './reducer_gnib';
import ReducerLastUpdate from './reducer_lastupdate';

const reducers = combineReducers({
    lastUpdate: ReducerLastUpdate,
    gnib: ReducerGNIB
});

export default reducers;