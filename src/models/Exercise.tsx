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
    exerciseVariant: ExerciseVariant|null = null;

    constructor(data: ExerciseInterface, dataVariant: ExerciseVariantInterface) {
        this.id = data.id
        this.name = data.name;
        this.isCardio = data.is_cardio;
        this.description = data.description;
        
        if (dataVariant) {
            this.exerciseVariant = new ExerciseVariant(dataVariant);
        }
    }
}

class ExerciseVariant implements ExerciseVariantInterface {
    id: string;
    name: string
    description: string;

    constructor(data: ExerciseVariantInterface) {
        this.id = data.id
        this.name = data.name;
        this.description = data.description;
    }
}

export {
    Exercise,
    ExerciseVariant
}

