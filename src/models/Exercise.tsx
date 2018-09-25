import ValidateUUID from '../service/helpers/ValidateUUID';

interface ExerciseInterface {
    [key: string]: any
}

interface ExerciseVariantInterface {
    [key: string]: any
}

class Exercise implements ExerciseInterface {
    id: string;
    name: string
    isCardio: boolean;
    description: string;
    exerciseVariant: ExerciseVariant;
    exerciseVariants: ExerciseVariant[];

    constructor(data: ExerciseInterface, dataVariant: ExerciseVariantInterface | null = null) {
        this.id = data.id
        this.name = data.name;
        this.isCardio = data.is_cardio;
        this.description = data.description;
        this.exerciseVariant = new ExerciseVariant(dataVariant);

        if (data.exercise_variants) {
            this.exerciseVariants = data.exercise_variants.map((variant: ExerciseVariantInterface) => new ExerciseVariant(variant))
        }
    }
}

class ExerciseVariant implements ExerciseVariantInterface {
    id: string;
    name: string
    description: string;

    constructor(data: ExerciseVariantInterface | null = null) {
        this.id = data ? data.id : null
        this.name = data ? data.name : null;
        this.description = data ? data.description : null;
    }
}

const validateExercise = (exercise: Exercise | null) => {
    return exercise !== null && typeof exercise.name === 'string' && exercise.name.length > 2 && ValidateUUID(exercise.id);
}

export {
    Exercise,
    ExerciseVariant,
    validateExercise
}

