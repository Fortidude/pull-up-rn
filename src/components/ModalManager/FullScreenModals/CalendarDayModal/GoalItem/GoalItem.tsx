import React from 'react';
import { Dispatch } from 'redux';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';

import Styles from './GoalItem.styles';
import IconComponent from './IconComponent';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';

import { OPEN_MODAL_ANIMATION_OPTION_SLOW, CLOSE_MODAL_ANIMATION_OPTION } from 'src/components/ModalManager/ModalManager';
import SetBarChart from 'src/components/Charts/SetBarChart/SetBarChart';

import Goal from 'src/models/Goal';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface

    goal: Goal;
}

interface State {
    toggled: boolean;
    listHeight: Animated.Value
}

class GoalItem extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            toggled: false,
            listHeight: new Animated.Value(0)
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    toggle = () => {
        const toggled = !this.state.toggled;
        const animateOption = toggled ? OPEN_MODAL_ANIMATION_OPTION_SLOW : CLOSE_MODAL_ANIMATION_OPTION;
        this.setState({ toggled }, () => {
            Animated.timing(this.state.listHeight, {
                toValue: toggled ? 144 : 0,
                ...animateOption
            }).start()
        });
    }

    render() {
        const bottomBorderColor = this.state.listHeight.interpolate({
            inputRange: [0, 144],
            outputRange: ['transparent', this.props.theme.borders.borderLightColor]
        });

        return (
            <Animated.View style={[this.style.container, {borderBottomColor: bottomBorderColor}]}>
                <TouchableOpacity onPress={this.toggle}  style={this.style.content.container}>
                    <View style={this.style.content.left.container}>
                        <Text style={this.style.content.left.name}>{this.props.goal.exercise.name}</Text>
                        {!!this.props.goal.exercise.exerciseVariant.name &&
                            <Text style={this.style.content.left.variant}>{this.props.goal.exercise.exerciseVariant.name}</Text>
                        }
                    </View>
                    <View style={this.style.content.right.container}>
                        <Text style={this.style.content.right.detailsText}>{this.props.goal.sets.length} set's</Text>
                    </View>
                    <View style={this.style.content.icon.container}>
                        <IconComponent active={this.state.toggled} />
                    </View>
                </TouchableOpacity>

                <Animated.View style={[this.style.setsList.container, { height: this.state.listHeight }]}>
                    <SetBarChart sets={this.props.goal.sets} maxHeight={144}/>
                </Animated.View>

            </Animated.View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(GoalItem);
