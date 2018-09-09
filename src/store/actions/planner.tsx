import Planner from "../../models/Planner";
import Goal from "../../models/Goal";

export enum PlannerTypes {
    loadByTrainings = '[PLANNER] LOAD BY TRAININGS',
    loadByTrainingsSuccess = '[PLANNER] LOAD BY TRAININGS SUCCESS',
    loadByTrainingsFailed = '[PLANNER] LOAD BY TRAININGS FAILED',

    selectGoal = '[PLANNER] SELECT GOAL'
}

export const PlannerActions = {
    loadByTrainings: () => ({
        type: PlannerTypes.loadByTrainings,
        payload: {}
    }),
    loadByTrainingsSuccess: (planner: Planner) => ({
        type: PlannerTypes.loadByTrainingsSuccess,
        payload: {planner: planner}
    }),
    loadByTrainingsFailed: (error: string) => ({
        type: PlannerTypes.loadByTrainingsFailed,
        payload: {error: error}
    }),

    selectGoal: (goal: Goal|null) => ({
        type: PlannerTypes.selectGoal,
        payload: {goal: goal}
    })
};
