import { AnyAction } from 'redux';

import { SyncTypes } from '../actions/sync';
import { ApiHelper } from '../../api';

interface SyncState {
    syncing: boolean;
    items: { [key: string]: string };
}

export const initialState: SyncState = {
    syncing: false,
    items: {}
};

function sync(state = initialState, action: AnyAction): SyncState {
    switch (action.type) {
        case SyncTypes.addRequest: {
            const items: { [key: string]: any } = Object.assign({}, state.items);
            let randomKey: boolean | string = false;
            while (!randomKey || (randomKey in items)) {
                randomKey = ApiHelper.guid();
            }

            items[randomKey] = action.payload;
            return Object.assign({}, state, { items: items });
        }
        case SyncTypes.removeRequest: {
            const items: { [key: string]: any } = Object.assign({}, state.items);
            const key = action.payload.key;
            delete items[key];
            return Object.assign({}, state, { items: items });
        }
        case SyncTypes.synchronize:
            return Object.assign({}, state, { syncing: true });
        case SyncTypes.synchronizeSuccess:
            return Object.assign({}, state, { syncing: false });
        case SyncTypes.synchronizeFailed:
            return Object.assign({}, state, { syncing: false });
        default:
            return state;
    }
}

export default sync;
