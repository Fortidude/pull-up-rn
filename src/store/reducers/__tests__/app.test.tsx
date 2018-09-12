import app, { initialState } from '../app';
import { AppTypes } from '../../actions/app';

describe('app reducer', () => {
    it('should return the initial state', () => {
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
        const initialStateAppLoaded = Object.assign({}, initialState, { loaded: true, networkChecked: false });
        expect(app(initialState, { type: AppTypes.appLoaded }))
            .toEqual(initialStateAppLoaded);

    })

    it('should handle is online reducer', () => {
        const expectedStateIsOnline = Object.assign({}, initialState, { isOnline: true, networkChecked: true });
        expect(app(initialState, { type: AppTypes.isOnline }))
            .toEqual(expectedStateIsOnline);
    })

    it('should handle is offline reducer', () => {

        const expectedStateIsOffline = Object.assign({}, initialState, { isOnline: false, networkChecked: true });
        expect(app(initialState, { type: AppTypes.isOffline }))
            .toEqual(expectedStateIsOffline);
    })
});
