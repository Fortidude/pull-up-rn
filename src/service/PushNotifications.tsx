import NotificationsIOS from 'react-native-notifications';


class PushNotification {
    private static instance: PushNotification;

    static getInstance() {
        if (!PushNotification.instance) {
            PushNotification.instance = new PushNotification();
        }
        return PushNotification.instance;
    }

    private constructor() {
       // NotificationsIOS.addEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
       // NotificationsIOS.addEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));
    }

    async checkPersmissions() {
        const permissions = await NotificationsIOS.checkPermissions();
        NotificationsIOS.addEventListener('remoteNotificationsRegistered', console.log);
        if (!!permissions.badge || !!permissions.sound || !!permissions.alert) {
            return true;
        }

        return false;
    }

    request() {
        NotificationsIOS.requestPermissions();
    }

    onPushRegistered(deviceToken: string) {
        // TODO: Send the token to my server so it could send back push notifications...
        console.log("Device Token Received", deviceToken);
    }

    onPushRegistrationFailed(error: any) {
        // For example:
        //
        // error={
        //   domain: 'NSCocoaErroDomain',
        //   code: 3010,
        //   localizedDescription: 'remote notifications are not supported in the simulator'
        // }
    }

  //  componentWillUnmount() {
        // prevent memory leaks!
      //  NotificationsIOS.removeEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
       // NotificationsIOS.removeEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));
  //  }
}

export default PushNotification.getInstance();
