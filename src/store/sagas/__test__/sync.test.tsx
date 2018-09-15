import { put, call, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { SyncActions } from '../../actions/sync';
//import { login as loginApi } from '../api/login';
import { synchronize, getItemsToSync } from '../sync';
import { Data } from '../../../api';

describe('sync ', () => {
    beforeEach(() => {
      //  fetch.resetMocks();
    })

    it('should synchronize with empty -> success', () => {
        const action = SyncActions.synchronize();
        const generator = cloneableGenerator(synchronize)(action);
        generator.next();
        const stateMock = { empty: {} };

        expect(generator.next(stateMock).value).toEqual(put(SyncActions.removeRequest("empty")));
        expect(generator.next().value).toEqual(put(SyncActions.synchronizeSuccess()));
    })

    it('should call existing request -> remove -> success', () => {
        const url = 'http://some.fake';
        const headers = {};

        const action = SyncActions.synchronize();
        const generator = cloneableGenerator(synchronize)(action);
        generator.next();
        const stateMock = {"key": { url, headers }};

        expect(generator.next(stateMock).value).toEqual(call(Data.callManual, url, headers));
        expect(generator.next(true).value).toEqual(put(SyncActions.removeRequest("key")));
        expect(generator.next().value).toEqual(put(SyncActions.synchronizeSuccess()));
    })
});
