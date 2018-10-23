import React from 'react';
import { Animated, Easing } from 'react-native';
import { connect } from "react-redux";
import EvilIcon from 'react-native-vector-icons/EvilIcons';

import Styles from './GoalItem.styles';
import { ThemeInterface, ThemeValueInterface } from "src/assets/themes";

interface Props {
    theme: ThemeInterface;
    active: boolean;
};

interface State {
    spinValue: Animated.Value;
    scaleValue: Animated.Value
}

class IconComponent extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            spinValue: new Animated.Value(props.active ? 0 : 1),
            scaleValue: new Animated.Value(1),
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        if (nextProps.active !== this.props.active) {
            this.animateToggle();
        }
    }

    animateToggle() {
        Animated.timing(
            this.state.spinValue,
            {
                toValue: this.props.active ? 1 : 0,
                duration: 150,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start()
    }

    animatePlus() {
        Animated.parallel([
            Animated.timing(this.state.scaleValue,
                {
                    toValue: this.props.active ? 0 : 1,
                    duration: 75,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            )
        ]).start(() => {
            Animated.timing(this.state.scaleValue,
                {
                    toValue: 1,
                    duration: 75,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            ).start();
        });
    }

    render() {
        let spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "90deg"]
        })

        return (
            <Animated.View style={[this.style.toggleIcon, { transform: [{ rotate: spin }, { scaleX: this.state.scaleValue }] }]}>
                <EvilIcon
                    size={40}
                    color={this.props.active ? this.props.theme.colors.textColor : this.props.theme.colors.main}
                    name={"chevron-down"} />
            </Animated.View>
        )
    }
}

const mapStateToProps = (state: any) => ({
    theme: state.settings.theme
});

export default connect(mapStateToProps)(IconComponent);
