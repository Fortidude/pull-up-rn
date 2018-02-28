import * as Types from './types';

const INITIAL_STATE = {
    loading: false,
    updated: false,
    error: null,
    settings: {
        cardio_screen_on: false
    }
};

export default function settingsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        /**
         * UPDATE
         */
        case Types.UPDATE_SETTINGS: {
            return Object.assign({}, state, {loading: true, updated: false, error: null});
        }

        /**
         * UPDATE SUCCESS
         */
        case Types.UPDATE_SETTINGS_SUCCESS: {
            let settings = Object.assign({}, state.settings);

            return Object.assign({}, state, {loading: false, updated: true, settings: Object.assign(settings, action.payload)});
        }

        /**
         * UPDATE FAILED
         */
        case Types.UPDATE_SETTINGS_FAILED: {
            return Object.assign({}, state, {loading: false, updated: false, error: action.payload.error});
        }

        /**
         * UPDATE RESET
         */
        case Types.UPDATE_SETTINGS_RESET: {
            return Object.assign({}, state, {updated: false, error: null});
        }
    }

    return state;
};
