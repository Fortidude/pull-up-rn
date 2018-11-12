import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { UserTypes, UserActions } from '../actions/user';
import { Data } from '../../api';
import User from 'src/models/User';
import { PlannerActions } from '../actions/planner';

//@ts-ignore
export const getUser = (state) => state.user.current;

export function* updateSettings(action: any) {
    try {
        const user: User = yield select(getUser);
        let settings = {
            days_per_circuit: user.days_per_circuit,
            name: user.name,
            planner_custom_mode: user.planner_custom_mode,
            base64avatar: user.avatar
        };

        yield Data.postUpdateSettings({ ...settings, ...action });

        if (action.planner_custom_mode !== undefined) {
            yield put(UserActions.togglePlannerCustomModeSuccess());
            yield put(PlannerActions.loadPlanner());
        }
    } catch (error) {
        console.log('UPDATE SETTINGS UPDATE FAILED');
        console.log(error);
    }
}

function* togglePlannerCustomMode(action: any) {
    const user: User = yield select(getUser);
    yield updateSettings({ planner_custom_mode: !user.planner_custom_mode });
}

function* settingsSaga() {
    yield all([
        takeEvery(UserTypes.togglePlannerCustomMode, togglePlannerCustomMode)
    ]);
}

export default settingsSaga;
