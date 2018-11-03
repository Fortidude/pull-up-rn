import { Dimensions, Platform } from "react-native";

const { height, width } = Dimensions.get('window');

const isIphoneX = () => (Platform.OS === 'ios' && (height === 812 || width === 812));
const isSmallScreen = () => (height < 400) || (width < 400);

export default {
    isIphoneX,
    isSmallScreen
}
