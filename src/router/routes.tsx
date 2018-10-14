import { createBottomTabNavigator, TabBarBottom } from 'react-navigation';

//import InitPage from 'src/screens/initPage';
import InitPage from 'src/screens/initPage';

import Login from 'src/screens/auth/Login';
import Register from 'src/screens/auth/Register';
import PasswordReminder from 'src/screens/auth/PasswordReminder';

import Planner from 'src/screens/planner/Planner';
import Settings from 'src/screens/profile/Settings';
import ThemePicker from 'src/screens/profile/ThemePicker';
import LanguagePicker from 'src/screens/profile/LanguagePicker';

import Calendar from 'src/screens/calendar/Calendar';

import Effectiveness from 'src/screens/stats/Effectiveness';
import Popularity from 'src/screens/stats/Popularity';
import Progress from 'src/screens/stats/Progress';

import Cardio from 'src/screens/cardio/Cardio';
import Camera from 'src/screens/camera/Camera';

const routes = {
    // Calendar_t: {
    //     screen: Calendar
    // },
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
    Calendar: {
        screen: Calendar
    },
    Cardio: {
        screen: Cardio
    },
    Camera: {
        screen: Camera
    },
    EffectivenessStats: {
        screen: Effectiveness
    },
    PopularityStats: {
        screen: Popularity
    },
    ProgressStats: {
        screen: Progress
    }
};

export default routes;
