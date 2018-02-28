import * as Types from './types';
import { logout } from './../Auth/actions';
import DataService from './../../Data/data';
import { AsyncStorage } from 'react-native';

/**
 * LOAD PLANNER
 */
export function loadPlanner(refresh = false) {
    return (dispatch, getState) => {
        const state = getState().planner;
        const plannerCustomMode = getState().auth.user.planner_custom_mode;
        if ((!refresh && state.loaded && state.custom_mode === plannerCustomMode)) {
            return;
        }

        dispatch(_loadPlanner(plannerCustomMode));
        DataService.getGoalPlannerList(false)
            .then((resp) => dispatch(_loadPlannerSuccess(resp)))
            .catch((err) => {
                if (err === 'Invalid JWT Token' || err === 'Expired JWT Token') {
                    dispatch(logout());
                }

                dispatch(_loadPlannerFailed(err))
            });
    }
}

/**
 * CREATE SET
 */
export function createSet(payload) {
    return (dispatch, getState) => {
        const state = getState().planner;
        if (state.loading) {
            return;
        }

        dispatch(_createSet());
        DataService.postCreateGoalSet(payload)
            .then((response) => {
                if (response.status === true) {
                    dispatch(_createSetSuccess(payload))
                } else {
                    dispatch(_createSetFailed(response.message));
                }
            })
            .catch((err) => {
                dispatch(_createSetFailed(err.message));
            });
    }
}

export function loadStatistics(refresh = false) {
    return (dispatch, getState) => {
        const state = getState().planner;
        if ((!refresh && state.statistics) || (!refresh && state.statistics_loading)) {
            return;
        }

        dispatch(_loadStatistics());
        DataService.getPlannerStatistics(false)
            .then((resp) => dispatch(_loadStatisticsSuccess(resp)))
            .catch((err) => {
                if (err === 'Invalid JWT Token' || err === 'Expired JWT Token') {
                    dispatch(logout());
                }

                dispatch(_loadStatisticsSuccess(err))
            });
    }
}

export function moveGoalToSection(goalId, oldSectionName, sectionName) {
    return (dispatch, getState) => {

        dispatch(_moveGoalToSection(goalId, oldSectionName));
        DataService.postMoveGoalToSection(goalId, sectionName)
            .then((resp) => dispatch(_moveGoalToSectionSuccess(goalId, oldSectionName, sectionName)))
            .catch((err) => {
                if (err === 'Invalid JWT Token' || err === 'Expired JWT Token') {
                    dispatch(logout());
                }

                dispatch(_moveGoalToSectionFailed(err, sectionName, goalId))
            });
    }
}

/**
 * CREATE SECTION
 */
export function createSection(sectionName) {
    return (dispatch) => {
        dispatch(_createSection(sectionName));
        DataService.postCreateSection(sectionName)
            .then((response) => {
                if (response.status !== true) {
                    // @TODO success / failed
                }
            })
            .catch((err) => {
                // @TODO success / failed
            });
    }
}
export function _createSection(sectionName) {
    return {
        type: Types.CREATE_SECTION,
        payload: {section_name: sectionName}
    }
}

export function resetError() {
    return {
        type: Types.LOAD_PLANNER_ERROR_RESET
    }
}

export function selectSectionForGoalCreate(sectionName) {
    return {
        type: Types.SELECT_SECTION_FOR_GOAL_CREATE,
        payload: {section_name: sectionName}
    }
}

export function toggleSection(sectionName) {
    return {
        type: Types.TOGGLE_SECTION,
        payload: {section_name: sectionName}
    }
}

/**
 * LOAD PLANNER
 */
function _loadPlanner(customMode = false) {
    return {
        type: Types.LOAD_PLANNER,
        payload: {customMode: customMode}
    };
}

function _loadPlannerSuccess(exercises) {
    return {
        type: Types.LOAD_PLANNER_SUCCESS,
        payload: {items: exercises},
    };
}

function _loadPlannerFailed(error) {
    return {
        type: Types.LOAD_PLANNER_FAILED,
        payload: {error: error}
    };
}

/**
 * CREATE SET
 */
function _createSet() {
    return {
        type: Types.CREATE_SET
    };
}

function _createSetSuccess(payload) {
    return {
        type: Types.CREATE_SET_SUCCESS,
        payload: payload
    };
}

function _createSetFailed(error) {
    return {
        type: Types.CREATE_SET_FAILED,
        payload: {error: error}
    };
}

/**
 * LOAD STATISTICS
 */
function _loadStatistics() {
    return {
        type: Types.LOAD_STATISTICS
    };
}

function _loadStatisticsSuccess(data) {
    return {
        type: Types.LOAD_STATISTICS_SUCCESS,
        payload: {data: data},
    };
}

function _loadStatisticsFailed(error) {
    return {
        type: Types.LOAD_STATISTICS_FAILED,
        payload: {error: error}
    };
}

function _moveGoalToSection(goalId, oldSectionName) {
    return {
        type: Types.MOVE_GOAL_TO_SECTION,
        payload: {goalId: goalId, oldSectionName: oldSectionName}
    };
}

function _moveGoalToSectionSuccess(goalId, oldSectionName, sectionName) {
    return {
        type: Types.MOVE_GOAL_TO_SECTION_SUCCESS,
        payload: {goalId: goalId, oldSectionName: oldSectionName, sectionName: sectionName}
    };
}

function _moveGoalToSectionFailed(goalId, sectionName, error) {
    return {
        type: Types.MOVE_GOAL_TO_SECTION_FAILED,
        payload: {goalId: goalId, sectionName: sectionName, error: error}
    };
}
