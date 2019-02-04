import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {history} from './history';

export const rootReducer = combineReducers({
    router: connectRouter(history)
});
