import { combineReducers } from 'redux'; 
import ReducerGNIB from './reducer_gnib';
import ReducerLastUpdate from './reducer_lastupdate';
import ReducerProgress from './reducer_progress';

const reducers = combineReducers({
    lastUpdate: ReducerLastUpdate,
    progress: ReducerProgress,
    gnib: ReducerGNIB
});

export default reducers;