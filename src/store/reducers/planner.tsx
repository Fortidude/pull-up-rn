import { AnyAction } from 'redux';

import { PlannerTypes } from '../actions/planner';
import Planner from '../../models/Planner';

interface PlannerState {
    loading: boolean;
    loadedByTrainings: boolean;
    byTrainings: Planner;
    error: string|null
}

const initialState: PlannerState = {
    loading: false,
    loadedByTrainings: false,
    byTrainings: new Planner({}),
    error: null
};

function planner(state = initialState, action: AnyAction): PlannerState {
    switch (action.type) {
        case PlannerTypes.loadByTrainings:
            return { ...state, loading: true };
        case PlannerTypes.loadByTrainingsSuccess:
            return { ...state, loading: false, loadedByTrainings: true, byTrainings: action.payload.planner }
        case PlannerTypes.loadByTrainingsFailed:
            return { ...state, loading: false, error: action.payload.error }
        default:
            return state;
    }
}

export default planner;
