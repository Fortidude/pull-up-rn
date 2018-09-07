export enum AppTypes {
    appLoaded = '[APP] APP LOADED',
    isOnline = '[APP] IS ONLINE',
    isOffline = '[APP] IS OFFLINE'
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
    })
};
