import { createBottomTabNavigator } from 'react-navigation';

import InitPage from '../screens/initPage';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import PasswordReminder from '../screens/auth/PasswordReminder';

import Planner from '../screens/planner/Planner';
import Profile from '../screens/profile/Profile';
import Settings from '../screens/profile/Settings';

import Effectiveness from '../screens/stats/Effectiveness';
import Cardio from '../screens/cardio/Cardio';
import Camera from '../screens/camera/Camera';

const routes = {
    InitPage: {
        screen: InitPage,
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        }
    },
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
    PasswordReminder: {
        screen: PasswordReminder
    },
    Planner: {
        screen: Planner
    },
    Profile: {
        screen: Profile
    },
    Settings: {
        screen: Settings
    },
    Cardio: {
        screen: Cardio
    },
    Camera: {
        screen: Camera
    },
    Stats: createBottomTabNavigator({
        effectiveness: {
            screen: Effectiveness
        }
    })
};

export default routes;