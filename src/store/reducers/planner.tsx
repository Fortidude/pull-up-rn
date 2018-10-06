import { AnyAction } from 'redux';

import { PlannerTypes } from 'src/store/actions/planner';
import { AuthTypes } from 'src/store/actions/auth';

import Planner, { PlannerMethods } from 'src/models/Planner';
import Goal from 'src/models/Goal';
import Training from 'src/models/Training';

interface PlannerState {
    loading: boolean;
    loadedByTrainings: boolean;

    byTrainings: Planner;
    byTrainingsEmpty: boolean;

    goalSelected: Goal | null;
    sectionName: string | null;

    createSetLoading: boolean;
    createGoalLoading: boolean;

    error: string | null
}

export const initialState: PlannerState = {
    loading: false,
    loadedByTrainings: false,

    byTrainings: new Planner({}),
    byTrainingsEmpty: true,

    goalSelected: null,
    sectionName: null,

    createSetLoading: false,
    createGoalLoading: false,

    error: null
};

function planner(state = initialState, action: AnyAction): PlannerState {
    switch (action.type) {
        case PlannerTypes.loadByTrainings:
            return Object.assign({}, state, { loading: true });

        case PlannerTypes.loadByTrainingsSuccess:
            return Object.assign({}, state, {
                loading: false,
                loadedByTrainings: true,
                byTrainings: action.payload.planner,
                byTrainingsEmpty: action.payload.planner.trainings.length === 0
            });

        case PlannerTypes.loadByTrainingsFailed:
            return Object.assign({}, state, { loading: false, error: action.payload.error });

        case PlannerTypes.selectGoal:
            return Object.assign({}, state, { goalSelected: action.payload.goal });

        case PlannerTypes.selectSection:
            return Object.assign({}, state, { sectionName: action.payload.sectionName })

        case PlannerTypes.createSetLoading:
            return Object.assign({}, state, { createSetLoading: true })

        case PlannerTypes.createSetSuccess:
            const planner = Object.assign({}, state.byTrainings);
            PlannerMethods.addSetToGoal(action.payload.setCreated, planner);
            return Object.assign({}, state, { byTrainings: planner, createSetLoading: false });

        case PlannerTypes.createSetFailed:
            return Object.assign({}, state, { createSetLoading: false })

        case PlannerTypes.createSectionSuccess: {
            const { name, description } = action.payload;
            const planner = Object.assign({}, state.byTrainings);
            planner.trainings.unshift(new Training(name, []));

            return Object.assign({}, state, { byTrainings: planner, byTrainingsEmpty: false });
        }

        case PlannerTypes.createGoal:
            return Object.assign({}, state, { createGoalLoading: true });

        case PlannerTypes.createGoalSuccess:
            return Object.assign({}, state, { createGoalLoading: false });

        case PlannerTypes.createGoalFailed:
            return Object.assign({}, state, { createGoalLoading: false, error: action.payload.error });

        case PlannerTypes.moveGoalToSection: {
            const { goalId, section } = action.payload;
            const planner = PlannerMethods.moveGoalToSection(goalId, section, state.byTrainings);
            return Object.assign({}, state, { byTrainings: planner});
        }

        case AuthTypes.logout:
            return Object.assign({}, initialState);

        default:
            return state;
    }
}

export default planner;
