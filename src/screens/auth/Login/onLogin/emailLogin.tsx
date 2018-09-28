import { Alert, AsyncStorage } from "react-native";

import { User } from "../../../../api";
import I18n from '../../../../assets/translations';
import { Dispatch } from "redux";

class EmailLogin {
    private static instance: EmailLogin;
    private wrongPasswordCounter = 0;

    private constructor() { }
    static getInstance() {
        if (!EmailLogin.instance) {
            EmailLogin.instance = new EmailLogin();
        }
        return EmailLogin.instance;
    }

    public login = async (
        username: string,
        password: string,
        goToPasswordReminderPage: Function,
        successCallback?: Function,
        failedCallback?: Function,
    ): Promise<void> => {
        try {
            const token = await User.login(username, password);
            if (token) {
                successCallback ? successCallback(token) : null;
            }
        } catch (error) {
            failedCallback ? failedCallback(error) : null;
            if (this.wrongPasswordCounter >= 2) {
                Alert.alert(
                    I18n.t("errors.failed"),
                    I18n.t(`login.password_multiple_wrong`),
                    [
                        { text: I18n.t('login.remind_password'), onPress: () => goToPasswordReminderPage() },
                        { text: I18n.t('buttons.cancel'), onPress: () => { } }
                    ],
                    { cancelable: false }
                );
            } else {
                this.wrongPasswordCounter++;
                Alert.alert(I18n.t("errors.failed"), I18n.t(`errors.${error.toString().replace('Error: ', '')}`),
                    [{ text: I18n.t('login.login_alert_ok_button'), onPress: () => { } }],
                    { cancelable: false }
                );

            }
        }
    }
}

export default EmailLogin.getInstance();
