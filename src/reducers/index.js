import { combineReducers } from 'redux'; 
import ReducerGNIB from './reducer_gnib';

const reducers = combineReducers({
    gnib: ReducerGNIB
});

export default reducers;