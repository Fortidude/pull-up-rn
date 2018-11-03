import React from 'react';
import { Dispatch } from 'redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import I18n from 'src/assets/translations';
import Styles from './Header.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import Select from 'src/components/Select/Select';
import CircleProgress from 'src/components/CircleProgress/CircleProgress';
import { StatisticsInterface } from 'src/models/Statistics';
import { CircuitType } from '../Effectiveness';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    statistics: StatisticsInterface;

    circuitsOptions: string[];
    circuitsOptionsTranslated: string[];

    circuit: CircuitType;
    sortBy: 'a-z' | 'percent';

    toggleSort: () => void;
    changeCircuit: (circuit: CircuitType) => void;
}

interface Stats { }

class Header extends React.Component<Props, Stats> {
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

    _getPercentBySelectedCircuit = (): number => {
        switch (this.props.circuit) {
            case 'all':
                return this.props.statistics.percent_goals_achieved;
            case 'previous':
                return this.props.statistics.last_circle_percent_goals_achieved;
            case 'current':
                return this.props.statistics.current_circle_percent_goals_achieved;
        }

        return 0;
    }

    changeCircuit = (circuit: string) => {
        const indexOf = this.props.circuitsOptionsTranslated.indexOf(circuit);
        circuit = this.props.circuitsOptions[indexOf];

        if (!["current", "previous", "all"].includes(circuit)) {
            throw new Error(`INVALID CIRCUIT SELECTED. ${circuit}`);
        }

        //@ts-ignore
        this.props.changeCircuit(circuit);
    }

    render() {
        const selectTextStyles = [this.style.buttons.buttonText, this.style.buttons.buttonTextActive];
        const sortTextStylesAZ = [this.style.buttons.buttonText];
        const sortTextStylesPercent = [this.style.buttons.buttonText];

        if (this.props.sortBy === 'a-z') {
            sortTextStylesAZ.push(this.style.buttons.buttonTextActive);
            sortTextStylesAZ.push({ fontWeight: '500' });
        } else {
            sortTextStylesPercent.push(this.style.buttons.buttonTextActive);
            sortTextStylesPercent.push({ fontWeight: '500' });
        }

        return (
            <View style={this.style.container}>
                <View style={this.style.right}>
                    <Text style={this.style.title} numberOfLines={3}>{I18n.t('statistics.effectiveness.title')}</Text>
                    <View style={this.style.buttons.container}>
                        <View style={[this.style.buttons.buttonContainer, { marginRight: 7.5 }]}>
                            <Text style={this.style.buttons.buttonLabel}>{I18n.t('statistics.circuit')}</Text>
                            <Select small
                                autoSize
                                value={I18n.t(`planner.circuits.${this.props.circuit}`)}
                                onChange={(value) => this.changeCircuit(value)} options={this.props.circuitsOptionsTranslated}
                                textStyle={selectTextStyles}
                                containerStyle={this.style.buttons.button}
                            />
                        </View>

                        <View style={[this.style.buttons.buttonContainer, { marginLeft: 7.5 }]}>
                            <Text style={this.style.buttons.buttonLabel}>{I18n.t('statistics.sort')}</Text>
                            <TouchableOpacity
                                onPress={this.props.toggleSort}
                                style={[this.style.buttons.button]}>
                                <Text style={sortTextStylesAZ}>A-Z</Text>
                                <Text style={[this.style.buttons.buttonText, { marginHorizontal: 3 }]}>/</Text>
                                <Text style={sortTextStylesPercent}>%</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={this.style.left}>
                    <CircleProgress fill={this._getPercentBySelectedCircuit()} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    statistics: state.planner.statistics
});

export default connect(mapStateToProps)(Header);
