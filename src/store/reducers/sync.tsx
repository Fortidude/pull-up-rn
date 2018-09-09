import { AnyAction } from 'redux';

import { SyncTypes } from '../actions/sync';
import DefaultTheme, { themes } from '../../assets/themes';
import { locales } from '../../assets/translations';
import I18n from '../../assets/translations';

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
                randomKey = ('abcdefghijklmnopqrstuvwxyz').split('')[(Math.floor(Math.random() * 26))];
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
            return { ...state, syncing: false, items: [] }
        default:
            return state;
    }
}

export default sync;
