/** @format */

import { AppRegistry } from 'react-native';
import App from './src/App.tsx';
import { name as appName } from './app.json';

import { Client } from 'bugsnag-react-native';
const bugsnag = new Client("4ed1c99b054a23568928cdc1bef7e686");
global.bugsnag = bugsnag;

const consoleWarnFn = console.warn;
console.warn = (text) => {
    if (!text.includes('(ADVICE)')) {
        consoleWarnFn(text);
    };
};

AppRegistry.registerComponent(appName, () => App);
