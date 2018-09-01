export enum AppTypes {
    appLoaded = '[APP] APP LOADED'
}

export const AppActions = {
    appLoaded: () => ({
        type: AppTypes.appLoaded,
        payload: {}
    }),
};
