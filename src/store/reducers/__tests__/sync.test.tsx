import sync, { initialState } from '../sync';
import { SyncTypes } from '../../actions/sync';

describe('sync reducer', () => {
    it('should return the initial state', () => {
        expect(sync(undefined, {})).toEqual(initialState);
    })

    it('should add request', () => {
        var UUIDregex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        const stateWithRequest = sync(initialState, {
            type: SyncTypes.addRequest, payload: {
                url: '/fetch-url',
                headers: {}
            }
        });

        expect(stateWithRequest.syncing).toBeFalsy();

        const key = Object.keys(stateWithRequest.items)[0];
        expect(UUIDregex.test(key)).toBeTruthy();

        expect(stateWithRequest.items[key]).toMatchObject({ url: '/fetch-url', headers: {} });
    })

    it('should remove request', () => {
        const stateWithRequestToRemove = sync(initialState, {
            type: SyncTypes.addRequest, payload: {
                url: '/fetch-url',
                headers: { method: 'POST' }
            }
        });
        const key = Object.keys(stateWithRequestToRemove.items)[0];
        expect(stateWithRequestToRemove.items[key]).toMatchObject({ url: '/fetch-url', headers: { method: 'POST' } });

        const stateWithRemoved = sync(stateWithRequestToRemove, {
            type: SyncTypes.removeRequest, payload: {
                key: key
            }
        });

        expect(stateWithRequestToRemove.items[key]).toBeDefined();
        expect(stateWithRemoved.items[key]).toBeUndefined();
    })

    it('should synchronize', () => {
        const stateWithAddedRequest = sync(initialState, {
            type: SyncTypes.addRequest, payload: {
                url: '/fetch-url',
                headers: { method: 'POST' }
            }
        });
        const stateWithTwoRequests = sync(stateWithAddedRequest, {
            type: SyncTypes.addRequest, payload: {
                url: '/fetch-url',
                headers: { method: 'POST' }
            }
        });

        expect(Object.keys(stateWithTwoRequests.items).length).toBe(2);
        expect(stateWithAddedRequest.syncing).toBeFalsy();

        const stateAfterSynchronize = sync(stateWithTwoRequests, {
            type: SyncTypes.synchronize, payload: {}
        });

        expect(stateAfterSynchronize.syncing).toBeTruthy();
    })
});
