import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Animated, Dimensions, Text, View } from 'react-native';
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
import SetBarChart from 'src/components/Charts/SetBarChart/SetBarChart';
import { sortSetsByDateFromSmall, sortSetsByDate } from 'src/models/Set';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    goal: Goal;
    goalInformationModalVisible: boolean;

    onClose: () => void;
};

interface State { }

const HEIGHT = Dimensions.get('window').height;
class GoalInformationContent extends React.Component<Props, State> {
    style: ThemeValueInterface;
    opacity = new Animated.Value(0);

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);
    }

    componentDidMount() {
        if (this.props.goalInformationModalVisible) {
            this.emit(this.props);
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return nextProps.goalInformationModalVisible !== this.props.goalInformationModalVisible;
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }

        this.emit(nextProps);
    }

    emit = (props: Props) => {
        if (props.goal && props.goalInformationModalVisible) {
            Animated.timing(this.opacity, {
                toValue: 1,
                duration: 0
            }).start();
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
        Animated.timing(this.opacity, {
            toValue: 0,
            duration: 100
        }).start(() => {
            this.props.dispatch(ModalActions.goalInformationClose());
            this.props.dispatch(PlannerActions.selectGoal(null));
            this.props.onClose();
        })
    }

    render() {
        return (
            <React.Fragment>
                <ModalHeader text={this.props.goal.exercise.name} style={{ position: 'absolute', top: -45, opacity: this.opacity }} />
                <View style={this.style.content}>
                    <Text style={this.style.subtitle}>Wariant: {this.props.goal.exercise.exerciseVariant.name || '-'}</Text>

                    <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
                        <SetBarChart sets={this.props.goal.sets} big/>
                    </View>
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
