import React from 'react';
import { createStackNavigator, HeaderProps } from 'react-navigation';

import { connect } from 'react-redux';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers'

import routes from './routes';
import Header from '../components/Header';

export const Navigator = createStackNavigator(routes, {
    headerMode: 'float',
    navigationOptions: {
        gesturesEnabled: true,
        header: (headerProps: HeaderProps) => <Header headerProps={headerProps} />
    },
    cardStyle: {
        backgroundColor: 'transparent'
    }
});

export const middleware = createReactNavigationReduxMiddleware(
    'root',
    //@ts-ignore
    state => state.nav,
);

const App = reduxifyNavigator(Navigator, "root");

const mapStateToProps = (state: any) => ({
    state: state.nav
});

interface Props { state: any; dispatch: any }
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
