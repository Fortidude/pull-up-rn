class Events {
    private static instance: Events;
    events: { [key: string]: {[key: string]: (...any: any) => void} } = {};

    private constructor() { }
    static getInstance() {
        if (!Events.instance) {
            Events.instance = new Events();
        }
        return Events.instance;
    }

    listenTo = (event: string, uniqueKey: string, callback: (...any: any) => void) => {
        if (!this.events[event]) {
            this.events[event] = {};
        }
        
        this.events[event][uniqueKey] = (callback);
    }

    remove = (event: string, uniqueKey: string) => {
        delete this.events[event][uniqueKey];
    }

    emit = (event: string, ...arg: any) => {
        if (!this.events[event]) {
            return;
        }
        
        Object.keys(this.events[event]).forEach((uniqueKey) => {
            this.events[event][uniqueKey](...arg);
        })
    }
}

export default Events.getInstance();
