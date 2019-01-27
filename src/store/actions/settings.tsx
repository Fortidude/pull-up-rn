export enum SettingsTypes {
    setTheme = '[APP] SET THEME',
    setLocale = '[APP] SET LANGUAGE',

    changePlannerFooterCircleComponent = '[APP] CHANGE PLANNER FOOTER CIRCLE COMPONENT',
    storeAppVersion = '[APP] STORE APP VERSION'
}

export type PlannerFooterCircleComponent = 'avatar' | 'circuit_left' | 'circuit_progress';

export const SettingsActions = {
    setTheme: (theme: string) => ({
        type: SettingsTypes.setTheme,
        payload: { theme: theme }
    }),
    setLocale: (locale: string) => ({
        type: SettingsTypes.setLocale,
        payload: { locale: locale }
    }),
    changePlannerFooterCircleComponent: (componentName: PlannerFooterCircleComponent) => ({
        type: SettingsTypes.changePlannerFooterCircleComponent,
        payload: { componentName }
    }),
    storeAppVersion: (appVersion: string, buildVersion: string) => ({
        type: SettingsTypes.storeAppVersion,
        payload: { appVersion, buildVersion }
    }),
};
