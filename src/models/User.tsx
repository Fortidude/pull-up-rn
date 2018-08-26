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
    first_form_finished: boolean;
    days_left_circuit: number;
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
        for (let [key, value] of Object.entries(data)) {
            this[key] = value;
        }
    }
}

export default User;
