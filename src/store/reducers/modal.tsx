import { AnyAction } from 'redux';

import { ModalTypes } from '../actions/modal';
import { AuthTypes } from '../actions/auth';
import { PlannerTypes } from '../actions/planner';

export interface ModalState {
    [key: string]: any,
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
            return Object.assign({}, state, { profileModalVisible: true });
        case ModalTypes.profileClose:
            return Object.assign({}, state, { profileModalVisible: false });
        case ModalTypes.addSetOpen:
            return Object.assign({}, state, { addSetModalVisible: true });
        case ModalTypes.addSetClose:
            return Object.assign({}, state, { addSetModalVisible: false });
        case AuthTypes.logout:
            return Object.assign({}, initialState);
        case PlannerTypes.createSetSuccess:
            return Object.assign({}, state, { addSetModalVisible: false });
        default:
            return state;
    }
}

export default modal;
