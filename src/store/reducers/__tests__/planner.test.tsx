import planner, { initialState } from '../planner';
import { PlannerTypes, PlannerActions } from '../../actions/planner';
import Planner from '../../../models/Planner';
import Goal from '../../../models/Goal';

const goalOne = new Goal({
    "sets": [],
    "id": "64d08432-f9e6-4b12-a072-5fe8d20c60b1",
    "createdAt": "2018-10-06 11:40",
    "updatedAt": "2018-10-06 11:40",
    "exercise": {},
    "description": "empty",
    "doneThisCircuit": 0,
    "leftThisCircuit": 10,
    "lastSetValue": null,
    "name": "Press to HS Full",
    "requiredAmount": 10,
    "requiredReps": 10,
    "requiredSets": null,
    "requiredWeight": null,
    "requiredType": "reps"
});

const goalTwo = new Goal({
    "sets": [],
    "id": "ca010b1f-9605-4aef-81dc-0fc3031a0a40",
    "createdAt": "2018-10-06 11:40",
    "updatedAt": "2018-10-06 11:40",
    "exercise": {},
    "description": "empty",
    "doneThisCircuit": 0,
    "leftThisCircuit": 10,
    "lastSetValue": null,
    "name": "Squat",
    "requiredAmount": 10,
    "requiredReps": 10,
    "requiredSets": null,
    "requiredWeight": null,
    "requiredType": "reps"
});

describe('planner reducer', () => {
    it('should return the initial state', () => {
        //@ts-ignore
        expect(planner(undefined, {})).toEqual(initialState)
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
            planner: new Planner({}),
            loadedPlanner: true,
            loading: true
        });
        expect(planner(stateWithLoading, {
            type: PlannerTypes.loadPlanner,
            payload: { planner: new Planner({}) }
        }))
            .toEqual(expectedStateWithEmptyPlanner);

        /**
         * Create first section
         */
        const expectedStateWithNewSection = Object.assign({}, expectedStateWithEmptyPlanner, {
            planner: new Planner({ [newSectionName]: [] }),
            plannerEmpty: false
        });
        const modifiedState = planner(expectedStateWithEmptyPlanner, {
            type: PlannerTypes.createSectionSuccess,
            payload: { name: newSectionName }
        });
        expect(modifiedState).toEqual(expectedStateWithNewSection);
        expect(modifiedState.plannerEmpty).toBeFalsy();
        expect(modifiedState.planner.trainings).toHaveLength(1);
        expect(modifiedState.planner.trainings[0].name).toBe(newSectionName);
    })

    it('should add Goals with section', () => {
        /*
         *  Just creating state with goals
         * 
         */
        const expectedState = Object.assign(initialState, {
            planner: new Planner({ "section name": [goalOne, goalTwo] }),
            plannerEmpty: false,
            loadedPlanner: true,
            loading: false
        });

        const newState = planner(initialState, {
            type: PlannerTypes.loadPlannerSuccess,
            payload: {
                planner: new Planner({
                    "section name": [goalOne, goalTwo]
                })
            }
        });

        expect(JSON.stringify(newState))
            .toEqual(JSON.stringify(expectedState));
    })

    it('should move goal from one to another section', () => {
        const state = Object.assign(initialState, {
            planner: new Planner({ "section name": [goalOne, goalTwo], "second section": [] }),
            plannerEmpty: false,
            loadedPlanner: true,
            loading: false
        });

        const goalId = goalOne.id;
        const sectionName = "second section";

        const newState = planner(state, PlannerActions.moveGoalToSection(goalId, sectionName));
        const expectedState = Object.assign({}, state, {
            planner: new Planner({ "section name": [goalTwo], "second section": [goalOne] })
        })

        expect(JSON.stringify(newState))
            .toEqual(JSON.stringify(expectedState));

        expect(() => planner(state, PlannerActions.moveGoalToSection(goalId, "some Fake section name")))
            .toThrowError(new Error('SECTION_NOT_FOUND'));

        expect(() => planner(state, PlannerActions.moveGoalToSection("some-fake-goal-id", sectionName)))
            .toThrowError(new Error('GOAL_NOT_FOUND'));
    })

    it('should remove goal', () => {
        const state = Object.assign(initialState, {
            planner: new Planner({ "section name": [goalOne, goalTwo], "second section": [] }),
            plannerEmpty: false,
            loadedPlanner: true,
            loading: false
        });

        const goalId = goalOne.id;

        const newState = planner(state, PlannerActions.removeGoal(goalId));
        const expectedState = Object.assign({}, state, {
            planner: new Planner({ "section name": [goalTwo], "second section": [] })
        })

        expect(JSON.stringify(newState))
            .toEqual(JSON.stringify(expectedState));
    })
});
