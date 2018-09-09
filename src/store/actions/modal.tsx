export enum ModalTypes {
    profileOpen = '[MODAL] OPEN PROFILE',
    profileClose = '[MODAL] CLOSE PROFILE',

    addSetOpen = '[MODAL] OPEN ADD SET',
    addSetClose = '[MODAL] CLOSE ADD SET'
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

    addSetOpen: () => ({
        type: ModalTypes.addSetOpen,
        payload: {}
    }),
    addSetClose: () => ({
        type: ModalTypes.addSetClose,
        payload: {}
    })
};
