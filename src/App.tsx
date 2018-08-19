import React from 'react';
import AppWithNavigationState, {middleware} from './router/Navigator';

import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import MainReducer from './store/reducers';
import rootSaga from './store/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    MainReducer, composeWithDevTools(
        applyMiddleware(middleware, sagaMiddleware)
    ),
);

sagaMiddleware.run(rootSaga);

type Props = {};
export default class App extends React.Component<Props> {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState/>
            </Provider>
        )
    }
}
