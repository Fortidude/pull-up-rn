/**
 * Mock fetch method
 */
global.fetch = require('jest-fetch-mock');

/**
 * Mock AsyncStorage mthod
 */
export default class MockStorage {
    constructor(cache = {}) {
        this.storageCache = cache;
    }

    setItem = jest.fn((key, value) => {
        return new Promise((resolve, reject) => {
            return (typeof key !== 'string' || typeof value !== 'string')
                ? reject(new Error('key and value must be string'))
                : resolve(this.storageCache[key] = value);
        });
    });

    getItem = jest.fn((key, callback) => {
        return new Promise((resolve) => {
            const value = this.storageCache.hasOwnProperty(key)
            if (callback) {
                callback(null, this.storageCache[key]);
            }

            resolve(value ? this.storageCache[key] : null);
        });
    });

    removeItem = jest.fn((key) => {
        return new Promise((resolve, reject) => {
            return this.storageCache.hasOwnProperty(key)
                ? resolve(delete this.storageCache[key])
                : reject('No such key!');
        });
    });

    clear = jest.fn((key) => {
        return new Promise((resolve, reject) => resolve(this.storageCache = {}));
    });

    getAllKeys = jest.fn((key) => {
        return new Promise((resolve, reject) => resolve(Object.keys(this.storageCache)));
    });
}


const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);

jest.setMock('AsyncStorage', AsyncStorage)
