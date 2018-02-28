import * as Types from './types';
import {LOGOUT} from './../Auth/types';
import {UPDATE_SETTINGS_SUCCESS} from './../Settings/types';

import moment from 'moment';

import { Planner } from './../../Models/Planner';

const INITIAL_PLANNER = new Planner();

const INITIAL_STATE = {
    planner: INITIAL_PLANNER,
    last_modified_key: 'today',
    custom_mode: false,
    loaded: false,
    loading: false,
    goal_created: false,
    error: null,
    statistics: null,
    statistics_loading: false,
    selected_section_name: 'other',
    sections_hidden: [],
    expires_at: moment().hour(23).minute(59).format()
};

export default function plannerReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        /**
         * LOGOUT
         */
        case LOGOUT: {
            return Object.assign({}, INITIAL_STATE);
        }
        /**
         * UPDATE_SETTINGS_SUCCESS
         */
        case UPDATE_SETTINGS_SUCCESS: {
            return Object.assign({}, state, {planner: INITIAL_PLANNER, loaded: false});
        }

        /**
         * LOAD
         */
        case Types.LOAD_PLANNER: {
            return Object.assign({}, state, {loading: true, error: null, custom_mode: action.payload.customMode});
        }

        /**
         * SUCCESS
         */
        case Types.LOAD_PLANNER_SUCCESS: {
            let planner = new Planner(action.payload.items);
            let keyName = 'today';
            Object.keys(planner).forEach(key => {
                if (planner[key].length > 0) {
                    keyName = key;
                }
            });

            return Object.assign({}, state, {loading: false, loaded: true, planner: planner, last_modified_key: keyName});
        }

        /**
         * FAILED
         */
        case Types.LOAD_PLANNER_FAILED: {
            return Object.assign({}, state, {loading: false, error: action.payload.error});
        }

        /**
         * RESET ERROR
         */
        case Types.LOAD_PLANNER_ERROR_RESET: {
            return Object.assign({}, state, {error: null, goal_created: false});
        }

        /**
         * CREATE SET
         */
        case Types.CREATE_SET: {
            return Object.assign({}, state, {loading: true, error: null});
        }

        case Types.CREATE_SET_SUCCESS: {
            let planner = state.planner;
            let lastModifiedKeyName = state.last_modified_key;
            let goalId = action.payload.goal;
            let value = 0;

            /**
             * payload = {
             *      goal: <string>
             *      data: <Data>
             *      set || rep || weight || time: <integer>
             * }
             */
            Object.keys(action.payload).forEach(key => {
                if (key !== 'goal' && key !== 'data') {
                    value = parseInt(action.payload[key]);
                }
            });

            let goal = null;
            let newSectionName = 'today';
            let allKeys = [];
            Object.keys(planner).forEach(item => {
                allKeys.push(item);
                planner[item].forEach((goalObject, key) => {
                    if (goalObject && goalObject.id === goalId) {
                        goal = goalObject;
                        planner[item].splice(key, 1);

                        if (state.custom_mode) {
                            newSectionName = item;
                        }

                        lastModifiedKeyName = item;
                    }
                })
            });

            if (goal.required_type === 'sets') {
                value = 1;
            }

            goal.done_this_circuit = parseInt(goal.done_this_circuit) + value;
            goal.left_this_circuit = parseInt(goal.required_amount) - goal.done_this_circuit;
            goal.last_set_value = value;
            goal.sets.push({
                "value": value,
                "created_at": new Date()
            });

            if (typeof planner[newSectionName] === 'undefined') {
                planner = Object.assign({today: []}, planner);
            }

            planner[newSectionName].unshift(goal);

            // if custom_mode sort planner by last edited goal (newSectionNew = section by goal in custom_mode)
            if (state.custom_mode) {
                let sortedPlanner = {};
                allKeys.sort((first, second) => (second === newSectionName) ? 1 : 0);
                allKeys.forEach(item => {
                    sortedPlanner[item] = planner[item];
                });

                planner = sortedPlanner;
            }

            return Object.assign({}, state, {planner: planner, loading: false, last_modified_key: lastModifiedKeyName})
        }

        case Types.CREATE_SET_FAILED: {
            return Object.assign({}, state, {loading: false, error : action.payload.error})
        }

        /**
         * CREATE GOAL
         */
        case Types.CREATE_GOAL: {
            return Object.assign({}, state, {loading: true, error: null});
        }

        case Types.CREATE_GOAL_SUCCESS: {
            return Object.assign({}, state, {loading: false, goal_created: true})
        }

        case Types.CREATE_GOAL_FAILED: {
            return Object.assign({}, state, {loading: false, goal_created: false, error : action.payload.error})
        }

        /**
         * UPDATE GOAL
         */
        case Types.UPDATE_GOAL: {
            return Object.assign({}, state, {loading: true, error: null});
        }

        case Types.UPDATE_GOAL_SUCCESS: {
            return Object.assign({}, state, {loading: false})
        }

        case Types.UPDATE_GOAL_FAILED: {
            return Object.assign({}, state, {loading: false, error : action.payload.error})
        }

        /**
         * DISABLE GOAL
         */
        case Types.DISABLE_GOAL: {
//            let goalId = action.payload.goalId;

            return Object.assign({}, state, {error: null});
        }

        case Types.DISABLE_GOAL_SUCCESS: {
            let goalId = action.payload.goalId;
            let planner = state.planner;

            Object.keys(planner).forEach(item => {
                planner[item].forEach((goalObject, key) => {
                    if (goalObject && goalObject.id === goalId) {
                        planner[item].splice(key, 1);
                    }
                })
            });

            return Object.assign({}, state, {planner: planner})
        }

        case Types.DISABLE_GOAL_FAILED: {
          //  let goalId = action.payload.goalId;

            return Object.assign({}, state, {error : action.payload.error})
        }

        case Types.LOAD_STATISTICS: {
            return Object.assign({}, state, {statistics_loading: true, error: null})
        }

        case Types.LOAD_STATISTICS_SUCCESS: {
            return Object.assign({}, state, {statistics_loading: false, statistics: Object.assign({}, action.payload.data)})
        }

        case Types.LOAD_STATISTICS_FAILED: {
            return Object.assign({}, state, {statistics_loading: false, error: action.payload.error})
        }

        case Types.MOVE_GOAL_TO_SECTION: {
            let planner = state.planner;

            let oldSectionName = action.payload.oldSectionName;
            let goalId = action.payload.goalId;

            planner[oldSectionName].forEach((goalObject, key) => {
                if (goalObject && goalObject.id === goalId) {
                    goalObject.loading = true;
                    planner[oldSectionName][key] = goalObject;
                }
            });

            return Object.assign({}, state, {planner: planner});
        }

        case Types.MOVE_GOAL_TO_SECTION_SUCCESS: {
            let planner = state.planner;
            let goal = null;

            let oldSectionName = action.payload.oldSectionName;
            let sectionName = action.payload.sectionName;
            let goalId = action.payload.goalId;


            planner[oldSectionName].forEach((goalObject, key) => {
                if (goalObject && goalObject.id === goalId) {
                    goal = goalObject;
                    goal.loading = false;
                    planner[oldSectionName].splice(key, 1);
                }
            });

            planner[sectionName].unshift(goal);

            return Object.assign({}, state, {planner: planner});
        }


        case Types.MOVE_GOAL_TO_SECTION_FAILED: {
            let planner = state.planner;

            let oldSectionName = action.payload.oldSectionName;
            let goalId = action.payload.goalId;

            planner[oldSectionName].forEach((goalObject, key) => {
                if (goalObject && goalObject.id === goalId) {
                    goalObject.loading = false;
                    planner[oldSectionName][key] = goalObject;
                }
            });

            return Object.assign({}, state, {planner: planner});
        }

        case Types.CREATE_SECTION: {
            let sectionName = action.payload.section_name;
            let planner = Object.assign({}, state.planner);

            if (planner[sectionName]) {
                return Object.assign({}, state);
            }

            let object = {};
            object[sectionName] = [];
            return Object.assign({}, state, {planner: Object.assign(object, planner)});
        }

        case Types.SELECT_SECTION_FOR_GOAL_CREATE: {
            return Object.assign({}, state, {selected_section_name: action.payload.section_name})
        }

        case Types.TOGGLE_SECTION: {
            let sectionsHidden = state.sections_hidden;
            let index = sectionsHidden.indexOf(action.payload.section_name);
            if (index >= 0) {
                sectionsHidden.splice(index, 1);
            } else {
                sectionsHidden.push(action.payload.section_name);
            }

            return Object.assign({}, state, {sections_hidden: sectionsHidden})
        }
    }

    return state;
};
