import { AnyAction } from 'redux';

import { ModalTypes } from '../actions/modal';
import { AuthTypes } from '../actions/auth';
import { PlannerTypes } from '../actions/planner';

export interface ModalState {
    [key: string]: any,
    addSetModalVisible: boolean;
    goalEditModalVisible: boolean;
    goalCreateModalVisible: boolean;
    goalInformationModalVisible: boolean;
    addTrainingSectionModalVisible: boolean

    pickerModalVisible: boolean;
    pickerOptions: {
        options: string[];
        cancelButton: boolean;
        callback: (index: number) => void;
    },
    datetimePickerModalVisible: boolean;
    datetimePickerOptions: {
        date: Date,
        callback: () => void;
    };

    informationModalVisible: boolean;
    informationModalOptions: {
        title: string;
        text: string;
    };

    positionX: number;
    positionY: number;
}

const defaultPickerOptions = {
    options: [],
    cancelButton: true,
    callback: (index: number) => { }
}

const initialState: ModalState = {
    addSetModalVisible: false,
    goalEditModalVisible: false,
    goalCreateModalVisible: false,
    goalInformationModalVisible: false,
    addTrainingSectionModalVisible: false,

    pickerModalVisible: false,
    pickerOptions: defaultPickerOptions,

    datetimePickerModalVisible: false,
    datetimePickerOptions: {
        date: new Date(),
        callback: () => { }
    },

    informationModalVisible: false,
    informationModalOptions: {
        title: '',
        text: ''
    },

    positionX: 0,
    positionY: 0
};

function modal(state = initialState, action: AnyAction): ModalState {
    switch (action.type) {
        case ModalTypes.addSetOpen:
            return Object.assign({}, state, {
                addSetModalVisible: true,
                positionX: action.payload.positionX,
                positionY: action.payload.positionY
            });
        case ModalTypes.addSetClose:
            return Object.assign({}, state, { addSetModalVisible: false, datetimePickerModalVisible: false });

        /**
         * ADD TRAINING SECTION OPEN
         */
        case ModalTypes.addTrainingSectionOpen:
            return Object.assign({}, state, {
                addTrainingSectionModalVisible: true,
                positionX: action.payload.positionX,
                positionY: action.payload.positionY
            });
        case ModalTypes.addTrainingSectionClose:
            return Object.assign({}, state, { addTrainingSectionModalVisible: false });

        /**
         * GOAL EDIT OPEN
         */
        case ModalTypes.goalEditOpen:
            return Object.assign({}, state, {
                goalEditModalVisible: true,
                positionX: action.payload.positionX,
                positionY: action.payload.positionY
            });
        case ModalTypes.goalEditClose:
            return Object.assign({}, state, { goalEditModalVisible: false });

        /**
         * GOAL CREATE OPEN
         */
        case ModalTypes.goalCreateOpen:
            return Object.assign({}, state, {
                goalCreateModalVisible: true,
                positionX: action.payload.positionX,
                positionY: action.payload.positionY
            });
        case ModalTypes.goalCreateClose:
            return Object.assign({}, state, { goalCreateModalVisible: false });

        /**
         * GOAL INFORMATION OPEN
         */
        case ModalTypes.goalInformationOpen:
            return Object.assign({}, state, {
                goalInformationModalVisible: true,
                positionX: action.payload.positionX,
                positionY: action.payload.positionY
            });
        case ModalTypes.goalInformationClose:
            return Object.assign({}, state, { goalInformationModalVisible: false });

        case ModalTypes.pickerOpen:
            return Object.assign({}, state, { pickerModalVisible: true, pickerOptions: { ...action.payload } });
        case ModalTypes.pickerClose:
            return Object.assign({}, state, { pickerModalVisible: false })

        case ModalTypes.datetimePickerOpen:
            return Object.assign({}, state, { datetimePickerModalVisible: true, datetimePickerOptions: { ...action.payload } });
        case ModalTypes.datetimePickerClose:
            return Object.assign({}, state, { datetimePickerModalVisible: false })

        case ModalTypes.informationOpen:
            return Object.assign({}, state, { informationModalVisible: true, informationModalOptions: { ...action.payload } });
        case ModalTypes.informationClose:
            return Object.assign({}, state, { informationModalVisible: false })

        case AuthTypes.logout:
            return Object.assign({}, initialState);
        case PlannerTypes.createSetSuccess:
            return Object.assign({}, state, { addSetModalVisible: false });
        case PlannerTypes.createSectionSuccess:
            return Object.assign({}, state, { addTrainingSectionModalVisible: false });
        default:
            return state;
    }
}

export default modal;
