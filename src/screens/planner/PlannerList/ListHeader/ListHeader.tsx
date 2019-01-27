import React from 'react';
import { Dispatch } from 'redux';
import { Animated } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'src/assets/translations';

import Styles, { LIST_HEADER_HEIGHT } from './ListHeader.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import SingleFilterItem from './SingleFilterItem';
import { AppActions } from 'src/store/actions/app';
import { PlannerActions } from 'src/store/actions/planner';
import HapticFeedback from 'src/service/Haptic';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    finishedGoalsVisible: boolean;
    plannerEditMode: boolean;
}

class ListHeader extends React.Component<Props> {
    style: ThemeValueInterface;

    height = new Animated.Value(0);

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);

        this.animateHeight();
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    componentDidUpdate() {
        this.animateHeight();
    }

    isAnyFilterActivate = () => (
        !this.props.finishedGoalsVisible || this.props.plannerEditMode
    )

    animateHeight = () => {
        const isAnyFilterActivate = this.isAnyFilterActivate();
        Animated.timing(this.height, { toValue: isAnyFilterActivate ? LIST_HEADER_HEIGHT : 0 }).start();
    }

    toggleFinishedGoals = () => {
        HapticFeedback('selection');
        this.props.dispatch(PlannerActions.toggleFinishedGoals());
    }

    closeEdit = () => {
        HapticFeedback('selection');
        this.props.dispatch(AppActions.togglePlannerEdit(false));
    }

    render() {
        return (
            <Animated.View style={[this.style.container, { height: this.height }]}>
                <SingleFilterItem name={I18n.t('mics.hide_finished_goals')} show={!this.props.finishedGoalsVisible} onClose={this.toggleFinishedGoals}/>
                <SingleFilterItem name={I18n.t('mics.edit_mode')} show={this.props.plannerEditMode} onClose={this.closeEdit}/>
            </Animated.View>
        );
    }
}



const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,

    finishedGoalsVisible: state.planner.finishedGoalsVisible,
    plannerEditMode: state.app.plannerEditMode
});

export default connect(mapStateToProps)(ListHeader);
