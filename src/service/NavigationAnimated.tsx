import { Animated } from "react-native";

class NavigationAnimated {
    private static instance: NavigationAnimated;
    private interpolate: any;

    private constructor() { }
    static getInstance() {
        if (!NavigationAnimated.instance) {
            NavigationAnimated.instance = new NavigationAnimated();
        }
        return NavigationAnimated.instance;
    }

    setInterpolate = (interpolate: any) => {
    //    if (!this.interpolate) {
            this.interpolate = interpolate;
     //   }
    }

    getInterpolate = () => {
        return this.interpolate || new Animated.Value(1);
    }
}

export default NavigationAnimated.getInstance();