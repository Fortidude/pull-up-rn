import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Text, View, Switch, ScrollView, Keyboard, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';
import moment from 'moment'
import I18n from 'src/assets/translations';

import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';

import getStyle from './Content.styles';
import Events from 'src/service/Events';
import { PlannerActions } from 'src/store/actions/planner';
import { ModalActions } from 'src/store/actions/modal';
import Select from 'src/components/Select/Select';
import Input from 'src/components/Input';
import { Exercise, ExerciseVariant } from 'src/models/Exercise';
import { NewGoalInterface, mapNewGoalInterfaceToApiRequestDataStructure } from 'src/models/Goal';

import validate, { validateType } from './validate';
import { HEADER_HEIGHT } from 'src/components/Header/Header.styles';

type GoalType = "sets" | "reps" | "time" | null;
const HEIGHT = Dimensions.get('window').height;

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    isOnline: boolean;
    isLoading: boolean;
    sectionName: string;
    exercises: Exercise[];
    goalCreateModalVisible: boolean;
    plannerCustomMode: boolean;

    onClose: () => void;
};

interface State extends NewGoalInterface {
    name: string;
    description: string | null;
    exercise: Exercise | null;
    exerciseVariant: ExerciseVariant | null;
    type: GoalType;
    requiredAmount: number | null;
    typeWithAI: boolean;
}

class CreateGoalContent extends React.Component<Props, State> {
    style: ThemeValueInterface;
    keyboardDidShowListener: any;
    inputAmountRequiredRef: TextInput;

    private NONE_TYPE_NANE = 'None';

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);

        this.state = {
            name: '',
            description: null,
            exercise: null,
            exerciseVariant: null,
            type: null,
            requiredAmount: null,

            typeWithAI: false
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        let differentState = false;
        Object.keys(nextState).forEach((key: string) => {
            //@ts-ignore
            if (!this.state[key] || this.state[key] !== nextState[key]) {
                differentState = true;
            }
        })
        return nextProps.goalCreateModalVisible !== this.props.goalCreateModalVisible
            || differentState;
    }

    componentDidMount() {
        if (this.props.goalCreateModalVisible) {
            this.emit(this.props);
        }

        Events.listenTo('HEADER_SAVE_CLICKED', 'GoalInformationModal', this.onSuccess);
        Events.listenTo('HEADER_CANCEL_CLICKED', 'GoalInformationModal', this.onClose);

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    }

    componentWillUnmount() {
        Events.remove('HEADER_SAVE_CLICKED', 'GoalInformationModal');
        Events.remove('HEADER_CANCEL_CLICKED', 'GoalInformationModal');
        this.keyboardDidShowListener.remove();
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }

        this.emit(nextProps);
    }

    emit = (props: Props) => {
        if (props.goalCreateModalVisible) {
            Events.emit('HEADER_OVERWRITE_TITLE', '');
            Events.emit('FOOTER_BAR_CLOSE');
            Events.emit('FULLSCREEN_MODAL_VISIBLE');
        } else {
            Events.emit('HEADER_OVERWRITE_TITLE', null);
            Events.emit('FOOTER_BAR_OPEN');
            Events.emit('FULLSCREEN_MODAL_HIDDEN');
        }
    }

    clear = () => {
        this.setState({
            name: '',
            description: null,
            exercise: null,
            exerciseVariant: null,
            type: null,
            requiredAmount: null,

            typeWithAI: false
        });
    }

    onClose = () => {
        if (!this.props.goalCreateModalVisible) {
            return;
        }

        this.props.dispatch(ModalActions.goalCreateClose());
        this.props.dispatch(PlannerActions.selectSection(null));
        this.props.onClose();
        Keyboard.dismiss();
    }

    onSuccess = () => {
        if (!this.props.goalCreateModalVisible) {
            return;
        }

        if (!validate(this.state) || !this.props.isOnline || this.props.isLoading) {
            return;
        }

        const goalApiRequestDataStructure = mapNewGoalInterfaceToApiRequestDataStructure(this.state);
        if (this.props.plannerCustomMode) {
            goalApiRequestDataStructure.section = this.props.sectionName || undefined;
        }

        this.props.dispatch(PlannerActions.createGoal(goalApiRequestDataStructure));
        this.clear();
        this.onClose();
    }

    pickType = (type: GoalType | string) => {
        if (type === this.NONE_TYPE_NANE || !validateType(type)) {
            this.setState({ type: null, typeWithAI: false });
            return;
        }

        //@ts-ignore
        this.setState({ type: type, typeWithAI: true });
    }

    render() {
        return (
            <React.Fragment>
                <ScrollView
                    ref="scrollView"
                    style={this.style.content}
                    onTouchStart={() => { Keyboard.dismiss() }}
                    keyboardShouldPersistTaps="always">
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
                        <Select
                            medium
                            placeholder="Brak"
                            onChange={this.pickExercise}
                            value={this.state.exercise ? this.state.exercise.name : undefined}
                            options={this.props.exercises ? this.props.exercises.map(exercise => exercise.name) : []}
                        />

                        {/* // EXERCISE VARIANT */}
                        <View style={{ opacity: this.state.exercise ? 1 : 0.3 }}>
                            <Text style={this.style.form.label}>Cwiczenie wariant (t)</Text>
                            <Select
                                medium
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
                            <Select
                                medium
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
                            <Input
                                medium
                                inputRef={ref => this.inputAmountRequiredRef = ref}
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
                </ScrollView>
            </React.Fragment>
        );
    }

    pickExercise = (exerciseName: string) => {
        this.setState({ name: exerciseName, exercise: this._findExerciseByName(exerciseName), exerciseVariant: null });
    }

    getExerciseVariantOptions = () => this.state.exercise ? this.state.exercise.exerciseVariants.map(exercise => exercise.name) : [];
    pickExerciseVariant = (exerciseVariantName: string) => {
        const name = `${this.state.name} ${exerciseVariantName}`;
        this.setState({ name: name, exerciseVariant: this._fintExerciseVariantByName(exerciseVariantName) });
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

    _keyboardDidShow = (event: any) => {
        if (!this.props.goalCreateModalVisible) {
            return;
        }

        const keyboardHeight = event.endCoordinates.height;
        //@ts-ignore
        this.refs.scrollView.scrollTo({ y: (HEIGHT - (HEADER_HEIGHT * 2) - keyboardHeight) });
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    isOnline: state.app.isOnline,
    goalCreateModalVisible: state.modal.goalCreateModalVisible,

    exercises: state.exercise.exercises,
    sectionName: state.planner.sectionName,
    isLoading: state.planner.createGoalLoading,
    plannerCustomMode: state.user.current ? state.user.current.planner_custom_mode : false
});

export default connect(mapStateToProps)(CreateGoalContent);
