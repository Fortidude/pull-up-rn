import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'

import {Animated, Easing} from 'react-native';

import { default as LoginScreen } from './../Screens/Auth/login';

import { default as HomeScreen } from './../Screens/Home/home';
import { default as AboutScreen } from './../Screens/About/about';
import { default as ProfileScreen } from './../Screens/Profile/profile';

import { default as StatisticsScreen } from '../Screens/Statistics/statistics';

import { default as NewGoalScreen } from '../Screens/Planner/newGoal';

import { default as CardioScreen } from './../Screens/Training/cardio';

import { default as SettingsScreen } from './../Screens/Settings/settings';
import { default as TestScreen } from './../Screens/Test/test';

const AppNavigator = StackNavigator({
    //Test: {screen: TestScreen},
    Login: {screen: LoginScreen},

    Home: {screen: HomeScreen},
    About: {screen: AboutScreen},
    Profile: {screen: ProfileScreen},

    Statistics: {screen: StatisticsScreen},
    NewGoal: {screen: NewGoalScreen},

    Cardio: {screen: CardioScreen},

    Settings: {screen: SettingsScreen},


}, {
    mode: 'card',
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: true,
    },

    transitionConfig: () => ({
        transitionSpec: {
            duration: 200,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
        },
        screenInterpolator: (props) => {
            return CardStackStyleInterpolator.forHorizontal(props)
        }
    }),
    cardStyle: {
        backgroundColor: '#000000'
       // backgroundColor: '#ffffff'
       // backgroundColor: "transparent"
    }
});

const prevGetStateForActionHomeStack = AppNavigator.router.getStateForAction;
AppNavigator.router.getStateForAction = (action, state) => {
    if (state && action.type === 'ReplaceCurrentScreen') {
        const routes = state.routes.slice(0, state.routes.length - 1);
        routes.push(action);
        return {
            ...state,
            routes,
            index: routes.length - 1,
        };
    }

    return prevGetStateForActionHomeStack(action, state);
};

export default AppNavigator;