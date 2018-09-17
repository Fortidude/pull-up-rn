/** @format */

import { AppRegistry } from 'react-native';
import App from './src/App.tsx';
import { name as appName } from './app.json';

const consoleWarnFn = console.warn;
console.warn = (text) => {
    if (!text.includes('(ADVICE)')) {
        consoleWarnFn(text);
    };
};

AppRegistry.registerComponent(appName, () => App);
