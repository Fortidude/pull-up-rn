import storage from 'redux-persist/es/storage'
import createExpirationTransform from 'redux-persist-transform-expire';
import { persistCombineReducers } from 'redux-persist'

import app from './app';
import navigation from './navigation';
import auth from './auth';
import user from './user';

const reducers = {
    app: app,
    auth: auth,
    nav: navigation,
    user: user
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

export default persistCombineReducers(config, reducers);
