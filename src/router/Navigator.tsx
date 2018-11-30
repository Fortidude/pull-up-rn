import React from 'react';
import { createStackNavigator, HeaderProps, StackViewTransitionConfigs } from 'react-navigation';

//@ts-ignore
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator.js';

import { connect } from 'react-redux';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers'

import routes from './routes';
import Header from '../components/Header';
import { Animated, Easing } from 'react-native';
import NavigationAnimated from 'src/service/NavigationAnimated';

const transitionConfig = () => {
    return {
        // transitionSpec: {
        //     duration: 300, 
        //     easing: Easing.bezier(0.95, 0.05, 0.795, 0.035),
        //     useNativeDriver: true,
        // },

        /**
         * This is optimized for this app.
         */
        screenInterpolator: (sceneProps: any) => {
            const { position, layout, scene, index, scenes } = sceneProps
            const thisSceneIndex = scene.index
            const height = layout.initHeight
            const width = layout.initWidth
            const isModal = scenes[thisSceneIndex].descriptor.options.modal || false;

            let firstScene = false;
            if (!scenes[thisSceneIndex - 1]) {
                firstScene = true;
            }

            const showTranslateX = !isModal && !firstScene;
            const showTranslateY = isModal || firstScene;

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [showTranslateX ? width : 0, 0, scene.index !== 0 ? -40 : 0]
            });

            const translateY = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [showTranslateY ? height : 0, 0, (scene.index === 0) ? -40 : 0]
            });


            const opacity = position.interpolate({
                inputRange: [thisSceneIndex -1, thisSceneIndex, thisSceneIndex + 0.8],
                outputRange: [0.5, 1, 0]
            });

            return { transform: [{ translateX }, { translateY }], opacity: opacity };
        },
    }
}

export const Navigator = createStackNavigator(routes, {
    headerMode: 'float',
    navigationOptions: {
        gesturesEnabled: true,
        header: (headerProps: HeaderProps) => <Header headerProps={headerProps} />
    },
    cardStyle: {
        backgroundColor: 'transparent'
    },
    transitionConfig
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
