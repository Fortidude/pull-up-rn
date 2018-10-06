import Planner from "../../models/Planner";
import Goal, { NewGoalApiRequestDataStructureInterface } from "../../models/Goal";
import { SetInterface } from "../../models/Set";

export enum PlannerTypes {
    loadByTrainings = '[PLANNER] LOAD BY TRAININGS',
    loadByTrainingsSuccess = '[PLANNER] LOAD BY TRAININGS SUCCESS',
    loadByTrainingsFailed = '[PLANNER] LOAD BY TRAININGS FAILED',

    selectGoal = '[PLANNER] SELECT GOAL',
    selectSection = '[PLANNER] SELECT SECTION',

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

    moveGoalToSection = '[PLANNER] MOVE GOAL TO SECTION',
    removeGoal = '[PLANNER] REMOVE GOAL'
}

export const PlannerActions = {
    loadByTrainings: () => ({
        type: PlannerTypes.loadByTrainings,
        payload: {}
    }),
    loadByTrainingsSuccess: (planner: Planner) => ({
        type: PlannerTypes.loadByTrainingsSuccess,
        payload: { planner }
    }),
    loadByTrainingsFailed: (error: string) => ({
        type: PlannerTypes.loadByTrainingsFailed,
        payload: { error }
    }),

    selectGoal: (goal: Goal | null) => ({
        type: PlannerTypes.selectGoal,
        payload: { goal }
    }),
    selectSection: (sectionName: string | null) => ({
        type: PlannerTypes.selectSection,
        payload: { sectionName }
    }),

    createSet: (goal: Goal, value: number, extraWeight: number | null) => ({
        type: PlannerTypes.createSet,
        payload: { goal, value, extraWeight }
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

    moveGoalToSection: (goalId: string, section: string) => ({
        type: PlannerTypes.moveGoalToSection,
        payload: { goalId, section }
    }),
    removeGoal: (goalId: string) => ({
        type: PlannerTypes.removeGoal,
        payload: { goalId }
    })
};
