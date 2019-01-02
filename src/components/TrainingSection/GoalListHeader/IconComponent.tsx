import React from 'react';
import { Animated, Easing } from 'react-native';
import { connect } from "react-redux";
import EvilIcon from 'react-native-vector-icons/EvilIcons';

import Styles from './GoalListHeader.styles';
import { ThemeInterface, ThemeValueInterface } from "../../../assets/themes";

interface Props {
    theme: ThemeInterface;
    active: boolean;
    plannerEditMode: boolean;
    plannerCustomMode: boolean;
};

interface State {
    spinValue: Animated.Value;
    scaleValue: Animated.Value
    iconPlus: boolean;
}

class IconComponent extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            spinValue: new Animated.Value(props.active ? 0 : 1),
            scaleValue: new Animated.Value(1),
            iconPlus: props.plannerEditMode
        }
    }

    componentDidMount() {
        if (this.props.plannerEditMode && this.props.plannerCustomMode) {
            Animated.timing(
                this.state.spinValue,
                {
                    toValue: 0.5,
                    duration: 150,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            ).start()
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        if (nextProps.plannerEditMode !== this.props.plannerEditMode) {
            this.animatePlus();
            return;
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
            this.setState({ iconPlus: !this.state.iconPlus }, () => {
                Animated.parallel([
                    Animated.timing(this.state.scaleValue,
                        {
                            toValue: 1,
                            duration: 75,
                            easing: Easing.linear,
                            useNativeDriver: true
                        }
                    ),
                    Animated.timing(this.state.spinValue,
                        {
                            toValue: this.state.iconPlus ? 0.5 : 0,
                            duration: 20,
                            easing: Easing.linear,
                            useNativeDriver: true
                        }
                    )
                ]).start();
            });
        });
    }

    render() {
        let spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "90deg"]
        })

        return (
            <Animated.View style={[this.style.toggleIcon, { transform: [{ rotate: spin }, { scaleX: this.state.scaleValue }] }]}>
                {!this.state.iconPlus && <EvilIcon
                    size={40}
                    color={this.props.active ? this.props.theme.colors.textColor : this.props.theme.colors.main}
                    name={"chevron-down"} />}
                {this.state.iconPlus && this.props.plannerCustomMode && <EvilIcon
                    size={20}
                    style={{ marginTop: 15, marginRight: 7 }}
                    color={this.props.theme.colors.main}
                    name={"close"} />}
            </Animated.View>
        )
    }
}

const mapStateToProps = (state: any) => ({
    theme: state.settings.theme,
    plannerEditMode: state.app.plannerEditMode,
    plannerCustomMode: state.user.current ? state.user.current.planner_custom_mode : false
});

export default connect(mapStateToProps)(IconComponent);
