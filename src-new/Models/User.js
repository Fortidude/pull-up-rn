export class User {
    id;
    username;
    email;
    enabled;
    is_admin;
    is_enabled;
    first_form_finished;
    name;
    sex;
    avatar;
    created_at;
    updated_at;
    expires_at;
    days_per_circuit;
    days_left_circuit;
    planner_custom_mode;
    facebook_id;

    constructor(object) {
        if (typeof object === 'object') {
            Object.keys(object).forEach(key => this[key] = object[key]);
        }
    }
}
