import React from 'react';
import { Dispatch } from 'redux';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Styles from './SingleBar.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { TOP_BAR_SMALL_HEIGHT, BOTTOM_BAR_SMALL_HEIGHT } from '../SetBarChart.styles';
import { SetInterface } from 'src/models/Set';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

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

        this.style = Styles(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    render() {
        let valuePercent = this.props.set.value ? (this.props.set.value / this.props.maxValue) : 0;
        let weightPercent = this.props.set.weight ? (this.props.set.weight / this.props.maxWeight) : 0;

        const topBarStyle = [this.style.barSmall.topBar];
        if (this.props.active) {
            topBarStyle.push(this.style.barSmall.topBarActive);
            valuePercent += 0.10
        }

        return (
            <View style={this.style.barSmall.container}>
                <TouchableOpacity onPress={() => this.props.onClick(this.props.index)} style={[this.style.barSmall.topContainer]}>
                    <View style={[topBarStyle, { height: TOP_BAR_SMALL_HEIGHT * valuePercent }]}>
                        <Text adjustsFontSizeToFit style={this.style.barSmall.topBarText}>{this.props.set.value}</Text>
                    </View>
                </TouchableOpacity>
                <View style={[this.style.barSmall.bottomContainer, weightPercent === 0 && this.style.barSmall.bottomContainerInactive]}>
                    {weightPercent > 0 && <View style={[this.style.barSmall.bottomBar, { height: BOTTOM_BAR_SMALL_HEIGHT * weightPercent }]}>
                        <Text adjustsFontSizeToFit style={this.style.barSmall.bottomBarText}>{this.props.set.weight}</Text>
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
