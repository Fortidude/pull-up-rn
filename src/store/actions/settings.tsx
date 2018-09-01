export enum SettingsTypes {
    setTheme = '[APP] SET THEME',
    setLocale = '[APP] SET LANGUAGE'
}

export const SettingsActions = {
    setTheme: (theme: string) => ({
        type: SettingsTypes.setTheme,
        payload: {theme: theme}
    }),
    setLocale: (locale: string) => ({
        type: SettingsTypes.setLocale,
        payload: {locale: locale}
    })
};
