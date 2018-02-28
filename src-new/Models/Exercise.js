export class Exercise {
    id;
    name;
    description;
    is_cardio;
    exercise_variants;

    constructor(object) {
        if (object && typeof object === 'object') {
            this.id = object.id;
            this.name = object.name;
            this.is_cardio = object.is_cardio;
            if (object.exercise_variants) {
                this.exercise_variants = object.exercise_variants.map(ev => new ExerciseVariant(ev));
            }
        }
    }
}

export class ExerciseVariant {
    id;
    name;
    description;

    constructor(object) {
        if (object && typeof object === 'object') {
            Object.keys(object).forEach(key => this[key] = object[key]);
        }
    }
}
