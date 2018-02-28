import { AsyncStorage, Image, NetInfo } from 'react-native';
import DataService from './data';

let QueueApiInstance = null;

class QueueApi {
    dataQueue = [];

    constructor() {
        if (!QueueApiInstance) {
            QueueApiInstance = this;
        }

        AsyncStorage.getItem('data_api_queue', (error, queue) => {
            let queueObject = JSON.parse(queue);
            if (queueObject !== null && typeof queueObject === 'object') {
                QueueApiInstance.dataQueue = queueObject;
            }

        });

        QueueApiInstance.connectionListener();
        return QueueApiInstance;
    }

    connectionListener() {
        NetInfo.isConnected.fetch().then(isConnected => {
            changed(isConnected);
        });

        function changed(isConnected) {
            if (isConnected) {
                QueueApiInstance.process();
            }
        }

        NetInfo.isConnected.addEventListener(
            'connectionChange',
            changed
        );
    }

    isSynchronized = () => QueueApiInstance.dataQueue.length === 0;

    addData(url, data, method) {
        QueueApiInstance.dataQueue.push({
            type: 'data',
            date: new Date(),

            url: url,
            data: data,
            method: method
        });

        AsyncStorage.setItem('data_api_queue', JSON.stringify(this.dataQueue));
    }

    process() {
        if (QueueApiInstance.dataQueue.length > 0) {
            QueueApiInstance._process();
        }
    }

    _processNext() {
        this.process();
    }

    _process() {
        let process = QueueApiInstance.dataQueue.shift();
        AsyncStorage.setItem('data_api_queue', JSON.stringify(QueueApiInstance.dataQueue));

        DataService._postFetchData(process.url, process.data, process.method)
            .then(() => {
                QueueApiInstance._processNext();
            });
    }
}

export default new QueueApi();
