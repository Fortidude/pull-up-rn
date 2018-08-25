import {combineReducers} from 'redux';

import app from './app';
import navigation from './navigation';
import auth from './auth';

const MainReducer = combineReducers({
    app: app,
    auth: auth,
    nav: navigation
});

export default MainReducer;
