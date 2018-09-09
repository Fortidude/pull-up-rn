import { AnyAction } from 'redux';

import { ModalTypes } from '../actions/modal';

export interface ModalState {
    addSetModalVisible: boolean
    profileModalVisible: boolean
}

const initialState: ModalState = {
    addSetModalVisible: false,
    profileModalVisible: false
};

function modal(state = initialState, action: AnyAction): ModalState {
    switch (action.type) {
        case ModalTypes.profileOpen:
            return { ...state, profileModalVisible: true };
        case ModalTypes.profileClose:
            return { ...state, profileModalVisible: false };
        case ModalTypes.addSetOpen:
            return { ...state, addSetModalVisible: true };
        case ModalTypes.addSetClose:
            return { ...state, addSetModalVisible: false };
        default:
            return state;
    }
}

export default modal;
