import React from 'react';
import { Animated, View } from 'react-native';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';

import Styles from './GoalItem.styles';
import { connect } from 'react-redux';

//@ts-ignore
import AwesomeIcon from 'react-native-vector-icons/AntDesign';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

interface Props {
    theme: ThemeInterface;
    visibleAnimation: Animated.Value;
    summaryContentTranslateY: Animated.Value;
}

interface State {
    closeIcon: boolean;
}

class GoalItemAddSet extends React.Component<Props, State> {
    style: ThemeValueInterface;

    listenerId: string;
    switchingIcons = false;
    contentScaleY = new Animated.Value(0);

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            closeIcon: true
        }

        this.listenerId = this.props.visibleAnimation.addListener(event => {
            if (event.value > 0.7 && !this.switchingIcons && this.state.closeIcon) {
                this.switchingIcons = true;
                this.setState({ closeIcon: false }, () => this.switchingIcons = false);
            } else if (event.value < 0.7 && !this.switchingIcons && !this.state.closeIcon) {
                this.switchingIcons = true;
                this.setState({ closeIcon: true }, () => this.switchingIcons = false);
            }
        })
    }

    componentWillUnmount() {
        this.props.visibleAnimation.removeListener(this.listenerId);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    render() {
        const iconOpacity = this.props.visibleAnimation.interpolate({
            inputRange: [0, 0.4, 0.7, 1, 1],
            outputRange: [1, 1, 0, 1, 1]
        })

        const rotate = this.props.visibleAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['45deg', '0deg']
        })

        return (
            <Animated.View style={[this.style.mockContainer, { transform: [{ translateY: this.props.summaryContentTranslateY }] }]}>
                <View style={this.style.exerciseContainer}>
                    <Animated.View style={this.style.plusIconContainer}>
                        <Animated.View style={[this.style.mockPlusIconView, { opacity: iconOpacity, transform: [{ rotate }] }]}>
                            {!this.state.closeIcon && <AwesomeIcon brand name="edit" color={this.props.theme.colors.textColor} size={30} />}
                            {this.state.closeIcon && <EvilIcon name="close" color={this.props.theme.colors.main} size={42} />}
                        </Animated.View>
                    </Animated.View>
                    {this.props.children}
                </View>
            </Animated.View>
        )
    }
}

const mapStateToProps = (state: any) => ({
    theme: state.settings.theme,
});

export default connect(mapStateToProps)(GoalItemAddSet);
