export enum AppTypes {
    appLoaded = '[APP] APP LOADED',
    isOnline = '[APP] IS ONLINE',
    isOffline = '[APP] IS OFFLINE',
    togglePlannerEdit = '[APP] TOGGLE PLANNER EDIT'
}

export const AppActions = {
    appLoaded: () => ({
        type: AppTypes.appLoaded,
        payload: {}
    }),
    isOnline: () => ({
        type: AppTypes.isOnline,
        payload: {}
    }),
    isOffline: () => ({
        type: AppTypes.isOffline,
        payload: {}
    }),
    togglePlannerEdit: (edit: boolean) => ({
        type: AppTypes.togglePlannerEdit,
        payload: {edit: edit}
    })
};
