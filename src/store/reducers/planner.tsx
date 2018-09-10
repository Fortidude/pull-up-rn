import { AnyAction } from 'redux';

import { PlannerTypes } from '../actions/planner';
import Planner, { addSetToGoal } from '../../models/Planner';
import Goal from '../../models/Goal';

interface PlannerState {
    loading: boolean;
    loadedByTrainings: boolean;
    byTrainings: Planner;
    goalSelected: Goal | null;
    error: string | null
}

const initialState: PlannerState = {
    loading: false,
    loadedByTrainings: false,
    byTrainings: new Planner({}),
    goalSelected: null,
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
        case PlannerTypes.selectGoal:
            return { ...state, goalSelected: action.payload.goal }
        case PlannerTypes.createSetSuccess:
            const planner = state.byTrainings;
            addSetToGoal(action.payload.setCreated, planner);
            return { ...state, byTrainings: planner }
        default:
            return state;
    }
}

export default planner;
