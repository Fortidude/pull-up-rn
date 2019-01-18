import User from "../../models/User";

export enum UserTypes {
    loadUser = '[USER] LOAD USER',
    loadUserSuccess = '[USER] LOAD USER SUCCESS',
    loadUserFailed = '[USER] LOAD USER FAILED',

    togglePlannerCustomMode = '[USER] TOGGLE PLANNER CUSTOM MODE',
    togglePlannerCustomModeSuccess = '[USER] TOGGLE PLANNER CUSTOM MODE SUCCESS',
    togglePlannerCustomModeFailed = '[USER] TOGGLE PLANNER CUSTOM MODE FAILED',

    endOnBoarding = '[USER] END ONBOARDINIG',
    manuallyGoToOnboarding = '[USER] MANUALLY GO TO ONBOARDING'
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

    togglePlannerCustomMode: () => ({
        type: UserTypes.togglePlannerCustomMode,
        payload: {}
    }),
    togglePlannerCustomModeSuccess: () => ({
        type: UserTypes.togglePlannerCustomModeSuccess,
        payload: {}
    }),
    togglePlannerCustomModeFailed: () => ({
        type: UserTypes.togglePlannerCustomModeFailed,
        payload: {}
    }),
    endOnBoarding: () => ({
        type: UserTypes.endOnBoarding,
        payload: {}
    }),
    manuallyGoToOnboarding: () => ({
        type: UserTypes.manuallyGoToOnboarding,
        payload: {}
    })
};
