import * as Types from './types';
import DataService from './../../Data/data';
import { PURGE } from 'redux-persist/es/constants';
import { reloadUser } from './../Auth/actions';
// import PlannerActions  from './../Planner/actions';


/**
 *
 * @param payload
 * @returns {function(*, *)}
 */
export function updateSettings(payload) {
    return (dispatch) => {
        dispatch(_updateSettings());

        DataService.postUpdateSettings(payload).then((response) => {
            if (response.status) {
                dispatch(reloadUser());
                dispatch(_updateSettingsSuccess(payload));
            } else {
                dispatch(_updateSettingsFailed(response.message));
            }
        })
    }
}

/**
 *
 * @returns {{type}}
 */
export function reset() {
    return {
        type: Types.UPDATE_SETTINGS_RESET,
    };
}

export function purge() {
    return {
        type: PURGE
    }
}

function _updateSettings() {
    return {
        type: Types.UPDATE_SETTINGS,
    };
}

function _updateSettingsSuccess(payload) {
    return {
        type: Types.UPDATE_SETTINGS_SUCCESS,
        payload: payload
    };
}

function _updateSettingsFailed(error) {
    return {
        type: Types.UPDATE_SETTINGS_FAILED,
        payload: {error: error}
    };
}
