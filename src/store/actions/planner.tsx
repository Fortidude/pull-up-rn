import Planner from "../../models/Planner";
import Goal, { NewGoalApiRequestDataStructureInterface, UpdatedGoalApiRequestStructureInterface } from "../../models/Goal";
import Set, { SetInterface } from "../../models/Set";
import moment from 'moment';
import { SectionInterface } from "src/models/Section";

export enum PlannerTypes {
    assignTrainingPlan = '[PLANNER] ASSIGN TRAINING PLAN',
    assignTrainingPlanSuccess = '[PLANNER] ASSIGN TRAINING PLAN SUCCESS',
    assignTrainingPlanFailed = '[PLANNER] ASSIGN TRAINING PLAN FAILED',

    loadPlanner = '[PLANNER] LOAD PLANNER',
    loadPlannerSuccess = '[PLANNER] LOAD PLANNER SUCCESS',
    loadPlannerFailed = '[PLANNER] LOAD PLANNER FAILED',

    loadSetsByDatePeriod = '[PLANNER] LOAD SETS BY DATE PERIOD',
    loadSetsByDatePeriodSuccess = '[PLANNER] LOAD SETS BY DATE PERIOD SUCCESS',
    loadSetsByDatePeriodFailed = '[PLANNER] LOAD SETS BY DATE PERIOD FAILED',

    loadGoalStatistics = '[PLANNER] LOAD GET STATISTICS',
    loadGoalStatisticsSuccess = '[PLANNER] LOAD GET STATISTICS SUCCESS',
    loadGoalStatisticsFailed = '[PLANNER] LOAD GET STATISTICS FAILED',
    loadGoalStatisticsUseCached = '[PLANNER] LOAD GET STATISTICS USE CACHE',

    selectGoal = '[PLANNER] SELECT GOAL',
    selectSection = '[PLANNER] SELECT SECTION',
    selectGoalToAddSet = '[PLANNER] SELECT GOAL TO ADD SET',

    createSet = '[PLANNER] CREATE SET',
    createSetLoading = '[PLANNER] CREATE SET LOADING',
    createSetSuccess = '[PLANNER] CREATE SET SUCCESS',
    createSetFailed = '[PLANNER] CREATE SET FAILED',

    createSection = '[PLANNER] CREATE SECTION',
    createSectionSuccess = '[PLANNER] CREATE SECTION SUCCESS',
    createSectionFailed = '[PLANNER] CREATE SECTION FAILED',

    createGoal = '[PLANNER] CREATE GOAL',
    createGoalSuccess = '[PLANNER] CREATE GOAL SUCCESS',
    createGoalFailed = '[PLANNER] CREATE GOAL FAILED',

    updateGoal = '[PLANNER] UPDATE GOAL',
    updateGoalSuccess = '[PLANNER] UPDATE GOAL SUCCESS',
    updateGoalFailed = '[PLANNER] UPDATE GOAL FAILED',

    moveGoalToSection = '[PLANNER] MOVE GOAL TO SECTION',
    toggleFinishedGoals = '[PLANNER] TOGGLE FINISHED GOALS',
    removeGoal = '[PLANNER] REMOVE GOAL',

    loadSections = '[PLANNER] LOAD SECTIONS',
    loadSectionsSuccess = '[PLANNER] LOAD SECTIONS SUCCESS',
    loadSectionsFailed = '[PLANNER] LOAD SECTIONS FAILED'
}

export const PlannerActions = {
    assignTrainingPlan: (type: string) => ({
        type: PlannerTypes.assignTrainingPlan,
        payload: { type }
    }),
    assignTrainingPlanSuccess: () => ({
        type: PlannerTypes.assignTrainingPlanSuccess,
        payload: {}
    }),
    assignTrainingPlanFailed: (error: string) => ({
        type: PlannerTypes.assignTrainingPlanFailed,
        payload: { error }
    }),

    loadPlanner: () => ({
        type: PlannerTypes.loadPlanner,
        payload: {}
    }),
    loadPlannerSuccess: (planner: Planner) => ({
        type: PlannerTypes.loadPlannerSuccess,
        payload: { planner }
    }),
    loadPlannerFailed: (error: string) => ({
        type: PlannerTypes.loadPlannerFailed,
        payload: { error }
    }),

    loadSetsByDatePeriod: (fromDate: moment.Moment, toDate: moment.Moment) => ({
        type: PlannerTypes.loadSetsByDatePeriod,
        payload: { fromDate, toDate }
    }),
    loadSetsByDatePeriodSuccess: (sets: Set[]) => ({
        type: PlannerTypes.loadSetsByDatePeriodSuccess,
        payload: { sets }
    }),
    loadSetsByDatePeriodFailed: (error: string) => ({
        type: PlannerTypes.loadSetsByDatePeriodFailed,
        payload: { error }
    }),

    loadGoalStatistics: (forceReload: boolean = false) => ({
        type: PlannerTypes.loadGoalStatistics,
        payload: { forceReload }
    }),
    loadGoalStatisticsSuccess: (statistics: any) => ({
        type: PlannerTypes.loadGoalStatisticsSuccess,
        payload: { statistics }
    }),
    loadGoalStatisticsFailed: (error: string) => ({
        type: PlannerTypes.loadGoalStatisticsFailed,
        payload: { error }
    }),
    loadGoalStatisticsUseCached: () => ({
        type: PlannerTypes.loadGoalStatisticsUseCached,
        payload: {}
    }),

    selectGoal: (goal: Goal | null) => ({
        type: PlannerTypes.selectGoal,
        payload: { goal }
    }),
    selectSection: (sectionName: string | null) => ({
        type: PlannerTypes.selectSection,
        payload: { sectionName }
    }),
    selectGoalToAddSet: (goal: Goal | null) => ({
        type: PlannerTypes.selectGoalToAddSet,
        payload: { goal }
    }),

    createSet: (goal: Goal, value: number, extraWeight: number | null, difficultyLevel: number, date?: moment.Moment) => ({
        type: PlannerTypes.createSet,
        payload: { goal, value, extraWeight, difficultyLevel, date }
    }),
    createSetLoading: () => ({
        type: PlannerTypes.createSetLoading,
        payload: {}
    }),
    createSetSuccess: (setCreated: SetInterface) => ({
        type: PlannerTypes.createSetSuccess,
        payload: { setCreated }
    }),
    createSetFailed: (error: string) => ({
        type: PlannerTypes.createSetFailed,
        payload: { error }
    }),

    createSection: (name: string, description: string = '') => ({
        type: PlannerTypes.createSection,
        payload: { name, description }
    }),
    createSectionSucces: (name: string, description: string) => ({
        type: PlannerTypes.createSectionSuccess,
        payload: { name, description }
    }),
    createSectionFailed: (error: string) => ({
        type: PlannerTypes.createSectionSuccess,
        payload: { error }
    }),

    createGoal: (data: NewGoalApiRequestDataStructureInterface) => ({
        type: PlannerTypes.createGoal,
        payload: { data }
    }),
    createGoalSuccess: () => ({
        type: PlannerTypes.createGoalSuccess,
        payload: {}
    }),
    createGoalFailed: (error: string) => ({
        type: PlannerTypes.createGoalFailed,
        payload: { error }
    }),

    updateGoal: (id: string, data: UpdatedGoalApiRequestStructureInterface) => ({
        type: PlannerTypes.updateGoal,
        payload: { id, data }
    }),
    updateGoalSuccess: () => ({
        type: PlannerTypes.updateGoalSuccess,
        payload: {}
    }),
    updateGoalFailed: (error: string) => ({
        type: PlannerTypes.updateGoalFailed,
        payload: { error }
    }),

    moveGoalToSection: (goalId: string, section: string, withRequest: boolean = true) => ({
        type: PlannerTypes.moveGoalToSection,
        payload: { goalId, section, withRequest }
    }),
    removeGoal: (goalId: string) => ({
        type: PlannerTypes.removeGoal,
        payload: { goalId }
    }),
    toggleFinishedGoals: () => ({
        type: PlannerTypes.toggleFinishedGoals,
        payload: {}
    }),

    loadSections: () => ({
        type: PlannerTypes.loadSections,
        payload: {}
    }),
    loadSectionsSuccess: (list: SectionInterface[]) => ({
        type: PlannerTypes.loadSectionsSuccess,
        payload: { list }
    }),
    loadSectionsFailed: (error: string) => ({
        type: PlannerTypes.loadSectionsFailed,
        payload: { error }
    }),
};
