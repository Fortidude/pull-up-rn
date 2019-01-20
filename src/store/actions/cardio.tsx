export enum CardioTypes {
    keepAwake = '[CARDIO] KEEP AWAKE'
}

export const CardioActions = {
    keepAwake: (keepAwake: boolean) => ({
        type: CardioTypes.keepAwake,
        payload: { keepAwake }
    }),
};
