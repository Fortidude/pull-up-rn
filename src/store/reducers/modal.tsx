import { AnyAction } from 'redux';

import { ModalTypes } from '../actions/modal';
import { AuthTypes } from '../actions/auth';
import { PlannerTypes } from '../actions/planner';

export interface ModalState {
    [key: string]: any,
    addSetModalVisible: boolean;
    goalCreateModalVisible: boolean;
    addTrainingSectionModalVisible: boolean

    pickerModalVisible: boolean;
    pickerOptions: {
        options: string[];
        cancelButton: boolean;
        callback: (index: number) => void;
    }
}

const defaultPickerOptions = {
    options: [],
    cancelButton: true,
    callback: (index: number) => { }
}

const initialState: ModalState = {
    addSetModalVisible: false,
    goalCreateModalVisible: false,
    addTrainingSectionModalVisible: false,

    pickerModalVisible: false,
    pickerOptions: defaultPickerOptions
};

function modal(state = initialState, action: AnyAction): ModalState {
    switch (action.type) {
        case ModalTypes.addSetOpen:
            return Object.assign({}, state, { addSetModalVisible: true });
        case ModalTypes.addSetClose:
            return Object.assign({}, state, { addSetModalVisible: false });

        case ModalTypes.addTrainingSectionOpen:
            return Object.assign({}, state, { addTrainingSectionModalVisible: true });
        case ModalTypes.addTrainingSectionClose:
            return Object.assign({}, state, { addTrainingSectionModalVisible: false });

        case ModalTypes.goalCreateOpen:
            return Object.assign({}, state, { goalCreateModalVisible: true });
        case ModalTypes.goalCreateClose:
            return Object.assign({}, state, { goalCreateModalVisible: false });

        case ModalTypes.pickerOpen:
            return Object.assign({}, state, { pickerModalVisible: true, pickerOptions: { ...action.payload } });
        case ModalTypes.pickerClose:
            return Object.assign({}, state, { pickerModalVisible: false })

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
