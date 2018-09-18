import React from 'react';
import { Dispatch } from 'redux';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import Styles from './AddSetModal.styles';
import { ThemeInterface, ThemeValueInterface } from '../../assets/themes';
import ModalFooter from '../ModalManager/ModalFooter';
import { ModalActions } from '../../store/actions/modal';
import ModalHeader from '../ModalManager/ModalHeader';
import I18n from '../../assets/translations';
import { PlannerActions } from '../../store/actions/planner';
import Goal from '../../models/Goal';
import Input from '../Input';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    createSetLoading: boolean;

    goal: Goal
}

interface State {
    value: number | null;
    extraWeight: number | null;
}

class AddSetModal extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            value: null,
            extraWeight: null
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

    success = () => {
        if (!this.state.value || this.props.createSetLoading) {
            return;
        }

        this.props.dispatch(PlannerActions.createSet(this.props.goal, this.state.value, this.state.extraWeight));
    }

    cancel = () => {
        this.props.dispatch(ModalActions.addSetClose());
    }

    render() {
        const goal = this.props.goal;
        const exercise = goal.exercise;
        const variant = exercise.exerciseVariant || null;

        return (
            <View style={this.style.container}>
                <ModalHeader text={exercise.name} />
                <View style={this.style.content}>
                    <View style={this.style.textLine.container}>
                        <Text style={this.style.textLine.textLeft} numberOfLines={1}>{I18n.t('planner.done_of')}: {goal.doneThisCircuit} {I18n.t('mics.of')} {goal.requiredAmount}</Text>
                        {variant &&
                            <Text style={this.style.textLine.textRight} numberOfLines={1}>{variant.name}</Text>
                        }
                    </View>
                    <View style={this.style.form.container}>
                        <Text style={this.style.form.label}>{I18n.t('fields.number_of_reps_done')}</Text>
                        <Input small
                            keyboardType={"numeric"}
                            value={this.state.value ? this.state.value.toString() : undefined}
                            onChange={(value) => this.setState({ value: parseInt(value) })}
                        />

                        <Text style={this.style.form.label}>{I18n.t('fields.additional_weight')}</Text>
                        <Input small
                            keyboardType={"numeric"}
                            value={this.state.extraWeight ? this.state.extraWeight.toString() : undefined}
                            onChange={(extraWeight) => this.setState({ extraWeight: parseInt(extraWeight) })}
                        />
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
