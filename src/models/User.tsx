import moment from 'moment';
import Circuit from './Circuit';

interface User {
    [key: string]: any
}

class User implements User {
    id: string;
    username: string;
    email: string;
    enabled: boolean;
    is_admin: boolean;
    is_enabled: boolean;
    current_circuit: Circuit | null;
    first_form_finished: boolean;
    days_left_circuit: number;
    current_circuit_expired_date: Date;
    name: string;
    sex: string;
    created_at: string;
    updated_at: string;
    expires_at: string;
    days_per_circuit: number;
    planner_custom_mode: boolean;
    facebook_id: string;
    avatar: string;

    constructor(data: Object) {
        console.log(data);
        for (let [key, value] of Object.entries(data)) {
            this[key] = value;
        }
    }
}

const getCircuitLeftData = (user: User): { percent: number; days: number; text: string } => {

    const expiredDate = moment(user.current_circuit_expired_date);
    const text = expiredDate.endOf('day').fromNow();
    const daysLeft = expiredDate.diff(moment(), 'days');

    const daysPerCircuit = user.days_per_circuit;
    let percent = Math.round(((daysPerCircuit - (daysLeft)) / daysPerCircuit) * 100);
    percent !== 100 ? percent : 100;

    return {
        text: text,
        days: daysLeft,
        percent: percent
    }
}

export default User;
export {
    getCircuitLeftData
}
