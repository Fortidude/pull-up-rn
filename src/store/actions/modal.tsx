export enum ModalTypes {
    profileOpen = '[MODAL] OPEN PROFILE',
    profileClose = '[MODAL] CLOSE PROFILE',

    addSetOpen = '[MODAL] OPEN ADD SET',
    addSetClose = '[MODAL] CLOSE ADD SET',

    goalCreateOpen = '[MODAL] OPEN CREATE GOAL',
    goalCreateClose = '[MODAL] CLOSE CREATE GOAL',

    pickerOpen = '[MODAL] OPEN PICKER',
    pickerClose = '[MODAL] CLOSE PICKER'
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
    }),

    goalCreateOpen: () => ({
        type: ModalTypes.goalCreateOpen,
        payload: {}
    }),
    goalCreateClose: () => ({
        type: ModalTypes.goalCreateClose,
        payload: {}
    }),
    
    pickerOpen: (options: string[], cancelButton: boolean = true, callback = (index: number) => {}) => ({
        type: ModalTypes.pickerOpen,
        payload: {options, cancelButton, callback}
    }),
    pickerClose: () => ({
        type: ModalTypes.pickerClose,
        payload: {}
    })
};
