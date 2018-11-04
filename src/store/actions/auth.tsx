import PasswordReminder from "src/screens/auth/PasswordReminder";

export enum AuthTypes {
    checkIfLogged = '[AUTH] CHECK IF LOGGED',
    loginWithToken = '[AUTH] LOGIN WITH TOKEN',
    loginSuccess = '[AUTH] LOGIN SUCCESS',
    loginFailed = '[AUTH] LOGIN FAILED',

    register = '[AUTH] REGISTER',
    registerSuccess = '[AUTH] REGISTER SUCCESS',
    registerFailed = '[AUTH] REGISTER FAILED',

    passwordRemind = '[AUTH] PASSWORD REMIND',
    passwordRemindSuccess = '[AUTH] PASSWORD REMIND SUCCESS',
    passwordRemindFailed = '[AUTH] PASSWORD REMIND FAILED',

    changePassword = '[AUTH] CHANGE PASSWORD',
    changePasswordSuccess = '[AUTH] CHANGE PASSWORD SUCCESS',
    changePasswordFailed = '[AUTH] CHANGE PASSWORD FAILED',

    logout = '[AUTH] LOGOUT',
}

export const AuthActions = {
    checkIfLogged: () => ({
        type: AuthTypes.checkIfLogged,
        payload: {}
    }),
    loginWithToken: (token: string) => ({
        type: AuthTypes.loginWithToken,
        payload: { token: token }
    }),
    loginSuccess: () => ({
        type: AuthTypes.loginSuccess,
        payload: {}
    }),
    loginFailed: (error: string) => ({
        type: AuthTypes.loginFailed,
        payload: { error: error }
    }),

    register: (email: string, username: string, password: string) => ({
        type: AuthTypes.register,
        payload: { email, username, password }
    }),
    registerSuccess: () => ({
        type: AuthTypes.registerSuccess,
        payload: {}
    }),
    registerFailed: (error: string) => ({
        type: AuthTypes.registerFailed,
        payload: { error: error }
    }),

    /**
     * PASSWORD REMIND
     */
    passwordRemind: (email: string) => ({
        type: AuthTypes.passwordRemind,
        payload: { email }
    }),
    passwordRemindSuccess: () => ({
        type: AuthTypes.passwordRemindSuccess,
        payload: {}
    }),
    passwordRemindFailed: (error: string) => ({
        type: AuthTypes.passwordRemindFailed,
        payload: { error }
    }),

    /**
     * CHANGE PASSWORD
     */
    changePassword: (email: string, token: string, password: string) => ({
        type: AuthTypes.changePassword,
        payload: { email, token, password }
    }),

    changePasswordSuccess: () => ({
        type: AuthTypes.changePasswordSuccess,
        payload: {}
    }),

    changePasswordFailed: (error: string) => ({
        type: AuthTypes.changePasswordFailed,
        payload: { error }
    }),

    logout: () => ({
        type: AuthTypes.logout,
        payload: {}
    })
};
