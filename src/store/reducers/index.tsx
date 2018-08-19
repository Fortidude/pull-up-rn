import {combineReducers} from 'redux';

import app from './app';
import navigation from './navigation';

const MainReducer = combineReducers({
    app: app,
    nav: navigation
});

export default MainReducer;
