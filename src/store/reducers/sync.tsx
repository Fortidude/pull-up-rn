import { AnyAction } from 'redux';

import { SyncTypes } from '../actions/sync';
import DefaultTheme, { themes } from '../../assets/themes';
import { locales } from '../../assets/translations';
import I18n from '../../assets/translations';
import { ApiHelper } from '../../api';

interface SyncState {
    syncing: boolean;
    items: {};
}

const initialState: SyncState = {
    syncing: false,
    items: {}
};

function sync(state = initialState, action: AnyAction): SyncState {
    switch (action.type) {
        case SyncTypes.addRequest: {
            const items: { [key: string]: any } = state.items;
            let randomKey: boolean | string = false;
            while (!randomKey || (randomKey in items)) {
                randomKey = ApiHelper.guid();
            }

            items[randomKey] = action.payload;
            return { ...state, items: items };
        }
        case SyncTypes.removeRequest: {
            const items: { [key: string]: any } = state.items;
            const key = action.payload.key;
            delete items[key];
            return { ...state, items: items }
        }
        case SyncTypes.synchronize:
            return { ...state, syncing: true }
        case SyncTypes.synchronizeSuccess:
            return { ...state, syncing: false }
        case SyncTypes.synchronizeFailed:
            return { ...state, syncing: false }
        default:
            return state;
    }
}

export default sync;
