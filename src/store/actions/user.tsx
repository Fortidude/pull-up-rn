import User from "../../models/User";

export enum UserTypes {
    loadUser = '[USER] LOAD USER',
    loadUserSuccess = '[USER] LOAD USER SUCCESS',
    loadUserFailed = '[USER] LOAD USER FAILED'
}

export const UserActions = {
    loadUser: () => ({
        type: UserTypes.loadUser,
        payload: {}
    }),
    loadUserSuccess: (user: User) => ({
        type: UserTypes.loadUserSuccess,
        payload: { user: user }
    }),
    loadUserFailed: (error: string) => ({
        type: UserTypes.loadUserFailed,
        payload: { error: error }
    }),
};
