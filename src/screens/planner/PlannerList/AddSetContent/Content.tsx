import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Text, View, TextInput, ScrollView, Keyboard } from 'react-native';
import moment from 'moment'
import I18n from 'src/assets/translations';

import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';

import Goal from 'src/models/Goal';

import getStyle from './Content.styles';
import Input from 'src/components/Input';
import DateTimeInput from 'src/components/DateTimeInput/DateTimeInput';
import Events from 'src/service/Events';
import { PlannerActions } from 'src/store/actions/planner';
import VerticalValueSlider from 'src/components/VerticalValueSlider/VerticalValueSlider';
import { ModalActions } from 'src/store/actions/modal';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    goal: Goal,
    createSetLoading: boolean;
    addSetModalVisible: boolean;
};

interface State {
    value: number | null;
    extraWeight: number | null;
    difficultyLevel: number;
    difficultyLevelSlider: number;
    date: Date;

    possibleSwappedWeightAndValueConfirmed: boolean;
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
            difficultyLevel: 2,
            difficultyLevelSlider: 2,
            date: new Date(),

            possibleSwappedWeightAndValueConfirmed: false
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return this.state.value !== nextState.value
            || this.state.extraWeight !== nextState.extraWeight
            || this.state.date !== nextState.date
            || this.state.difficultyLevel !== nextState.difficultyLevel
            || nextProps.addSetModalVisible !== this.props.addSetModalVisible;
    }

    componentDidMount() {
        if (this.props.goal) {
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
        if (props.goal) {
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
            difficultyLevel: 2,
            difficultyLevelSlider: 2,
            date: new Date(),

            possibleSwappedWeightAndValueConfirmed: false
        });
    }

    onCancel = () => {
        if (!this.props.goal) {
            return;
        }

        this.props.dispatch(PlannerActions.selectGoalToAddSet(null));
        Keyboard.dismiss();
    }

    onSuccess = () => {
        if (!this.state.value || this.props.createSetLoading || !this.props.goal) {
            return;
        }

        if (this._checkForPossibleSwappedWeightAndValue()) {
            Keyboard.dismiss();
            this.setState({ possibleSwappedWeightAndValueConfirmed: true });
            this.props.dispatch(ModalActions.informationOpen(I18n.t('warnings.attention'), I18n.t('warnings.possible_swap_weight_reps')));
            return;
        }

        this.props.dispatch(PlannerActions.selectGoalToAddSet(null));
        this.props.dispatch(PlannerActions.createSet(
            this.props.goal,
            this.state.value,
            this.state.extraWeight,
            this.state.difficultyLevel,
            moment.parseZone(this.state.date)
        ));

        this.clear();
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
                    scrollEnabled={false}
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
                        <Text style={this.style.textLine.textLeft} numberOfLines={1}>
                            {I18n.t('planner.difficultLevelTitle')}: {I18n.t(`planner.difficultLevels.${this.state.difficultyLevel}`)}
                        </Text>
                    </View>
                    <View style={this.style.form.container}>
                        <View style={this.style.form.leftSide}>
                            <Text style={this.style.form.label}>
                                {goal.requiredType === 'reps' && I18n.t(`fields.number_of_reps_done`)}
                                {goal.requiredType === 'sets' && I18n.t(`fields.number_of_reps_done`)}
                                {goal.requiredType === 'time' && I18n.t(`fields.number_of_required_time`)}
                            </Text>
                            <Input
                                medium
                                keyboardType={"numeric"}
                                inputRef={ref => this.addSetModalRepAmountRef = ref}
                                value={this.state.value ? this.state.value.toString() : ''}
                                onChange={(value) => this.setState({ value: parseInt(value), possibleSwappedWeightAndValueConfirmed: false })}
                            />

                            <Text style={this.style.form.label}>{I18n.t('fields.additional_weight')}</Text>
                            <Input
                                medium
                                keyboardType={"numeric"}
                                value={this.state.extraWeight ? this.state.extraWeight.toString() : undefined}
                                onChange={(extraWeight) => this.setState({ extraWeight: parseInt(extraWeight), possibleSwappedWeightAndValueConfirmed: false })}
                            />

                            <Text style={this.style.form.label}>{I18n.t('fields.date')}</Text>
                            <DateTimeInput
                                medium
                                date={this.state.date}
                                onChange={(date: Date) => { this.setState({ date }) }} />
                        </View>
                        <View style={this.style.form.rightSide}>
                            <VerticalValueSlider
                                max={3}
                                value={this.state.difficultyLevelSlider}
                                onChange={this._onSliderChange}
                            />
                        </View>
                    </View>
                </ScrollView>
            </React.Fragment>
        );
    }

    _onSliderChange = (difficultyLevelSlider: number) => {
        let difficultyLevel = difficultyLevelSlider;
        if (difficultyLevelSlider === 3) {
            difficultyLevel = 1;
        } else if (difficultyLevelSlider === 1) {
            difficultyLevel = 3;
        }

        if (difficultyLevelSlider !== this.state.difficultyLevelSlider) {
            this.setState({ difficultyLevel, difficultyLevelSlider })
        }
    }

    _checkForPossibleSwappedWeightAndValue = () => {
        if (this.state.possibleSwappedWeightAndValueConfirmed) {
            return false;
        }

        const lastSet = this.props.goal.sets[0];
        const weight = lastSet.weight || 0;
        const value = lastSet.value || lastSet.reps || lastSet.time || 0;

        if (this.state.extraWeight !== null
            && this.state.value !== null
            && this.state.value > this.state.extraWeight
            && this.props.goal.sets[0]) {

            if (weight > 0 && ((weight * 0.5) < this.state.value)) {
                return true;
            }

            if ((this.state.extraWeight * 0.5) < value) {
                return true;
            }
        }

        if (this.state.value && this.state.value > (value * 1.5)) {
            return true;
        }

        if (this.state.extraWeight && weight && this.state.extraWeight < weight * 0.4) {
            return true;
        }

        return false;
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    goal: state.planner.goalToAddSetSelected,
    addSetModalVisible: state.modal.addSetModalVisible,
    createSetLoading: state.planner.createSetLoading,
});

export default connect(mapStateToProps)(GoalCreateSetContent);
