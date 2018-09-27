import { AnyAction } from 'redux';

import { ModalTypes } from '../actions/modal';
import { AuthTypes } from '../actions/auth';
import { PlannerTypes } from '../actions/planner';

export interface ModalState {
    [key: string]: any,
    addSetModalVisible: boolean;
    goalCreateModalVisible: boolean;
    profileModalVisible: boolean;

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
    profileModalVisible: false,

    pickerModalVisible: false,
    pickerOptions: defaultPickerOptions
};

function modal(state = initialState, action: AnyAction): ModalState {
    switch (action.type) {
        case ModalTypes.profileOpen:
            return Object.assign({}, state, { profileModalVisible: true });
        case ModalTypes.profileClose:
            return Object.assign({}, state, { profileModalVisible: false });

        case ModalTypes.addSetOpen:
            return Object.assign({}, state, { addSetModalVisible: true });
        case ModalTypes.addSetClose:
            return Object.assign({}, state, { addSetModalVisible: false });

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
        default:
            return state;
    }
}

export default modal;
