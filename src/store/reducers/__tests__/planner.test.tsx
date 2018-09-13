import planner, { initialState } from '../planner';
import { PlannerTypes } from '../../actions/planner';
import Planner from '../../../models/Planner';

describe('planner reducer', () => {
    it('should return the initial state', () => {
        expect(planner(undefined, {})).toEqual(initialState)
    })

    it('should handle load planner grouped by trainings', () => {
        const expectedStateWithLoading = {
            ...initialState,
            loading: true
        };

        expect(planner(initialState, { type: PlannerTypes.loadByTrainings }))
            .toEqual(expectedStateWithLoading);


        const expectedStateWithSuccess = Object.assign(expectedStateWithLoading, {
            byTrainings: new Planner({}),
            loadedByTrainings: true,
            loading: false
        });
        expect(planner(expectedStateWithLoading, {
            type: PlannerTypes.loadByTrainingsSuccess,
            payload: { planner: new Planner({}) }
        }))
            .toEqual(expectedStateWithSuccess);

        const expectedStateWithFailed = Object.assign(expectedStateWithLoading, {
            byTrainings: new Planner({}),
            loadedByTrainings: true,
            loading: false
        });
        expect(planner(expectedStateWithLoading, {
            type: PlannerTypes.loadByTrainingsSuccess,
            payload: { planner: new Planner({}) }
        }))
            .toEqual(expectedStateWithFailed);
    })
});
