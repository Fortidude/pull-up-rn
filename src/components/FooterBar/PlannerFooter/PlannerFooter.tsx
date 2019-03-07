import React from 'react';
import { Dispatch } from 'redux';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Styles from './PlannerFooter.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import Button from 'src/components/FooterBar/Button';
import Avatar from 'src/components/FooterBar/Avatar';
import { NavigationActions } from 'react-navigation';
import PlannerFab from 'src/components/PlannerFab/PlannerFab';

interface Props {
    onLayout?: () => void;
    dispatch: Dispatch;
    theme: ThemeInterface;
    plannerEditMode: boolean;
    isEmpty: boolean;

    onRef: (any: any) => any;
}

class PlannerFooter extends React.Component<Props> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    goToStatsScreen = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'EffectivenessStats' }));
    }

    goToCalendar = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Calendar' }));
    }

    goToCardio = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Cardio' }));
    }

    render() {
        return (
            <View style={this.style.container} onLayout={this.props.onLayout}>
                <Button iconName="list" text="Planer" isActive />
                <Button onPress={this.goToCalendar} iconName="calendar-alt" text="Kalendarz" />

                <Avatar />

                <Button onPress={this.goToCardio} iconName="stopwatch" text="Cardio" />
                <Button onPress={this.goToStatsScreen} iconName="chart-bar" text="Statystyki" />

                <View style={{ position: 'absolute', right: 0, top: -90 }}>
                    {!this.props.isEmpty && <PlannerFab />}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    plannerEditMode: state.app.plannerEditMode,
    isEmpty: !state.planner.planner || !state.planner.planner.trainings || state.planner.planner.trainings.length == 0
});

export default connect(mapStateToProps)(PlannerFooter);
