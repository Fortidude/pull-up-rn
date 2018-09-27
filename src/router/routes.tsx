import { createBottomTabNavigator } from 'react-navigation';

//import InitPage from 'src/screens/initPage';
import InitPage from 'src/screens/initPage';

import Login from 'src/screens/auth/Login';
import Register from 'src/screens/auth/Register';
import PasswordReminder from 'src/screens/auth/PasswordReminder';

import Planner from 'src/screens/planner/Planner';
import Settings from 'src/screens/profile/Settings';
import ThemePicker from 'src/screens/profile/ThemePicker';
import LanguagePicker from 'src/screens/profile/LanguagePicker';

import Effectiveness from 'src/screens/stats/Effectiveness';
import Cardio from 'src/screens/cardio/Cardio';
import Camera from 'src/screens/camera/Camera';

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
    Settings: {
        screen: Settings
    },
    ThemePicker: {
        screen: ThemePicker
    },
    LanguagePicker: {
        screen: LanguagePicker
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
