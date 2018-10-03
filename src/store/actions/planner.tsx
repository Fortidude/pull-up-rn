import Planner from "../../models/Planner";
import Goal from "../../models/Goal";
import { SetInterface } from "../../models/Set";

export enum PlannerTypes {
    loadByTrainings = '[PLANNER] LOAD BY TRAININGS',
    loadByTrainingsSuccess = '[PLANNER] LOAD BY TRAININGS SUCCESS',
    loadByTrainingsFailed = '[PLANNER] LOAD BY TRAININGS FAILED',

    selectGoal = '[PLANNER] SELECT GOAL',

    createSet = '[PLANNER] CREATE SET',
    createSetLoading = '[PLANNER] CREATE SET LOADING',
    createSetSuccess = '[PLANNER] CREATE SET SUCCESS',
    createSetFailed = '[PLANNER] CREATE SET FAILED',

    createSection = '[PLANNER] CREATE SECTION',
    createSectionSuccess = '[PLANNER] CREATE SECTION SUCCESS',
    createSectionFailed = '[PLANNER] CREATE SECTION FAILED'
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
    })
};
