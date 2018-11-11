import React from 'react';
import { Dispatch } from 'redux';
import { Text, View, TextInput } from 'react-native';
import { connect } from 'react-redux';

import Styles from './AddSetModal.styles';
import I18n from 'src/assets/translations';
import { ModalActions } from 'src/store/actions/modal';

import Goal from 'src/models/Goal';
import { PlannerActions } from 'src/store/actions/planner';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';

import ModalFooter from 'src/components/ModalManager/ModalFooter';
import ModalHeader from 'src/components/ModalManager/ModalHeader';
import Input from 'src/components/Input';
import DateTimeInput from 'src/components/DateTimeInput/DateTimeInput';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    createSetLoading: boolean;

    goal: Goal
    style?: any
}

interface State {
    value: number | null;
    extraWeight: number | null;
    date: Date;
}

class AddSetModal extends React.Component<Props, State> {
    style: ThemeValueInterface;
    addSetModalRepAmountRef: TextInput;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            value: null,
            extraWeight: null,
            date: new Date()
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    componentWillUnmount() {
        this.props.dispatch(PlannerActions.selectGoal(null));
    }

    componentDidMount() {
        setTimeout(() => {
            this.addSetModalRepAmountRef.focus();
        }, 200);
    }

    success = () => {
        if (!this.state.value || this.props.createSetLoading) {
            return;
        }

        this.props.dispatch(PlannerActions.createSet(
            this.props.goal,
            this.state.value,
            this.state.extraWeight,
            this.state.date
        ));
    }

    cancel = () => {
        this.props.dispatch(ModalActions.addSetClose());
    }

    render() {
        const goal = this.props.goal;
        const exercise = goal.exercise;
        const variant = exercise.exerciseVariant || null;

        return (
            <View style={[this.style.container, this.props.style]}>
                <ModalHeader text={exercise.name} />
                <View style={this.style.content}>
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
                        <Input small
                            keyboardType={"numeric"}
                            inputRef={ref => this.addSetModalRepAmountRef = ref}
                            value={this.state.value ? this.state.value.toString() : undefined}
                            onChange={(value) => this.setState({ value: parseInt(value) })}
                        />

                        <Text style={this.style.form.label}>{I18n.t('fields.additional_weight')}</Text>
                        <Input small
                            keyboardType={"numeric"}
                            value={this.state.extraWeight ? this.state.extraWeight.toString() : undefined}
                            onChange={(extraWeight) => this.setState({ extraWeight: parseInt(extraWeight) })}
                        />

                        <Text style={this.style.form.label}>{I18n.t('fields.date')}</Text>
                        <DateTimeInput date={this.state.date} onChange={(date: Date) => { this.setState({ date }) }} />
                    </View>
                </View>
                <ModalFooter
                    loading={this.props.createSetLoading}
                    cancelText={I18n.t('buttons.cancel')}
                    onCancel={this.cancel}
                    successText={I18n.t('buttons.add_set')}
                    onSuccess={this.success} />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    goal: state.planner.goalSelected,
    createSetLoading: state.planner.createSetLoading
});

export default connect(mapStateToProps)(AddSetModal);
