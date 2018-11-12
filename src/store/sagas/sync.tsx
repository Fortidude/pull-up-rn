import { AsyncStorage } from 'react-native';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { SyncTypes, SyncActions } from '../actions/sync';
import { Data } from '../../api';

//@ts-ignore
export const getItemsToSync = (state) => state.sync.items;

/**
 * 
 * /@TODO refactoring
 * 
 * @param action 
 */
export function* synchronize(action: any) {
    const items: { [key: string]: any } = yield select(getItemsToSync);
    
    const toSync = Object.keys(items).length;
    let synchronized = 0;
    for (let key in items) {
        const { url, headers } = items[key];
        if (!url || !headers) {
            yield put(SyncActions.removeRequest(key));
            synchronized++;
            continue;
        }

        try {
            const response = yield call(Data.callManual, url, headers);
            if (response) {
                synchronized++;
                yield put(SyncActions.removeRequest(key));
            }
        } catch (err) {
            yield put(SyncActions.synchronizeFailed());
        }
    }

    if (toSync === synchronized) {
        yield put(SyncActions.synchronizeSuccess());
    }
}

function* syncSaga() {
    yield all([
        takeEvery(SyncTypes.synchronize, synchronize)
    ]);
}

export default syncSaga;