class Events {
    private static instance: Events;
    events: { [key: string]: {[key: string]: () => void} } = {};

    private constructor() { }
    static getInstance() {
        if (!Events.instance) {
            Events.instance = new Events();
        }
        return Events.instance;
    }

    listenTo = (event: string, uniqueKey: string, callback: () => void) => {
        if (!this.events[event]) {
            this.events[event] = {};
        }
        
        this.events[event][uniqueKey] = (callback);
    }

    remove = (event: string, uniqueKey: string) => {
        delete this.events[event][uniqueKey];
    }

    emit = (event: string) => {
        if (!this.events[event]) {
            return;
        }

        Object.keys(this.events[event]).forEach((uniqueKey) => {
            this.events[event][uniqueKey]();
        })
    }
}

export default Events.getInstance();
