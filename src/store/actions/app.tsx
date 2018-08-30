export enum AppTypes {
    setTheme = '[APP] SET THEME',
    setLocale = '[APP] SET LANGUAGE'
}

export const AppActions = {
    setTheme: (theme: string) => ({
        type: AppTypes.setTheme,
        payload: {theme: theme}
    }),
    setLocale: (locale: string) => ({
        type: AppTypes.setLocale,
        payload: {locale: locale}
    })
};
