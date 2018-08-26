import React from 'react';
import { BackHandler, Easing, Animated } from 'react-native';
import { createStackNavigator, HeaderProps } from 'react-navigation';
import StackView from 'react-navigation/src/views/StackView/StackViewStyleInterpolator.js';

import { connect } from 'react-redux';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
    createNavigationPropConstructor,
    initializeListeners
} from 'react-navigation-redux-helpers'

import routes from './routes';
import Header from '../components/Header';

export const Navigator = createStackNavigator(routes, {
    headerMode: 'float',
    navigationOptions: {
        gesturesEnabled: true,
        header: (headerProps: HeaderProps) => <Header headerProps={headerProps} />
    },

    // transitionConfig: () => ({
    //     transitionSpec: {
    //         duration: 400,
    //         easing: Easing.out(Easing.poly(4)),
    //         timing: Animated.timing,
    //     },
    //     screenInterpolator: (props) => {
    //         return StackView.forHorizontal(props)
    //     }
    // }),
    cardStyle: {
        backgroundColor: 'white'
    }
});

export const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav,
);

const App = reduxifyNavigator(Navigator, "root");

const mapStateToProps = (state: any) => ({
    state: state.nav
});

interface Props { }
class AppWrapper extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <App {...this.props} />
            </React.Fragment>
        )
    }
}

const AppWithNavigationState = connect(mapStateToProps)(AppWrapper);
export default AppWithNavigationState;
