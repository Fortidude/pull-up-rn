import React from 'react';
import {View} from 'react-native';
import { Root, StyleProvider } from 'native-base';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { persistStore, persistCombineReducers } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

import getTheme from './../native-base-theme/components';
import Navigator from './Router/navigator.component';

import {reducers, middleware} from './Store';

console.disableYellowBox = true;

const store = createStore(reducers, middleware);
let persistor = persistStore(store);

//persistor.purge();
export default () => {
    return <Root>
        <StyleProvider style={getTheme()}>
            <PersistGate persistor={persistor}>
                <Provider store={store}>
                    <Navigator/>
                </Provider>
            </PersistGate>
        </StyleProvider>
    </Root>
}