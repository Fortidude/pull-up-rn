import moment from 'moment';
import { Animated } from 'react-native';

interface CalendarInterface {

}

class Calendar implements CalendarInterface {
    private static instance: Calendar;

    private months: moment.Moment[] = [];
    private currentMonthIndex: number = 0;

    public swipePosition = new Animated.Value(0);

    private constructor() { }
    static getInstance() {
        if (!Calendar.instance) {
            Calendar.instance = new Calendar();
        }
        return Calendar.instance;
    }

    getMonthsList = () => {
        if (this.months.length > 0 && this.currentMonthIndex > 0) {
            return {
                months: this.months,
                currentMonthIndex: this.currentMonthIndex
            };
        }

        const nowFormatted = moment().format('MY');
        const fromDate = moment().subtract(1, 'years');
        const toDate = moment().add(1, 'years');

        let iteration = 1;
        for (let date = fromDate; date <= toDate; date.add(1, 'month')) {
            let momentDate = moment(date)
            this.months.push(momentDate);

            if (date.format('MY') === nowFormatted) {
                this.currentMonthIndex = iteration - 1;
            }

            iteration++;
        }

        return {
            months: this.months,
            currentMonthIndex: this.currentMonthIndex
        };
    }
}

export default Calendar.getInstance();
