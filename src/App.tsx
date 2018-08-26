import React from 'react';
import AppWithNavigationState, { middleware } from './router/Navigator';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import MainReducer from './store/reducers';
import rootSaga from './store/sagas';
import PageLoaderAnimation from './components/PageLoaderAnimation';
import FooterBar from './components/FooterBar';
import Images from './assets/images';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    MainReducer, composeWithDevTools(
        applyMiddleware(middleware, sagaMiddleware)
    ),
);

sagaMiddleware.run(rootSaga);

interface Props { };
interface State {
    appReady: boolean;
}

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

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
            <Provider store={store}>
                <PageLoaderAnimation
                    imageSource={Images.logoLoaderBackground}
                    backgroundStyle={{ backgroundColor: 'rgba(125, 125, 255, 1)', }}
                    isLoaded={this.state.appReady}>
                    <AppWithNavigationState />
                    <FooterBar/>
                </PageLoaderAnimation>
            </Provider>
        )
    }
}
