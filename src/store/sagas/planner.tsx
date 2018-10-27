import { AsyncStorage } from 'react-native';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { PlannerActions, PlannerTypes } from '../actions/planner';
import { Data } from '../../api';
import { SetInterface } from '../../models/Set';

function* loadByTrainings() {
    //@ts-ignore
    const isOnline = yield select(state => state.app.isOnline);
    if (!isOnline) {
        yield put(PlannerActions.loadByTrainingsFailed('OFFLINE'));
    }

    try {
        const planner = yield Data.getPlannerByTrainings();
        yield put(PlannerActions.loadByTrainingsSuccess(planner));
    } catch (err) {
        yield put(PlannerActions.loadByTrainingsFailed(err));
    }
}

function* loadSetsHistoryByPeriod(action: any) {
    //@ts-ignore
    const isOnline = yield select(state => state.app.isOnline);
    if (!isOnline) {
        yield put(PlannerActions.loadSetsByDatePeriodFailed('OFFLINE'));
    }

    //@ts-ignore
    const setsHistoryLoaded = yield select(state => state.planner.setsHistoryLoaded);
    if (setsHistoryLoaded) {
        return;
    }

    try {
        const sets = yield Data.getGoalSetsHistory(action.payload.fromDate, action.payload.toDate);
        yield put(PlannerActions.loadSetsByDatePeriodSuccess(sets));
    } catch (err) {
        console.log(`loadSetsHistoryByPeriod sagas, line 33`, err);
        yield put(PlannerActions.loadSetsByDatePeriodFailed(err));
    }
}

function* loadStatistics() {
    //@ts-ignore
    const isOnline = yield select(state => state.app.isOnline);
    if (!isOnline) {
        yield put(PlannerActions.loadSetsByDatePeriodFailed('OFFLINE'));
    }

    //@ts-ignore
    const statisticsLoaded = yield select(state => state.planner.statisticsLoaded);
    if (statisticsLoaded) {
        return;
    }

    try {
        const statistics = yield Data.getGoalStatistics();
        yield put(PlannerActions.loadGoalStatisticsSuccess(statistics));
    } catch (err) {
        console.log(`loadStatistics sagas, line 61`, err);
        yield put(PlannerActions.loadSetsByDatePeriodFailed(err));
    }
}

function* createSet(action: any) {
    //@ts-ignore
    const isLoading = yield select(state => state.planner.createSetLoading);
    if (isLoading) {
        return;
    }

    try {
        yield put(PlannerActions.createSetLoading());
        const { goal, value, extraWeight } = action.payload;
        const type = goal.requiredType === 'none' ? 'reps' : goal.requiredType;
        const data: SetInterface = {
            goal: goal.id,
            date: new Date(),
            weight: extraWeight,
            [type]: value,
        }

        const result = yield Data.postCreateSet(data);
        if (!result.status) {
            console.log(`createSet sagas, line 86`, result);
            throw 'ERROR';
        }

        yield put(PlannerActions.createSetSuccess(data));
    } catch (err) {
        yield put(PlannerActions.createSetFailed(err));
    }
}

function* createSection(action: any) {
    try {
        const { name, description } = action.payload;
        const result = yield Data.postCreateSection(name, description);
        if (!result.status) {
            console.log(`createSection sagas, line 101`, result);
            throw 'ERROR';
        }

        yield put(PlannerActions.createSectionSucces(name, description));
    } catch (err) {
        yield put(PlannerActions.createSectionFailed(err));
    }
}

function* createGoal(action: any) {
    try {
        const data = action.payload.data;
        const result = yield Data.postCreateGoal(data);
        if (!result.status) {
            console.log(`createGoal sagas, line 116`, result);
            throw 'ERROR';
        }

        yield put(PlannerActions.createGoalSuccess());
    } catch (err) {
        yield put(PlannerActions.createGoalFailed(err));
    }
}

function* createGoalSuccess() {
    //@ts-ignore
    const isPlannerloadingInProgress = yield select(state => state.planner.loading);
    if (isPlannerloadingInProgress) {
        return
    }

    // refresh list only if loaded before. 
    //@ts-ignore
    const isPlannerByTrainingsLoaded = yield select(state => state.planner.loadedByTrainings);
    if (isPlannerByTrainingsLoaded) {
        yield put(PlannerActions.loadByTrainings())
    }
}

function* moveGoalToSection(action: any) {
    try {
        const { goalId, section } = action.payload;
        const result = yield Data.postMoveGoalToSection(goalId, { sectionName: section });
        if (!result.status) {
            console.log(`moveGoalToSection sagas, line 146`, result);
            throw 'ERROR';
        }
    } catch (err) {
        console.log(`moveGoalToSection sagas, line 150`, err);
        throw err;
    }
}

function* removeGoal(action: any) {
    try {
        const { goalId } = action.payload;
        const result = yield Data.postDisableGoal(goalId);
        if (!result.status) {
            console.log(`removeGoal sagas, line 160`, result);
            throw 'ERROR';
        }
    } catch (err) {
        console.log(`removeGoal sagas, line 164`, err);
        throw err;
    }
}

function* plannerSaga() {
    yield all([
        takeEvery(PlannerTypes.loadByTrainings, loadByTrainings),
        takeEvery(PlannerTypes.loadSetsByDatePeriod, loadSetsHistoryByPeriod),
        takeEvery(PlannerTypes.loadGoalStatistics, loadStatistics),
        takeEvery(PlannerTypes.createSet, createSet),
        takeEvery(PlannerTypes.createSection, createSection),
        takeEvery(PlannerTypes.createGoal, createGoal),
        takeEvery(PlannerTypes.createGoalSuccess, createGoalSuccess),
        takeEvery(PlannerTypes.moveGoalToSection, moveGoalToSection),
        takeEvery(PlannerTypes.removeGoal, removeGoal)
    ]);
}

export default plannerSaga;
