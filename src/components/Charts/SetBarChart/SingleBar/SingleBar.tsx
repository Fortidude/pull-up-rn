import React from 'react';
import { Dispatch } from 'redux';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Styles from './SingleBar.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { TOP_BAR_SMALL_HEIGHT, BOTTOM_BAR_SMALL_HEIGHT, TOP_BAR_BIG_HEIGHT, BOTTOM_BAR_BIG_HEIGHT, BAR_BIG_WIDTH, BAR_SMALL_WIDTH } from '../SetBarChart.styles';
import { SetInterface } from 'src/models/Set';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    isDayEnd?: boolean;
    big?: boolean;
    set: SetInterface;
    index: number;
    maxValue: number;
    maxWeight: number;

    onClick: (key: number) => void;
    active: boolean;
}

class SingleBar extends React.Component<Props> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme, this.props.big);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme, nextProps.big);
        }
    }

    render() {
        const setValue = this.props.set.value || this.props.set.reps || this.props.set.time || 0;

        let valuePercent = setValue ? (setValue / this.props.maxValue) : 0;
        let weightPercent = this.props.set.weight ? (this.props.set.weight / this.props.maxWeight) : 0;

        const topBarHeight = this.props.big ? TOP_BAR_BIG_HEIGHT : TOP_BAR_SMALL_HEIGHT;
        const bottomBarHeight = this.props.big ? BOTTOM_BAR_BIG_HEIGHT : BOTTOM_BAR_SMALL_HEIGHT;

        const topBarStyle = [this.style.topBar];
        if (this.props.active) {
            topBarStyle.push(this.style.topBarActive);
            valuePercent += 0.10
        }

        let difficiltyLevelBackgroundColor = 'transparent';
        const difficultyLevel = this.props.set.difficulty_level || this.props.set.difficultyLevel || 0;
        switch (difficultyLevel) {
            case 1: 
                difficiltyLevelBackgroundColor = this.props.theme.colors.difficultyOne;
                break;
            case 2: 
                difficiltyLevelBackgroundColor = this.props.theme.colors.difficultyTwo;
                break;
            case 3: 
                difficiltyLevelBackgroundColor = this.props.theme.colors.difficultyThree;
        }

        return (
            <View style={[this.style.container, this.props.isDayEnd && {marginLeft: 15}]}>
                <TouchableOpacity style={[this.style.topContainer]} onPress={() => this.props.onClick(this.props.index)}>
                    <View style={[topBarStyle, { height: topBarHeight * valuePercent }]}>
                        <Text adjustsFontSizeToFit style={this.style.topBarText}>{setValue}</Text>
                    </View>
                    <View style={[this.style.difficultyLevel, {backgroundColor: difficiltyLevelBackgroundColor}]}></View>
                </TouchableOpacity>
                <View style={[this.style.bottomContainer, weightPercent === 0 && this.style.bottomContainerInactive]}>
                    {weightPercent > 0 && <View style={[this.style.bottomBar, { height: bottomBarHeight * weightPercent }]}>
                        <Text adjustsFontSizeToFit style={this.style.bottomBarText}>{this.props.set.weight}</Text>
                    </View>}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(SingleBar);
