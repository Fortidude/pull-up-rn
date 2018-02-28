import * as Types from './types';
import { loadPlanner } from './planner.actions';
import DataService from './../../Data/data';

/**
 *
 * CREATE GOAL
 *
 */
export function createGoal(payload) {
    return (dispatch) => {
        dispatch(_createGoal());
        DataService.postCreateGoal(payload)
            .then((response) => {
                if (response.status === true) {
                    dispatch(_createSuccess());
                    dispatch(loadPlanner(true));
                } else {
                    dispatch(_createFailed(response.message));
                }
            })
            .catch((error) => {
                dispatch(_createFailed(error.message));
            })
    }
}

/**
 *
 * DISABLE GOAL
 *
 */
export function disableGoal(goalId) {
    return (dispatch) => {
        dispatch(_disableGoal(goalId));
        DataService.postDisableGoal(goalId)
            .then((response) => {
                if (response.status === true) {
                    dispatch(_disableGoalSuccess(goalId));
                } else {
                    dispatch(_disableGoalFailed(response.message, goalId));
                }
            })
            .catch((error) => {
                dispatch(_disableGoalFailed(error.message, goalId));
            })
    }
}

/**
 *
 * CREATE GOAL
 *
 */
function _createGoal() {
    return {
        type: Types.CREATE_GOAL
    }
}

function _createSuccess() {
    return {
        type: Types.CREATE_GOAL_SUCCESS
    }
}

function _createFailed(error) {
    return {
        type: Types.CREATE_GOAL_FAILED,
        payload: {error: error}
    }
}

/**
 *
 * DISABLE GOAL
 *
 */
function _disableGoal(goalId) {
    return {
        type: Types.DISABLE_GOAL,
        payload: {goalId: goalId}
    }
}

function _disableGoalSuccess(goalId) {
    return {
        type: Types.DISABLE_GOAL_SUCCESS,
        payload: {goalId: goalId}
    }
}

function _disableGoalFailed(error, goalId) {
    return {
        type: Types.DISABLE_GOAL_FAILED,
        payload: {goalId: goalId, error: error}
    }
}