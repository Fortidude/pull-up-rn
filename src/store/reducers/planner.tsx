import { AnyAction } from 'redux';
import moment from 'moment';

import { PlannerTypes } from 'src/store/actions/planner';
import { AuthTypes } from 'src/store/actions/auth';

import Planner, { PlannerMethods } from 'src/models/Planner';
import Goal from 'src/models/Goal';
import Training from 'src/models/Training';
import Set from 'src/models/Set';
import { StatisticsInterface } from 'src/models/Statistics';
import { UserTypes } from '../actions/user';
import Circuit from 'src/models/Circuit';

interface PlannerState {
    loading: boolean;
    loadedPlanner: boolean;

    byTrainings: Planner;
    byTrainingsEmpty: boolean;

    planner: Planner;
    plannerEmpty: boolean;

    setsHistory: { [key: string]: Set[] };
    setsHistoryLoaded: boolean;

    statistics: StatisticsInterface | null;
    statisticsLoaded: boolean;

    goalSelected: Goal | null;
    sectionName: string | null;

    createSetLoading: boolean;
    createGoalLoading: boolean;

    error: string | null;
    circuit: Circuit | null;

    expires_at: string;
}

export const initialState: PlannerState = {
    loading: false,
    loadedPlanner: false,

    byTrainings: new Planner({}),
    byTrainingsEmpty: true,

    planner: new Planner({}),
    plannerEmpty: true,

    setsHistory: {},
    setsHistoryLoaded: false,

    statistics: null,
    statisticsLoaded: false,

    goalSelected: null,
    sectionName: null,

    createSetLoading: false,
    createGoalLoading: false,

    error: null,
    circuit: null,

    expires_at: moment().hour(23).minute(59).format()
};

function planner(state = initialState, action: AnyAction): PlannerState {
    switch (action.type) {
        case PlannerTypes.loadByTrainings:
            return Object.assign({}, state, { loading: true });

        case PlannerTypes.loadByTrainingsSuccess:
            return Object.assign({}, state, {
                loading: false,
                loadedPlanner: true,
                planner: action.payload.planner,
                plannerEmpty: action.payload.planner.trainings.length === 0
            });

        case PlannerTypes.loadByTrainingsFailed:
            return Object.assign({}, state, { loading: false, error: action.payload.error });


        case PlannerTypes.loadPlanner:
            return Object.assign({}, state, { loading: true });

        case PlannerTypes.loadPlannerSuccess:
            return Object.assign({}, state, {
                loading: false,
                loadedPlanner: true,
                planner: action.payload.planner,
                plannerEmpty: action.payload.planner.trainings.length === 0
            });

        case PlannerTypes.loadPlannerFailed:
            return Object.assign({}, state, { loading: false, error: action.payload.error });


        /**
         * -------------------
         * LOAD SETS HISTORY
         */
        case PlannerTypes.loadSetsByDatePeriod:
            return Object.assign({}, state, { loading: true });

        case PlannerTypes.loadSetsByDatePeriodSuccess:
            const sets = action.payload.sets;
            const collection = Object.assign({}, state.setsHistory);

            return Object.assign({}, state, {
                loading: false,
                setsHistoryLoaded: true,
                setsHistory: PlannerMethods.loadSetHistory(sets, collection)
            });

        case PlannerTypes.loadSetsByDatePeriodFailed:
            return Object.assign({}, state, { loading: false, error: action.payload.error });

        /**
         * -------------------
         * LOAD STATISTICS
         */
        case PlannerTypes.loadGoalStatistics:
            return Object.assign({}, state, { loading: true });

        case PlannerTypes.loadGoalStatisticsSuccess:
            return Object.assign({}, state, { loading: false, statistics: action.payload.statistics, statisticsLoaded: true });

        case PlannerTypes.loadGoalStatisticsFailed:
            return Object.assign({}, state, { loading: false, error: action.payload.error });

        /**
         * -------------------
         * SELECT
         */
        case PlannerTypes.selectGoal:
            return Object.assign({}, state, { goalSelected: action.payload.goal });

        case PlannerTypes.selectSection:
            return Object.assign({}, state, { sectionName: action.payload.sectionName })


        /**
         * -------------------
         * CREATE SET
         */
        case PlannerTypes.createSetLoading:
            return Object.assign({}, state, { createSetLoading: true })

        case PlannerTypes.createSetSuccess:
            if (!state.circuit) {
                return Object.assign({}, state);
            }

            const planner = Object.assign({}, state.planner);
            PlannerMethods.addSetToGoal(action.payload.setCreated, planner, state.circuit);
            return Object.assign({}, state, { planner: planner, createSetLoading: false, setsHistoryLoaded: false, statisticsLoaded: false });

        case PlannerTypes.createSetFailed:
            return Object.assign({}, state, { createSetLoading: false })


        /**
         * -------------------
         * CREATE SECTION
         */
        case PlannerTypes.createSectionSuccess: {
            const { name, description } = action.payload;
            const planner = Object.assign({}, state.planner);
            planner.trainings.unshift(new Training(name, []));

            return Object.assign({}, state, { planner: planner, plannerEmpty: false });
        }


        /**
         * -------------------
         * CREATE GOAL
         */
        case PlannerTypes.createGoal:
            return Object.assign({}, state, { createGoalLoading: true });

        case PlannerTypes.createGoalSuccess:
            return Object.assign({}, state, { createGoalLoading: false, statisticsLoaded: false });

        case PlannerTypes.createGoalFailed:
            return Object.assign({}, state, { createGoalLoading: false, error: action.payload.error });


        /**
         * -------------------
         * MOVE GOAL
         */
        case PlannerTypes.moveGoalToSection: {
            const { goalId, section } = action.payload;
            const planner = PlannerMethods.moveGoalToSection(goalId, section, state.planner);
            return Object.assign({}, state, { planner: planner });
        }


        /**
         * -------------------
         * REMOVE GOAL
         */
        case PlannerTypes.removeGoal: {
            const { goalId } = action.payload;
            const planner = PlannerMethods.removeGoal(goalId, state.planner);
            return Object.assign({}, state, { planner: planner });
        }


        /**
         * -------------------
         * LOGOUT
         */
        case AuthTypes.logout:
            return Object.assign({}, initialState);

        case UserTypes.loadUserSuccess:
            return Object.assign({}, state, { circuit: new Circuit(action.payload.user.current_circuit) })

        default:
            return state;
    }
}

export default planner;
