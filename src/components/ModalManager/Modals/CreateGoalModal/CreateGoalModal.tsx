import React from 'react';
import { Dispatch } from 'redux';
import { Text, View, Switch } from 'react-native';
import { connect } from 'react-redux';

import Styles from './CreateGoalModal.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';

import ModalFooter from 'src/components/ModalManager/ModalFooter';
import ModalHeader from 'src/components/ModalManager/ModalHeader';

import I18n from 'src/assets/translations';

import { ModalActions } from 'src/store/actions/modal';
import { PlannerActions } from 'src/store/actions/planner';

import { Exercise, ExerciseVariant } from 'src/models/Exercise';

import Input from 'src/components/Input';
import Select from 'src/components/Select';
import validate, { validateType } from './components/validate';

type GoalType = "sets" | "reps" | "time" | null;

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    exercises: Exercise[];
}

interface State {
    name: string | null;
    description: string | null;
    exercise: Exercise | null;
    exerciseVariant: ExerciseVariant | null;
    type: GoalType;
    requiredAmount: number | null;
    typeWithAI: boolean;
}

class CreateGoalModal extends React.Component<Props, State> {
    style: ThemeValueInterface;

    private NONE_TYPE_NANE = 'None';

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            name: null,
            description: null,
            exercise: null,
            exerciseVariant: null,
            type: null,
            requiredAmount: null,

            typeWithAI: false
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

    pickExercise = (exerciseName: string) => {
        this.setState({ exercise: this._findExerciseByName(exerciseName), exerciseVariant: null });
    }

    getExerciseVariantOptions = () => this.state.exercise ? this.state.exercise.exerciseVariants.map(exercise => exercise.name) : [];
    pickExerciseVariant = (exerciseVariantName: string) => {
        this.setState({ exerciseVariant: this._fintExerciseVariantByName(exerciseVariantName) });
    }

    pickType = (type: GoalType | string) => {
        console.log(type, validateType(type));
        if (type === this.NONE_TYPE_NANE || !validateType(type)) {
            this.setState({ type: null, typeWithAI: false });
            return;
        }

        //@ts-ignore
        this.setState({ type: type, typeWithAI: true });
    }

    render() {
        return (
            <View style={this.style.container}>
                <ModalHeader text={"Utwórz cel"} />
                <View style={this.style.content}>
                    <View style={this.style.textLine.container}>
                        <Text style={this.style.textLine.textLeft} numberOfLines={1}>Trening: @TODO</Text>

                    </View>
                    <View style={this.style.form.container}>
                        {/* // NAME */}
                        {/* <Text style={this.style.form.label}>Nazwa (t)</Text>
                        <Input small
                            keyboardType={"default"}
                            placeholder={"Podaj nazwę swojego celu"}
                            value={this.state.name ? this.state.name.toString() : undefined}
                            onChange={(value) => this.setState({ name: value })}
                        /> */}

                        {/* // EXERCISE */}
                        <Text style={this.style.form.label}>Cwiczenie (t)</Text>
                        <Select small
                            placeholder="Brak"
                            onChange={this.pickExercise}
                            value={this.state.exercise ? this.state.exercise.name : undefined}
                            options={this.props.exercises ? this.props.exercises.map(exercise => exercise.name) : []}
                        />

                        {/* // EXERCISE VARIANT */}
                        <View style={{ opacity: this.state.exercise ? 1 : 0.3 }}>
                            <Text style={this.style.form.label}>Cwiczenie wariant (t)</Text>
                            <Select small
                                disabled={!this.state.exercise}
                                placeholder={!this.state.exercise ? "Musisz wybrać ćwiczenie" : "Brak"}
                                onChange={this.pickExerciseVariant}
                                value={this.state.exerciseVariant ? this.state.exerciseVariant.name : undefined}
                                options={['Brak', ...this.getExerciseVariantOptions()]}
                            />
                        </View>

                        {/* // TYPE */}
                        <View style={{ opacity: this.state.exercise ? 1 : 0.3 }}>
                            <Text style={this.style.form.label}>Typ celu (t)</Text>
                            <Select small
                                disabled={!this.state.exercise}
                                placeholder={!this.state.exercise ? "Musisz wybrać ćwiczenie" : this.NONE_TYPE_NANE}
                                onChange={this.pickType}
                                value={this.state.type || undefined}
                                options={[this.NONE_TYPE_NANE, 'Sets', 'Reps', 'Time']}
                            />
                        </View>

                        {/* // REQUIRED AMOUNT */}
                        <View style={{ opacity: this.state.type ? 1 : 0.3 }}>
                            <Text style={this.style.form.label}>Ilość (t)</Text>
                            <Input small
                                disabled={!this.state.type}
                                keyboardType={"numeric"}
                                placeholder={"Podaj wymaganą ilość"}
                                value={this.state.requiredAmount ? this.state.requiredAmount.toString() : undefined}
                                onChange={(value) => this.setState({ requiredAmount: parseInt(value) })}
                            />
                        </View>

                        {/* // AI config */}
                        <View style={[{ opacity: this.state.type ? 1 : 0.3 }, this.style.form.switch.container]}>
                            <View style={this.style.form.switch.left}>
                                <Text style={this.style.form.label}>Automatycznie dostosowuj (t)</Text>
                                <Text style={this.style.form.label}>only if AI turned ON in settings {"\n"} @todo some information about that</Text>
                            </View>
                            <View style={this.style.form.switch.right}>
                                <Switch disabled={!this.state.type}
                                    value={this.state.typeWithAI}
                                    onValueChange={val => this.setState({ typeWithAI: val })}
                                />
                            </View>
                        </View>
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
        let pickedExercise = null
        this.props.exercises.forEach((exercise: Exercise) => {
            if (exercise.name.toLocaleLowerCase() === name.toLocaleLowerCase()) {
                pickedExercise = exercise;
            }
        });

        return pickedExercise;
    }

    _fintExerciseVariantByName = (name: string) => {
        if (!this.state.exercise) {
            return null;
        }

        let pickedExerciseVariant = null
        this.state.exercise.exerciseVariants.forEach((variant: ExerciseVariant) => {
            if (variant.name.toLocaleLowerCase() === name.toLocaleLowerCase()) {
                pickedExerciseVariant = variant;
            }
        });

        return pickedExerciseVariant;
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    exercises: state.exercise.exercises
});

export default connect(mapStateToProps)(CreateGoalModal);
