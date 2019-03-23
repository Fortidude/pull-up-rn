import I18n from "react-native-i18n";

import PL from './pl';
import EN from './en';

export const locales:{[key: string]: string} = {
    en: "English",
    pl: "Polski"
}

let translations = {
    pl: PL,
    en: EN
};

I18n.fallbacks = true;
I18n.translations = translations;

export default I18n;
