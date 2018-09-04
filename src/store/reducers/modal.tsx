import { AnyAction } from 'redux';

import { ModalTypes } from '../actions/modal';

export interface ModalState {
    profileModalVisible: boolean
}

const initialState: ModalState = {
    profileModalVisible: false
};

function modal(state = initialState, action: AnyAction): ModalState {
    switch (action.type) {
        case ModalTypes.profileOpen:
            return { ...state, profileModalVisible: true };
        case ModalTypes.profileClose:
            return { ...state, profileModalVisible: false };
        default:
            return state;
    }
}

export default modal;
