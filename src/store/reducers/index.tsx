import storage from 'redux-persist/es/storage'
import createExpirationTransform from 'redux-persist-transform-expire';
import { persistCombineReducers } from 'redux-persist'

import app from './app';
import navigation from './navigation';
import auth from './auth';
import user from './user';
import settings from './settings';
import modal from './modal';
import planner from './planner';

const reducers = {
    app: app,
    auth: auth,
    nav: navigation,
    user: user,
    settings: settings,
    modal: modal,
    planner: planner
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
    blacklist: ['app', 'nav', 'modal'],
    transforms: [expireTransform],
    storage,
};

export default persistCombineReducers(config, reducers);
