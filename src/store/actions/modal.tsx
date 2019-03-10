export enum ModalTypes {
    addSetOpen = '[MODAL] OPEN ADD SET',
    addSetClose = '[MODAL] CLOSE ADD SET',

    addTrainingSectionOpen = '[MODAL] OPEN ADD TRAINING SECTION',
    addTrainingSectionClose = '[MODAL] CLOSE ADD TRAINING SECTION',

    goalCreateOpen = '[MODAL] OPEN CREATE GOAL',
    goalCreateClose = '[MODAL] CLOSE CREATE GOAL',

    goalEditOpen = '[MODAL] OPEN EDIT GOAL',
    goalEditClose = '[MODAL] CLOSE EDIT GOAL',

    goalInformationOpen = '[MODAL] OPEN INFORMATION GOAL',
    goalInformationClose = '[MODAL] CLOSE INFORMATION GOAL',

    pickerOpen = '[MODAL] OPEN PICKER',
    pickerClose = '[MODAL] CLOSE PICKER',

    datetimePickerOpen = '[MODAL] OPEN DATETIME PICKER',
    datetimePickerClose = '[MODAL] CLOSE DATETIME PICKER',

    informationOpen = '[MODAL] OPEN INFORMATION',
    informationClose = '[MODAL] CLOSE INFORMATION',
}

export const ModalActions = {
    addSetOpen: (positionX: number, positionY: number) => ({
        type: ModalTypes.addSetOpen,
        payload: { positionX, positionY }
    }),
    addSetClose: () => ({
        type: ModalTypes.addSetClose,
        payload: {}
    }),

    addTrainingSectionOpen: (positionX: number, positionY: number) => ({
        type: ModalTypes.addTrainingSectionOpen,
        payload: { positionX, positionY }
    }),
    addTrainingSectionClose: () => ({
        type: ModalTypes.addTrainingSectionClose,
        payload: {}
    }),

    goalCreateOpen: (positionX: number, positionY: number) => ({
        type: ModalTypes.goalCreateOpen,
        payload: { positionX, positionY }
    }),
    goalCreateClose: () => ({
        type: ModalTypes.goalCreateClose,
        payload: {}
    }),

    goalEditOpen: (positionX: number, positionY: number) => ({
        type: ModalTypes.goalEditOpen,
        payload: { positionX, positionY }
    }),
    goalEditClose: () => ({
        type: ModalTypes.goalEditClose,
        payload: {}
    }),

    goalInformationOpen: (positionX: number, positionY: number) => ({
        type: ModalTypes.goalInformationOpen,
        payload: { positionX, positionY }
    }),
    goalInformationClose: () => ({
        type: ModalTypes.goalInformationClose,
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
    }),

    informationOpen: (title: string, text: string, big?: boolean) => ({
        type: ModalTypes.informationOpen,
        payload: { title, text, big }
    }),
    informationClose: () => ({
        type: ModalTypes.informationClose,
        payload: {}
    })
};
