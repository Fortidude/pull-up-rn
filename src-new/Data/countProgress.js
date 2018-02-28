import { AsyncStorage } from 'react-native';

let CountProgressInstance = null;

class CountProgress {

    constructor() {
        if (!CountProgressInstance) {
            CountProgressInstance = this;
        }

        return CountProgressInstance;
    }

    countProgress(planner) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('progress_percent', (error, percent) => {
                if (percent) {
                    resolve(percent);
                } else {
                    let todo = 0;
                    let done = 0;
                    Object.keys(planner).forEach(key => {
                        planner[key].forEach(goal => {
                            if (goal.required_type !== 'none' && goal.required_amount > 0) {
                                todo += parseInt(goal.required_amount);

                                if (goal.done_this_circuit <= goal.required_amount) {
                                    done += parseInt(goal.done_this_circuit);
                                } else {
                                    done += parseInt(goal.required_amount)
                                }
                            }
                        })
                    });

                    if (todo === 0) {
                        resolve(false);
                    }

                    const result = Math.round((done / todo) * 100);
                    if (isNaN(result)) {
                        resolve(0);
                        return;
                    }

                    resolve(result);
                }
            });
        });
    }
}

export default new CountProgress();
