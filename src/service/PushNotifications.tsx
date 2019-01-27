import PushNotificationService, { PushNotificationPermissions } from 'react-native-push-notification';
import { User } from 'src/api';

class PushNotification {
    private static instance: PushNotification;

    static getInstance() {
        if (!PushNotification.instance) {
            PushNotification.instance = new PushNotification();
        }
        return PushNotification.instance;
    }

    private constructor() {
    }

    checkPersmissions(callback: (permissions: PushNotificationPermissions) => void) {
        PushNotificationService.checkPermissions(callback);
    }

    request() {
        PushNotificationService.requestPermissions();
    }

    resetBadge() {
        PushNotificationService.setApplicationIconBadgeNumber(0);
    }

    onPushRegistered(token: { os: string; token: string }) {
        User.updateUserDeviceId(token.token);
    }

    configure(onNotification: (...any: any) => void) {
        PushNotificationService.configure({
            onRegister: this.onPushRegistered,
            onNotification: onNotification,
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            popInitialNotification: true,

            /**
              * (optional) default: true
              * - Specified if permissions (ios) and token (android and ios) will requested or not,
              * - if not, you must call PushNotificationsHandler.requestPermissions() later
              */
            requestPermissions: false,
        });
    }
}

export default PushNotification.getInstance();
