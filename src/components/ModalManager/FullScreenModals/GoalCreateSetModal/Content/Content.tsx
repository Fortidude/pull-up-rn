import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Animated, Text, View, TextInput, ScrollView, Keyboard } from 'react-native';
import moment from 'moment'
import I18n from 'src/assets/translations';

import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';

import ModalFooter from 'src/components/ModalManager/ModalFooter/ModalFooter';
import ModalHeader from 'src/components/ModalManager/ModalHeader/ModalHeader';
import { FOOTER_HEIGHT } from 'src/components/FooterBar/FooterBar.styles';

import Set from 'src/models/Set';
import Goal from 'src/models/Goal';

import getStyle from './Content.styles';
import Input from 'src/components/Input';
import DateTimeInput from 'src/components/DateTimeInput/DateTimeInput';
import Events from 'src/service/Events';
import { ModalActions } from 'src/store/actions/modal';
import { PlannerActions } from 'src/store/actions/planner';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    goal: Goal,
    createSetLoading: boolean;
    addSetModalVisible: boolean;

    onClose: () => void;
};

interface State {
    value: number | null;
    extraWeight: number | null;
    date: Date;
}

class GoalCreateSetContent extends React.Component<Props, State> {
    style: ThemeValueInterface;
    addSetModalRepAmountRef: TextInput;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);

        this.state = {
            value: null,
            extraWeight: null,
            date: new Date()
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return this.state.value !== nextState.value
            || this.state.extraWeight !== nextState.extraWeight
            || this.state.date !== nextState.date
            || nextProps.addSetModalVisible !== this.props.addSetModalVisible;
    }

    componentDidMount() {
        if (this.props.addSetModalVisible) {
            this.emit(this.props);
        }

        Events.listenTo('HEADER_SAVE_CLICKED', 'GoalCreateSetContent', this.onSuccess);
        Events.listenTo('HEADER_CANCEL_CLICKED', 'GoalCreateSetContent', this.onCancel);
    }

    componentWillUnmount() {
        Events.remove('HEADER_SAVE_CLICKED', 'GoalCreateSetContent');
        Events.remove('HEADER_CANCEL_CLICKED', 'GoalCreateSetContent');
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }

        this.emit(nextProps);
    }

    emit = (props: Props) => {
        if (props.goal && props.addSetModalVisible) {
            console.log('goooo');
            Events.emit('HEADER_OVERWRITE_TITLE', '');
            Events.emit('FOOTER_BAR_CLOSE');
            Events.emit('FULLSCREEN_MODAL_VISIBLE');
            this.focusOnShowing();
        } else {
            Events.emit('HEADER_OVERWRITE_TITLE', null);
            Events.emit('FOOTER_BAR_OPEN');
            Events.emit('FULLSCREEN_MODAL_HIDDEN');
        }
    }

    focusOnShowing = () => {
        setTimeout(() => {
            if (this.addSetModalRepAmountRef) {
                this.addSetModalRepAmountRef.focus();
            }
        }, 200);
    }

    clear = () => {
        Keyboard.dismiss();
        this.setState({
            value: null,
            extraWeight: null,
            date: new Date()
        });
    }

    onCancel = () => {
        if (!this.props.addSetModalVisible) {
            return;
        }
        this.props.dispatch(ModalActions.addSetClose());
        this.props.dispatch(PlannerActions.selectGoal(null));
        this.props.onClose();
        Keyboard.dismiss();
    }

    onSuccess = () => {
        if (!this.state.value || this.props.createSetLoading || !this.props.addSetModalVisible) {
            return;
        }

        this.props.dispatch(PlannerActions.createSet(
            this.props.goal,
            this.state.value,
            this.state.extraWeight,
            moment.parseZone(this.state.date)
        ));

        this.clear();
        this.props.dispatch(PlannerActions.selectGoal(null));
        this.props.onClose();
    }

    render() {
        const goal = this.props.goal;
        if (!goal) {
            return null;
        }

        const exercise = goal.exercise;
        const variant = exercise.exerciseVariant || null;

        return (
            <React.Fragment>
                <ScrollView style={this.style.content}
                    onTouchStart={() => { Keyboard.dismiss() }}
                    keyboardShouldPersistTaps="always"
                >
                    <View style={this.style.textLine.container}>
                        {!!goal.requiredAmount && <Text style={this.style.textLine.textLeft} numberOfLines={1}>
                            {I18n.t('planner.done_of')}: {goal.doneThisCircuit} {I18n.t('mics.of')} {goal.requiredAmount}
                        </Text>}
                        {!goal.requiredAmount && <Text style={this.style.textLine.textLeft} numberOfLines={1}>
                            {I18n.t('planner.done_of')}: {goal.doneThisCircuit}
                        </Text>}
                        {variant &&
                            <Text style={this.style.textLine.textRight} numberOfLines={1}>{variant.name}</Text>
                        }
                    </View>
                    <View style={this.style.form.container}>
                        <Text style={this.style.form.label}>{I18n.t('fields.number_of_reps_done')}</Text>
                        <Input
                            medium
                            keyboardType={"numeric"}
                            inputRef={ref => this.addSetModalRepAmountRef = ref}
                            value={this.state.value ? this.state.value.toString() : ''}
                            onChange={(value) => this.setState({ value: parseInt(value) })}
                        />

                        <Text style={this.style.form.label}>{I18n.t('fields.additional_weight')}</Text>
                        <Input
                            medium
                            keyboardType={"numeric"}
                            value={this.state.extraWeight ? this.state.extraWeight.toString() : undefined}
                            onChange={(extraWeight) => this.setState({ extraWeight: parseInt(extraWeight) })}
                        />

                        <Text style={this.style.form.label}>{I18n.t('fields.date')}</Text>
                        <DateTimeInput
                            medium
                            date={this.state.date}
                            onChange={(date: Date) => { this.setState({ date }) }} />
                    </View>
                </ScrollView>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    goal: state.planner.goalSelected,
    addSetModalVisible: state.modal.addSetModalVisible,
    createSetLoading: state.planner.createSetLoading,
});

export default connect(mapStateToProps)(GoalCreateSetContent);
