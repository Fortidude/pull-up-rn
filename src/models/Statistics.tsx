export interface StatisticGoalInterface {
    id: string;
    achieved_amount: number;
    name: string;
    variant_name: string;
    section_name: string;
    percentage: number;
};

export interface StatisticsInterface {
    achieved_per_circuit: {
        [key: string]: {
            name: string;
            data: Array<number>
        }
    };
    goals_never_achieved: [];
    percent_goals_achieved: number;

    current_circle_percent_goals_achieved: number;
    current_circle_percentage_goals_achieved: {
        total_circuits: number;
        total_goals: number;
        goals: Array<StatisticGoalInterface>;
    };

    last_circle_percent_goals_achieved: number;
    last_circle_percentage_goals_achieved: {
        total_circuits: number;
        total_goals: number;
        goals: Array<StatisticGoalInterface>;
    };

    percentage_exercises_usage: {
        total: number;
        usage: Array<{
            amount: number;
            name: string;
            percentage: number;
        }>;
    };
    percentage_goals_achieved: {
        total_circuits: number;
        total_goals: number;
        goals: Array<StatisticGoalInterface>;
    };
    percentage_sets_usage: {
        total: number;
        usage: Array<{
            amount: number;
            done_value: number;
            name: string;
            percentage: number;
        }>;
    };
}
