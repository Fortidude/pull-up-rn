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
import { SectionInterface } from 'src/models/Section';

interface PlannerState {
    loading: boolean;
    loadedPlanner: boolean;

    byTrainings: Planner;
    byTrainingsEmpty: boolean;
    byTrainingsLoading: boolean;

    planner: Planner;
    plannerEmpty: boolean;
    plannerLoading: boolean;

    sections: SectionInterface[];
    sectionsLoaded: boolean;
    sectionsLoading: boolean;

    setsHistory: { [key: string]: Set[] };
    setsHistoryLoaded: boolean;
    setsHistoryLoading: boolean;

    statistics: StatisticsInterface | null;
    statisticsLoaded: boolean;
    statisticsLoading: boolean;

    goalSelected: Goal | null;
    goalToAddSetSelected: Goal | null;
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
    byTrainingsLoading: false,

    planner: new Planner({}),
    plannerEmpty: true,
    plannerLoading: false,

    sections: [],
    sectionsLoaded: false,
    sectionsLoading: false,

    setsHistory: {},
    setsHistoryLoaded: false,
    setsHistoryLoading: false,

    statistics: null,
    statisticsLoaded: false,
    statisticsLoading: false,

    goalSelected: null,
    goalToAddSetSelected: null,
    sectionName: null,

    createSetLoading: false,
    createGoalLoading: false,

    error: null,
    circuit: null,

    expires_at: moment().hour(23).minute(59).format()
};

function planner(state = initialState, action: AnyAction): PlannerState {
    switch (action.type) {
        case PlannerTypes.loadPlanner:
            return Object.assign({}, state, { loading: true, plannerLoading: true });

        case PlannerTypes.loadPlannerSuccess:
            return Object.assign({}, state, {
                loading: false,
                loadedPlanner: true,
                plannerLoading: false,
                planner: action.payload.planner,
                plannerEmpty: action.payload.planner.trainings.length === 0
            });

        case PlannerTypes.loadPlannerFailed:
            return Object.assign({}, state, { loading: false, plannerLoading: false, error: action.payload.error });

        /**
         * ------------------
         * LOAD SECTIONS
         */
        case PlannerTypes.loadSections:
            return Object.assign({}, state, { loading: true, sectionsLoading: true });

        case PlannerTypes.loadSectionsSuccess:
            return Object.assign({}, state, { loading: false, sectionsLoading: false, sections: action.payload.list });

        case PlannerTypes.loadSectionsFailed:
            return Object.assign({}, state, { loading: false, sectionsLoading: false, error: action.payload.error });

        /**
         * -------------------
         * LOAD SETS HISTORY
         */
        case PlannerTypes.loadSetsByDatePeriod:
            return Object.assign({}, state, { loading: true, setsHistoryLoading: true });

        case PlannerTypes.loadSetsByDatePeriodSuccess:
            const sets = action.payload.sets;

            return Object.assign({}, state, {
                loading: false,
                setsHistoryLoaded: true,
                setsHistory: PlannerMethods.loadSetHistory(sets),
                setsHistoryLoading: false,
            });

        case PlannerTypes.loadSetsByDatePeriodFailed:
            return Object.assign({}, state, { loading: false, setsHistoryLoading: false, error: action.payload.error });

        /**
         * -------------------
         * LOAD STATISTICS
         */
        case PlannerTypes.loadGoalStatistics:
            return Object.assign({}, state, { loading: true, statisticsLoading: true });

        case PlannerTypes.loadGoalStatisticsSuccess:
            return Object.assign({}, state, { loading: false, statistics: action.payload.statistics, statisticsLoaded: true, statisticsLoading: false });

        case PlannerTypes.loadGoalStatisticsFailed:
            return Object.assign({}, state, { loading: false, statisticsLoading: false, error: action.payload.error });

        /**
         * -------------------
         * SELECT
         */
        case PlannerTypes.selectGoal:
            return Object.assign({}, state, { goalSelected: action.payload.goal });

        case PlannerTypes.selectGoalToAddSet:
            return Object.assign({}, state, { goalToAddSetSelected: action.payload.goal });

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
            if (!action.payload.user.current_circuit) {
                return state;
            }

            return Object.assign({}, state, { circuit: new Circuit(action.payload.user.current_circuit) })

        default:
            return state;
    }
}

export default planner;
