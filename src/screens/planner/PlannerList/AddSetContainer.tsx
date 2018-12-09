import React from 'react';
import { Animated } from 'react-native';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';

import Styles from './AddSetContainer.styles';
import { connect } from 'react-redux';

import Goal from 'src/models/Goal';
import { Dispatch } from 'redux';

import Content from './AddSetContent';


interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    goalToAddSetSelected: Goal | null;
}

interface State {
    visible: boolean;
}

class AddSetContainer extends React.Component<Props, State> {
    style: ThemeValueInterface;

    visible = new Animated.Value(0);

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            visible: false
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        if (!nextProps.goalToAddSetSelected && this.props.goalToAddSetSelected) {
            Animated.timing(this.visible, {
                toValue: 0,
                duration: 400
            }).start(() => this.setState({ visible: false }));
        } else if (nextProps.goalToAddSetSelected && (!this.props.goalToAddSetSelected || nextProps.goalToAddSetSelected.id !== this.props.goalToAddSetSelected.id || !this.state.visible)) {
            setTimeout(() => {
                this.setState({ visible: true }, () => {
                    Animated.timing(this.visible, {
                        toValue: 1,
                        duration: 400
                    }).start();
                });
            }, 200);
        }
    }

    render() {
        if (!this.state.visible) {
            return null;
        }

        const translateY = this.visible.interpolate({
            inputRange: [0, 1],
            outputRange: [-1000, 0]
        })

        return (
            <Animated.View style={[this.style.container, { opacity: this.visible }]}>
                <Animated.View style={[this.style.innerContainer, { transform: [{ translateY }] }]}>
                    <Content />
                </Animated.View>
            </Animated.View>
        )
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    goalToAddSetSelected: state.planner.goalToAddSetSelected
});

export default connect(mapStateToProps)(AddSetContainer);
