import { AppActions, AppTypes } from '..//app';

describe('actions', () => {
    it('toggle planner edit', () => {

        const expectedAction = {
            type: AppTypes.togglePlannerEdit,
            payload: {
                edit: true
            }
            
        }

        expect(AppActions.togglePlannerEdit(true)).toEqual(expectedAction)
    })
})
