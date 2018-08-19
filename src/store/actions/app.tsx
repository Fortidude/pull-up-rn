export enum AppTypes {
    setTheme = '[APP] SET THEME',
}

export const AppActions = {
    setTheme: (theme: string) => ({
        type: AppTypes.setTheme,
        payload: {theme: theme}
    }),
};
