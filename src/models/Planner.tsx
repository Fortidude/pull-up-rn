import { SetInterface, sortSetsByDate } from "./Set";
import Training from "./Training";
import Goal, { GoalInterface } from "./Goal";

interface PlannerInterface {
    trainings: Training[];
}

interface DataInterface {
    [key: string]: Goal[]
}


class Planner implements PlannerInterface {
    trainings: Training[] = [];

    constructor(data: DataInterface) {
        for (let name in data) {
            this.trainings.push(new Training(name, data[name]));
        }
    }
}

export default Planner;

class PlannerMethodsClass {
    private static instance: PlannerMethodsClass;

    private constructor() { }
    static getInstance() {
        if (!PlannerMethodsClass.instance) {
            PlannerMethodsClass.instance = new PlannerMethodsClass();
        }
        return PlannerMethodsClass.instance;
    }

    addSetToGoal = (set: SetInterface, planner: PlannerInterface) => {
        let added = false;
        const goalId: string = typeof set.goal === 'string' ? set.goal : set.goal.id;
        set.goal = goalId;

        planner.trainings.forEach((training: Training, key: number) => {
            if (added) {
                return;
            }

            training.goals.forEach((goal: Goal, key: number) => {
                if (goal.id === goalId) {
                    goal.sets.push(set);
                    goal.sets.sort(sortSetsByDate);

                    this.recountGoal(goal, set);

                    added = true;
                }
            });
        });

        return added;
    }

    recountGoal = (goal: GoalInterface, set: SetInterface) => {
        // @ts-ignore
        goal.doneThisCircuit = parseInt(goal.doneThisCircuit);
        // @ts-ignore
        goal.requiredAmount = parseInt(goal.requiredAmount);
        switch (goal.requiredType) {
            case 'sets': {
                goal.doneThisCircuit += 1;
                break;
            }
            case 'reps': {
                // @ts-ignore
                goal.doneThisCircuit += parseInt(set.reps);
                break;
            }
            case 'time': {
                // @ts-ignore
                goal.doneThisCircuit += parseInt(set.time);
                break;
            }
            case 'weight': {
                // @ts-ignore
                goal.doneThisCircuit += parseInt(set.weight);
                break;
            }
        }

        if (goal.requiredAmount) {
            goal.leftThisCircuit = goal.requiredAmount - goal.doneThisCircuit;
        }
    }

    /**
     * Tested by redux Planner tests
     */
    moveGoalToSection = (goalId: string, sectionName: string, planner: Planner): Planner => {
        const newSectionIndex = planner.trainings.findIndex(training => {
            return training.name === sectionName
        });
        if (newSectionIndex === -1) {
            throw new Error("SECTION_NOT_FOUND");
        }

        let goalIndexInOldSection: number | null = null;
        let oldSectionIndex: number | null = null;
        let goal: Goal | null = null;
        planner.trainings.forEach((oldSection, index) => {
            if (goalIndexInOldSection !== null) {
                return;
            }

            const goalIndex = oldSection.goals.findIndex(goalTemp => goalTemp.id === goalId);

            if (goalIndex > -1) {
                goalIndexInOldSection = goalIndex;
                oldSectionIndex = index;
                goal = Object.assign({}, oldSection.goals[goalIndexInOldSection]);
            }
        });

        if (oldSectionIndex === null || goalIndexInOldSection === null || !goal) {
            throw new Error("GOAL_NOT_FOUND");
        }

        planner.trainings[oldSectionIndex].goals.splice(goalIndexInOldSection, 1);
        planner.trainings[newSectionIndex].goals.push(Object.assign({}, goal));

        return planner;
    }

    /**
     * Tested by redux Planner tests
     */
    removeGoal = (goalId: string, planner: Planner): Planner => {
        let sectionIndex: number | null = null;
        let goalIndex: number | null = null;

        planner.trainings.forEach((section, index) => {
            const foundIndex = section.goals.findIndex(goal => goal.id === goalId);

            if (foundIndex > -1) {
                sectionIndex = index;
                goalIndex = foundIndex;
            }
        });

        if (sectionIndex !== null && goalIndex !== null) {
            planner.trainings[sectionIndex].goals.splice(goalIndex, 1);
        }

        return planner;
    }
}

const PlannerMethods = PlannerMethodsClass.getInstance();
export {
    PlannerMethods
}
