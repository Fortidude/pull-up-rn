export enum SettingsTypes {
    setTheme = '[APP] SET THEME',
    setLocale = '[APP] SET LANGUAGE',

    changePlannerFooterCircleComponent = '[APP] CHANGE PLANNER FOOTER CIRCLE COMPONENT'
}

export const SettingsActions = {
    setTheme: (theme: string) => ({
        type: SettingsTypes.setTheme,
        payload: { theme: theme }
    }),
    setLocale: (locale: string) => ({
        type: SettingsTypes.setLocale,
        payload: { locale: locale }
    }),
    changePlannerFooterCircleComponent: (componentName: 'avatar' | 'circuit_left') => ({
        type: SettingsTypes.changePlannerFooterCircleComponent,
        payload: { componentName }
    })
};
