import React from 'react';
import AppWithNavigationState, { middleware } from './router/Navigator';

import 'moment/locale/pl';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore } from 'redux-persist';
//@ts-ignore
import { PersistGate } from 'redux-persist/es/integration/react';

import Styles from './App.styles';

import MainReducer from './store/reducers';
import rootSaga from './store/sagas';
import PageLoaderAnimation from './components/PageLoaderAnimation';
import FooterBar from './components/FooterBar';
import Images from './assets/images';
import { ThemeValueInterface } from './assets/themes';
import AppManager from './components/AppManager';
import ModalManager from './components/ModalManager';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    MainReducer, composeWithDevTools(
        applyMiddleware(middleware, sagaMiddleware)
    ),
)

sagaMiddleware.run(rootSaga);
let persistor = persistStore(store);

// @TODO purge delete
persistor.purge();

interface Props { };
interface State {
    appReady: boolean;
}

export default class App extends React.Component<Props, State> {
    style: ThemeValueInterface;
    constructor(props: Props) {
        super(props);
        const settingsState = store.getState().settings;
        this.style = Styles(settingsState.theme);
        this.state = {
            appReady: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ appReady: true });
        }, 1000);
    }

    render() {
        return (
            <PersistGate persistor={persistor}>
                <Provider store={store}>
                    <PageLoaderAnimation
                        imageSource={Images.logoLoaderBackground}
                        backgroundStyle={[{ backgroundColor: 'rgba(125, 125, 255, 1)' }]}
                        isLoaded={this.state.appReady}>

                        <AppWithNavigationState />
                        <AppManager />
                        <FooterBar />
                        <ModalManager />

                    </PageLoaderAnimation>
                </Provider>
            </PersistGate>
        )
    }
}
