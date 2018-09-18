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

    constructor(data: ExerciseInterface, dataVariant: ExerciseVariantInterface) {
        this.id = data.id
        this.name = data.name;
        this.isCardio = data.is_cardio;
        this.description = data.description;
        this.exerciseVariant = new ExerciseVariant(dataVariant);
    }
}

class ExerciseVariant implements ExerciseVariantInterface {
    id: string;
    name: string
    description: string;

    constructor(data: ExerciseVariantInterface) {
        this.id = data ? data.id : null
        this.name = data ? data.name : null;
        this.description = data ? data.description : null;
    }
}

export {
    Exercise,
    ExerciseVariant
}

