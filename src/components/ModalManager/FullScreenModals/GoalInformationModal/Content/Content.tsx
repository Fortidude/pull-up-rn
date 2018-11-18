import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Animated, Text, View, ScrollView } from 'react-native';
import moment from 'moment'
import I18n from 'src/assets/translations';

import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';
import Goal from 'src/models/Goal';

import ModalFooter from 'src/components/ModalManager/ModalFooter/ModalFooter';
import ModalHeader from 'src/components/ModalManager/ModalHeader/ModalHeader';
import { FOOTER_HEIGHT } from 'src/components/FooterBar/FooterBar.styles';

import getStyle from './Content.styles';
import Events from 'src/service/Events';
import { PlannerActions } from 'src/store/actions/planner';
import { ModalActions } from 'src/store/actions/modal';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    goal: Goal;
    goalInformationModalVisible: boolean;

    onClose: () => void;
};

interface State { }

class GoalInformationContent extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }

        if (nextProps.goal && nextProps.goalInformationModalVisible) {
            Events.emit('HEADER_OVERWRITE_TITLE', '');
            Events.emit('FOOTER_BAR_CLOSE');
            Events.emit('GOAL_INFORMATION_MODAL_VISIBLE');
            Events.emit('FULLSCREEN_MODAL_VISIBLE');
        } else {
            Events.emit('HEADER_OVERWRITE_TITLE', null);
            Events.emit('FOOTER_BAR_OPEN');
            Events.emit('GOAL_INFORMATION_MODAL_HIDDEN');
            Events.emit('FULLSCREEN_MODAL_HIDDEN');
        }
    }

    onClose = () => {
        this.props.dispatch(ModalActions.goalInformationClose());
        this.props.dispatch(PlannerActions.selectGoal(null));
        this.props.onClose();
    }

    render() {
        return (
            <React.Fragment>
                <ModalHeader text={"Info"} />
                <View style={this.style.content}>

                </View>
                <ModalFooter style={{ height: FOOTER_HEIGHT }} loading={false} successText={I18n.t('buttons.close')} onSuccess={this.onClose} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    goal: state.planner.goalSelected,
    goalInformationModalVisible: state.modal.goalInformationModalVisible
});

export default connect(mapStateToProps)(GoalInformationContent);