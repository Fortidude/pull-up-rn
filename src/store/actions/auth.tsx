export enum AuthTypes {
    checkIfLogged = '[AUTH] CHECK IF LOGGED',
    loginWithToken = '[AUTH] LOGIN WITH TOKEN',
    loginSuccess = '[AUTH] LOGIN SUCCESS',
    loginFailed = '[AUTH] LOGIN FAILED',
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
    logout: () => ({
        type: AuthTypes.logout,
        payload: {}
    })
};
