export enum ModalTypes {
    addSetOpen = '[MODAL] OPEN ADD SET',
    addSetClose = '[MODAL] CLOSE ADD SET',

    addTrainingSectionOpen = '[MODAL] OPEN ADD TRAINING SECTION',
    addTrainingSectionClose = '[MODAL] CLOSE ADD TRAINING SECTION',

    goalCreateOpen = '[MODAL] OPEN CREATE GOAL',
    goalCreateClose = '[MODAL] CLOSE CREATE GOAL',

    pickerOpen = '[MODAL] OPEN PICKER',
    pickerClose = '[MODAL] CLOSE PICKER',

    datetimePickerOpen = '[MODAL] OPEN DATETIME PICKER',
    datetimePickerClose = '[MODAL] CLOSE DATETIME PICKER'
}

export const ModalActions = {
    addSetOpen: () => ({
        type: ModalTypes.addSetOpen,
        payload: {}
    }),
    addSetClose: () => ({
        type: ModalTypes.addSetClose,
        payload: {}
    }),

    addTrainingSectionOpen: () => ({
        type: ModalTypes.addTrainingSectionOpen,
        payload: {}
    }),
    addTrainingSectionClose: () => ({
        type: ModalTypes.addTrainingSectionClose,
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

    pickerOpen: (options: string[], cancelButton: boolean = true, callback = (index: number) => { }) => ({
        type: ModalTypes.pickerOpen,
        payload: { options, cancelButton, callback }
    }),
    pickerClose: () => ({
        type: ModalTypes.pickerClose,
        payload: {}
    }),

    datetimePickerOpen: (date: Date, callback: (date: Date) => void) => ({
        type: ModalTypes.datetimePickerOpen,
        payload: { date, callback }
    }),
    datetimePickerClose: () => ({
        type: ModalTypes.datetimePickerClose,
        payload: {}
    })
};
