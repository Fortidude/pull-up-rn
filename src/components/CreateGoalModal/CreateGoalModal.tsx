import React from 'react';
import { Dispatch } from 'redux';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import Styles from './CreateGoalModal.styles';
import { ThemeInterface, ThemeValueInterface } from '../../assets/themes';

import ModalFooter from '../ModalManager/ModalFooter';
import ModalHeader from '../ModalManager/ModalHeader';

import I18n from '../../assets/translations';

import { ModalActions } from '../../store/actions/modal';
import { PlannerActions } from '../../store/actions/planner';

import { Exercise, ExerciseVariant } from '../../models/Exercise';

import Input from '../Input';
import validate from './components/validate';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
}

interface State {
    name: string | null;
    description: string | null;
    exercise: Exercise | null;
    exerciseVariant: ExerciseVariant | null;
    type: "sets" | "reps" | "time" | null;
    requiredAmount: number | null;
}

class CreateGoalModal extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            name: null,
            description: null,
            exercise: null,
            exerciseVariant: null,
            type: 'sets',
            requiredAmount: null
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
        if (!validate(this.state)) {
            return;
        }
    }

    cancel = () => {
        this.props.dispatch(ModalActions.goalCreateClose());
    }

    render() {

        return (
            <View style={this.style.container}>
                <ModalHeader text={"Utwórz cel"} />
                <View style={this.style.content}>
                    <View style={this.style.textLine.container}>
                        <Text style={this.style.textLine.textLeft} numberOfLines={1}>Text</Text>

                    </View>
                    <View style={this.style.form.container}>
                        // NAME
                        <Text style={this.style.form.label}>Nazwa (t)</Text>
                        <Input small
                            keyboardType={"default"}
                            value={this.state.name ? this.state.name.toString() : undefined}
                            onChange={(value) => this.setState({ name: value })}
                        />

                        // EXERCISE
                        <Text style={this.style.form.label}>Cwiczenie (t)</Text>
                        <Input small
                            keyboardType={"numeric"}
                            value={this.state.exercise ? this.state.exercise.name : undefined}
                            onChange={(exercise) => this.setState({ exercise: this._findExerciseByName(exercise) })}
                        />
                    </View>
                </View>
                <ModalFooter
                    loading={false}
                    cancelText={I18n.t('buttons.cancel')}
                    onCancel={this.cancel}
                    successText={I18n.t('buttons.save')}
                    onSuccess={this.success} />
            </View>
        );
    }

    _findExerciseByName = (name: string) => {
        return null;
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    exercises: []
});

export default connect(mapStateToProps)(CreateGoalModal);
