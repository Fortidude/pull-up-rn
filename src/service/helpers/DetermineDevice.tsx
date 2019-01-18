import { Dimensions, Platform } from "react-native";

const { height, width } = Dimensions.get('window');
const isIphoneX = () => (Platform.OS === 'ios' && (height > 812 || width > 812));
const isSmallScreen = () => (height < 350) || (width < 350);

export default {
    isIphoneX,
    isSmallScreen
}
