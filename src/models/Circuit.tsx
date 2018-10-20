import User from "./User";
import moment = require("moment");

export interface CircuitInterface {
    id: string;
    user?: User;
    startAt: Date;
    endAt: Date;
    days: number;
    finished: boolean;
}

export default class Circuit implements CircuitInterface {
    id: string;
    user?: User;
    startAt: Date;
    endAt: Date;
    days: number;
    finished: boolean;

    constructor(data: any) {
        this.id = data.id;
        this.startAt = new Date(data.start_at);
        this.endAt = new Date(data.end_at);
        this.days = data.days;
        this.finished = data.finished;
        
        if (data.user) {
            this.user = new User(data);
        }
    }
}
