import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Animated, Dimensions, Text, View } from 'react-native';
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
import Spinner from 'src/components/Spinner/Spinner';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    goal: Goal;
    goalInformationModalVisible: boolean;

    onClose: () => void;
};

interface State { 
    showChart: boolean;
}

const HEIGHT = Dimensions.get('window').height;
class GoalInformationContent extends React.Component<Props, State> {
    style: ThemeValueInterface;
    opacity = new Animated.Value(0);

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);
        this.state = {
            showChart: false
        }
    }

    componentDidMount() {
        if (this.props.goalInformationModalVisible) {
            this.emit(this.props);
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        const currentSetsLength = this.props.goal ? this.props.goal.sets.length : 0;
        const nextSetsLength = nextProps.goal ? nextProps.goal.sets.length : 0;

        return nextProps.goalInformationModalVisible !== this.props.goalInformationModalVisible
            || (nextProps.goal && this.props.goal && nextProps.goal.id !== this.props.goal.id)
            || nextState.showChart !== this.state.showChart
            || currentSetsLength !== nextSetsLength;
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
            this.setState({
                showChart: false
            });

            this.props.onClose();
        })
    }

    onLayout = () => {
        if (this.state.showChart) {
            return;
        }

        this.setState({
            showChart: true
        });
    }

    render() {
        if (!this.props.goal) {
            return null;
        }

        const { reps, weight, weightReps } = this.getHighest();
        return (
            <React.Fragment>
                <ModalHeader text={this.props.goal.exercise.name} textStyle={this.style.headerTitle} style={{ position: 'absolute', top: -45, opacity: this.opacity }} />
                <View onLayout={this.onLayout} style={this.style.content}>
                    <Text style={this.style.title}>{I18n.t('mics.exercise_variant')}: {this.props.goal.exercise.exerciseVariant.name || '-'}</Text>
                    <View style={{ position: 'absolute', left: 0, right: 0, bottom: 50 }}>
                        <View style={{ marginHorizontal: 20 }}>
                            <Text style={this.style.subtitle}>{I18n.t('mics.reps_record')}: {reps || '-'}</Text>
                            <Text style={this.style.subtitle}>{I18n.t('mics.weight_record')}: {weight || '-'} {!!weightReps ? `(x${weightReps})` : ''}</Text>
                        </View>
                        {this.state.showChart && <SetBarChart sets={this.props.goal.sets} big />}
                        {!this.state.showChart && <View style={this.style.chartLoaderContainer}><Spinner large/></View>}
                    </View>
                </View>
                <ModalFooter style={{ height: FOOTER_HEIGHT }} loading={false} successText={I18n.t('buttons.close')} onSuccess={this.onClose} />
            </React.Fragment>
        );
    }

    getHighest = () => {
        let reps = 0;
        let weight = 0;
        let weightReps = 0;

        this.props.goal.sets.forEach(set => {
            const setValue = set.value ? set.value : (set.reps || set.time)
            if (setValue && setValue > reps) {
                reps = setValue;
            }

            if (set.weight && set.weight > weight) {
                weight = set.weight;
                weightReps = setValue || 0;
            }
        });

        return {
            reps,
            weight,
            weightReps
        }
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    goal: state.planner.goalSelected,
    goalInformationModalVisible: state.modal.goalInformationModalVisible
});

export default connect(mapStateToProps)(GoalInformationContent);
