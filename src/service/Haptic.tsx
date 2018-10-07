import { Platform } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

type types =
    | "selection"
    | "impactLight"
    | "impactMedium"
    | "impactHeavy"
    | "notificationSuccess"
    | "notificationWarning"
    | "notificationError";

export default (type: types) => {
    if (Platform.OS === 'ios') {
        ReactNativeHapticFeedback.trigger(type, false);
    }
}