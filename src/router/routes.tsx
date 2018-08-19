import { createBottomTabNavigator } from 'react-navigation';

import Login from '../screens/login/Login';
import Register from '../screens/login/Register';
import PasswordReminder from '../screens/login/PasswordReminder';

import Planner from '../screens/planner/Planner';
import Profile from '../screens/profile/Profile';
import Settings from '../screens/profile/Settings';

import Effectiveness from '../screens/stats/Effectiveness';
import Cardio from '../screens/cardio/Cardio';
import Camera from '../screens/camera/Camera';

const routes = {
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