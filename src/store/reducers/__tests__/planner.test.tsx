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

    it('should handle and create new section', () => {
        const newSectionName = "new training";
        const stateWithLoading = {
            ...initialState,
            loading: true
        };

        /**
         * Just to initialize some state with loaded planner
         */
        const expectedStateWithEmptyPlanner = Object.assign(stateWithLoading, {
            byTrainings: new Planner({}),
            loadedByTrainings: true,
            loading: false
        });
        expect(planner(stateWithLoading, {
            type: PlannerTypes.loadByTrainingsSuccess,
            payload: { planner: new Planner({}) }
        }))
            .toEqual(expectedStateWithEmptyPlanner);

        /**
         * Create first section
         */
        const expectedStateWithNewSection = Object.assign({}, expectedStateWithEmptyPlanner, {
            byTrainings: new Planner({ [newSectionName]: [] }),
            byTrainingsEmpty: false
        });
        const modifiedState = planner(expectedStateWithEmptyPlanner, {
            type: PlannerTypes.createSectionSuccess,
            payload: { name: newSectionName }
        });
        expect(modifiedState).toEqual(expectedStateWithNewSection);
        expect(modifiedState.byTrainingsEmpty).toBeFalsy();
        expect(modifiedState.byTrainings.trainings).toHaveLength(1);
        expect(modifiedState.byTrainings.trainings[0].name).toBe(newSectionName);
    })
});
