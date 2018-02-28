import { Exercise, ExerciseVariant } from './Exercise';

export class Goal {
    id;

    required_type;
    required_amount;

    last_set_value;

    done_this_circuit;
    left_this_circuit;

    exercise;
    exercice_variant;

    name;
    description;

    required_sets;
    required_weight;
    required_reps;
    required_time;

    created_ad;

    loading = false;
    disabled = false;

    constructor(object) {
        if (object && typeof object === 'object') {
            Object.keys(object).forEach(key => {
                if (key === 'exercise') {
                    this.exercise = new Exercise(object.exercise);
                    return;
                }
                if (key === 'exercise_variant') {
                    this.exercise_variant = new ExerciseVariant(object.exercise_variant);
                    return;
                }

                this[key] = object[key]
            });
        }
    }
}