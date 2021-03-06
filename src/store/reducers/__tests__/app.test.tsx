import app, { initialState } from '../app';
import { AppTypes } from '../../actions/app';

describe('app reducer', () => {
    it('should return the initial state', () => {
        //@ts-ignore
        expect(app(undefined, {})).toEqual(
            {
                loaded: false,
                networkChecked: false,
                isOnline: true,
                plannerEditMode: false
            }
        )
    })

    it('should handle app loaded reducer', () => {
        const initialStateAppLoaded = {...initialState, loaded: true, networkChecked: false };
        expect(app(initialState, { type: AppTypes.appLoaded }))
            .toEqual(initialStateAppLoaded);
    })

    it('should handle is online reducer', () => {
        const expectedStateIsOnline = {...initialState, isOnline: true, networkChecked: true };
        expect(app(initialState, { type: AppTypes.isOnline }))
            .toEqual(expectedStateIsOnline);
    })

    it('should handle is offline reducer', () => {
        const expectedStateIsOffline = {...initialState, isOnline: false, networkChecked: true };
        expect(app(initialState, { type: AppTypes.isOffline }))
            .toEqual(expectedStateIsOffline);
    })
});
