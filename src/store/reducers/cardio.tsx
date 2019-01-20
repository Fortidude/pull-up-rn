import { AnyAction } from 'redux';
import { CardioTypes } from '../actions/cardio';

interface CardioState {
    keepAwake: boolean;
}

export const initialState: CardioState = {
    keepAwake: false,
};

function app(state = initialState, action: AnyAction): CardioState {
    switch (action.type) {
        case CardioTypes.keepAwake:
            return { ...state, keepAwake: action.payload.keepAwake };
        default:
            return state;
    }
}

export default app;
