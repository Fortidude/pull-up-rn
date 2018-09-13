import { AnyAction } from 'redux';

import { PlannerTypes } from '../actions/planner';
import Planner, { PlannerMethods } from '../../models/Planner';
import Goal from '../../models/Goal';

interface PlannerState {
    loading: boolean;
    loadedByTrainings: boolean;
    byTrainings: Planner;
    goalSelected: Goal | null;
    error: string | null
}

export const initialState: PlannerState = {
    loading: false,
    loadedByTrainings: false,
    byTrainings: new Planner({}),
    goalSelected: null,
    error: null
};

function planner(state = initialState, action: AnyAction): PlannerState {
    switch (action.type) {
        case PlannerTypes.loadByTrainings:
            return Object.assign({}, state, { loading: true });
        case PlannerTypes.loadByTrainingsSuccess:
            return Object.assign({}, state, { loading: false, loadedByTrainings: true, byTrainings: action.payload.planner });
        case PlannerTypes.loadByTrainingsFailed:
            return Object.assign({}, state, { loading: false, error: action.payload.error });
        case PlannerTypes.selectGoal:
            return Object.assign({}, state, { goalSelected: action.payload.goal });
        case PlannerTypes.createSetSuccess:
            const planner = Object.assign({}, state.byTrainings);
            PlannerMethods.addSetToGoal(action.payload.setCreated, planner);
            return Object.assign({}, state, { byTrainings: planner });
        default:
            return state;
    }
}

export default planner;
