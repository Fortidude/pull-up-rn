import { combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import storage from 'redux-persist/es/storage' // default: localStorage if web, AsyncStorage if react-native
import { persistCombineReducers } from 'redux-persist'
import createExpirationTransform from 'redux-persist-transform-expire';

import AuntReducer from './Auth/reducers';
import exerciseReducer from './Exercise/reducers';
import plannerReducer from './Planner/reducers';
import settingsReducer from './Settings/reducers';
import trainingReducer from './Training/reducers';

const prod = applyMiddleware(thunk);
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? compose(prod, window.__REDUX_DEVTOOLS_EXTENSION__()) : prod;

let rawReducers = {
    auth: AuntReducer,
    exercise: exerciseReducer,
    planner: plannerReducer,
    settings: settingsReducer,
    training: trainingReducer
};

const expireTransform = createExpirationTransform({
    expireKey: 'expires_at',
    defaultState: {
        custom: 'values'
    }
});

const config = {
    key: 'root',
    version: 2,
    blacklist: ['auth'],
    transforms: [expireTransform],
    storage,
};

export const middleware = devTools;
export const reducers = persistCombineReducers(config, rawReducers);
//export const reducers = combineReducers(rawReducers);
