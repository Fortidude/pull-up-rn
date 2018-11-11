import { createBottomTabNavigator, TabBarBottom } from 'react-navigation';

//import InitPage from 'src/screens/initPage';
import InitPage from 'src/screens/initPage';

import Auth from 'src/screens/auth';
import Login from 'src/screens/auth/Login';
import Register from 'src/screens/auth/Register';
import PasswordReminder from 'src/screens/auth/PasswordReminder';

import Planner from 'src/screens/planner/Planner';
import Profile from 'src/screens/profile/Profile';
import Settings from 'src/screens/profile/Settings';
import ThemePicker from 'src/screens/profile/ThemePicker';
import LanguagePicker from 'src/screens/profile/LanguagePicker';
import Notifications from 'src/screens/profile/Notifications';

import Calendar from 'src/screens/calendar/Calendar';

import Effectiveness from 'src/screens/stats/Effectiveness';
import Popularity from 'src/screens/stats/Popularity';
import Progress from 'src/screens/stats/Progress';

import Cardio from 'src/screens/cardio/Cardio';
import Camera from 'src/screens/camera/Camera';

const routes = {
    // Calendar: {
    //     screen: Calendar
    // },
    InitPage: {
        screen: InitPage,
        navigationOptions: {
            header: null,
            gesturesEnabled: false,
        }
    },
    Auth: {
        screen: Auth
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
        screen: Profile,
        navigationOptions: {
            modal: true,
            allScreenDismiss: true
            //  gesturesEnabled: false
        }
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
    Notifications: {
        screen: Notifications
    },
    Calendar: {
        screen: Calendar,
        navigationOptions: {
            modal: true,
            allScreenDismiss: true
            //  gesturesEnabled: false
        }
    },
    Cardio: {
        screen: Cardio,
        navigationOptions: {
            modal: true,
            allScreenDismiss: true
            //  gesturesEnabled: false
        }
    },
    Camera: {
        screen: Camera,
        navigationOptions: {
            modal: true,
            allScreenDismiss: true
            //  gesturesEnabled: false
        }
    },
    EffectivenessStats: {
        screen: Effectiveness,
        navigationOptions: {
            modal: true,
            allScreenDismiss: false
            //  gesturesEnabled: false
        }
    },
    PopularityStats: {
        screen: Popularity,
        navigationOptions: {
            modal: true,
            allScreenDismiss: true
            //   gesturesEnabled: false
        }
    },
    ProgressStats: {
        screen: Progress,
        navigationOptions: {
            modal: true,
            allScreenDismiss: true
            //  gesturesEnabled: false
        }
    }
};

export default routes;
