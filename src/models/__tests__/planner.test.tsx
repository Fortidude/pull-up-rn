import Planner, { PlannerMethods } from './../Planner';
import { SetInterface } from '../Set';

const plannerMockData = {
    "test": [
        {
            "id": "718c6ab1-70cf-493b-ad41-a5a94704db3d",
            "required_type": "reps",
            "sets": [],
            "required_amount": "50",
            "last_set_value": "1",
            "done_this_circuit": "82",
            "left_this_circuit": "-32",
            "exercise": {
                "id": "3b5ff44a-6a87-4693-8a37-49667cd97d14",
                "name": "Planche",
                "description": "",
                "is_cardio": false
            },
            "exercise_variant": {
                "id": "d81e51ab-f4aa-49f1-a8c6-4a2b89d2ebc4",
                "name": "Straddle",
                "description": ""
            },
            "name": "empty",
            "description": "empty",
            "required_sets": null,
            "required_weight": null,
            "required_reps": 50,
            "created_at": "2017-11-05T09:15:17+0100",
            "updated_at": "2018-09-11T19:01:33+0200"
        },
    ]
};

test('Create Planner', () => {
    const planner = new Planner(plannerMockData);
    expect(planner.trainings.length).toBe(1);
    expect(planner.trainings[0].name).toBe("test");

    expect(planner.trainings[0].goals.length).toBe(1);
    expect(planner.trainings[0].goals[0].exercise.name).toBe("Planche");
    expect(planner.trainings[0].goals[0].exercise.exerciseVariant.name).toBe("Straddle");
    expect(planner.trainings[0].goals[0].requiredReps).toBe(50);
})

test('add Set to Goal', () => {
    const planner = new Planner(plannerMockData);
    const goal = Object.assign({}, planner.trainings[0].goals[0]);
    const set: SetInterface = {
        goal: goal,
        reps: 10,
        time: 0,
        weight: 20,
        date: new Date()
    };

    expect(planner.trainings[0].goals[0].sets.length).toBe(0);
    PlannerMethods.addSetToGoal(set, planner)

    expect(planner.trainings[0].goals[0].sets.length).toBe(1);
    expect(planner.trainings[0].goals[0].sets[0].goal).toBe(goal.id);
});
