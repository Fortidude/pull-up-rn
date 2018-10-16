class Events {
    private static instance: Events;
    events: { [key: string]: (() => void)[] } = {};

    private constructor() { }
    static getInstance() {
        if (!Events.instance) {
            Events.instance = new Events();
        }
        return Events.instance;
    }

    listenTo = (event: string, callback: () => void) => {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        
        this.events[event].push(callback);
    }

    emit = (event: string) => {
        if (!this.events[event]) {
            return;
        }

        this.events[event].forEach(callback => {
            callback();
        })
    }
}

export default Events.getInstance();
