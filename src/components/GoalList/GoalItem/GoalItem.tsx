import React from 'react';
import { Dispatch } from 'redux';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Styles from './GoalItem.styles';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import Goal from '../../../models/Goal';
import SwipeItem from '../../SwipeItem';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    plannerEditMode: boolean;

    goal: Goal;

    isToggled: boolean;
    toggleParentScroll?: (enable: boolean) => void,
}

class ExerciseItem extends React.Component<Props> {
    style: ThemeValueInterface;
    scrolling: boolean;
    swipeItemPosition = new Animated.Value(0);

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
    }

    componentDidMount() {
        this.refs.swipeItem.getSwipePosition().addListener(({ value }) => {
            this.swipeItemPosition.setValue(value);
        });
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        if (nextProps.plannerEditMode && !this.props.plannerEditMode) {
            setTimeout(() => {
                this.refs.swipeItem.forceOpenRight();
            }, this.props.isToggled ? 0 : 300);
        } else if (!nextProps.plannerEditMode && this.props.plannerEditMode) {
            this.refs.swipeItem.forceClose();
        }
    }

    render() {
        const rightButtons = [
            <TouchableOpacity style={[this.style.buttonReorderContainer]}>
                <Icon name="exchange-alt" solid={true} style={this.style.iconReorder} />
            </TouchableOpacity>,
            <TouchableOpacity style={[this.style.buttonRemoveContainer]}>
                <Icon name="trash-alt" solid={true} style={this.style.iconRemove} />
            </TouchableOpacity>
        ];

        const summaryContentLeft = this.swipeItemPosition.interpolate({
            inputRange: [-100, 0],
            outputRange: [50, 0],
            extrapolateLeft: 'extend',
            extrapolateRight: 'clamp'
        });

        const opacityContentRight = this.swipeItemPosition.interpolate({
            inputRange: [-140, -100, 0],
            outputRange: [0.2, 0.5, 1],
            extrapolate: 'clamp'
        });

        return (
            <SwipeItem style={this.style.swipeout}
                ref={'swipeItem'}
                rightButtons={rightButtons}
                onMoveBegin={() => this.props.toggleParentScroll ? this.props.toggleParentScroll(false) : null}
                onMoveEnd={() => this.props.toggleParentScroll ? this.props.toggleParentScroll(true) : null}
            >
                <View style={this.style.exerciseContainer}>
                    <TouchableOpacity style={this.style.plusIconContainer}>
                        <View style={this.style.plusIconView}>
                            <EvilIcon name="close" color={this.props.theme.colors.main} size={42} />
                        </View>
                    </TouchableOpacity>
                    <View style={this.style.summaryContent}>
                        <Animated.View style={[this.style.summaryLeftContent, { left: summaryContentLeft }]}>
                            <Text style={this.style.title}>{this.props.goal.exercise.name}</Text>
                            <Text style={this.style.subTitle}>Weight / Sets</Text>
                        </Animated.View>
                        <Animated.View style={[this.style.summaryRightContent, { opacity: opacityContentRight }]}>
                            <Text style={this.style.infoTitleTop}>Typ: 5x5</Text>
                            <Text style={this.style.infoTitleBottom}>Brakuje: 2 sety</Text>
                        </Animated.View>
                    </View>
                </View>
            </SwipeItem>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    plannerEditMode: state.app.plannerEditMode
});

export default connect(mapStateToProps)(ExerciseItem);
