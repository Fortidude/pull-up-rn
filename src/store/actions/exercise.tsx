import { Exercise } from "../../models/Exercise";

export enum ExerciseTypes {
    loadExercises = '[EXERCISE] LOAD EXERCISES',
    loadExercisesSuccess = '[EXERCISE] LOAD EXERCISES SUCCESS',
    loadExercisesFailed = '[EXERCISE] LOAD EXERCISES FAILED',
    startFetching = '[EXERCISE] START FETCHING',

}

export const ExerciseActions = {
    loadExercises: () => ({
        type: ExerciseTypes.loadExercises,
        payload: {}
    }),
    loadExercisesSuccess: (exercises: Exercise[]) => ({
        type: ExerciseTypes.loadExercisesSuccess,
        payload: { exercises }
    }),
    loadExercisesFailed: (error: any) => ({
        type: ExerciseTypes.loadExercisesFailed,
        payload: { error: error }
    }),
    startFetching: () => ({
        type: ExerciseTypes.startFetching,
        payload: {}
    }),
};
