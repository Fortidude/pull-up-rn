export enum ModalTypes {
    profileOpen = '[MODAL] OPEN PROFILE',
    profileClose = '[MODAL] CLOSE PROFILE'
}

export const ModalActions = {
    profileOpen: () => ({
        type: ModalTypes.profileOpen,
        payload: {}
    }),
    profileClose: () => ({
        type: ModalTypes.profileClose,
        payload: {}
    }),
};
