import React from 'react';
import { Dispatch } from 'redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import I18n from 'src/assets/translations';
import Styles from './Header.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import Select from 'src/components/Select/Select';
import { Exercise } from 'src/models/Exercise';
import { ExerciseActions } from 'src/store/actions/exercise';
import Set from 'src/models/Set';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    setsHistory: { [key: string]: Set[] };
    exerciseToFilter: Exercise | null;
    exercises: Exercise[];

    onFilter: (sets: Set[]) => void;
}

type CircuitType = 'current' | 'previous' | 'all';
interface Stats {
    circuit: CircuitType;
}

class Header extends React.Component<Props, Stats> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            circuit: 'all'
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (JSON.stringify(prevProps.exerciseToFilter) !== JSON.stringify(this.props.exerciseToFilter)) {
            this.onFilter();
        }
    }

    componentDidMount() {
        this.onFilter();
    }

    changeCircuit = (circuit: string) => {
        const translated = this.getCircuitTranslatedOptions();
        const index = translated.indexOf(circuit);

        const list: CircuitType[] = ["current", "previous", "all"];
        const type: CircuitType = list[index];

        this.setState({ circuit: type }, this.onFilter);
    }

    pickExercise = (exerciseName: string) => {
        const exercise = exerciseName !== '-' ? this._findExerciseByName(exerciseName) : null;
        this.props.dispatch(ExerciseActions.selectExerciseToFilter(exercise));
    }

    onFilter = () => {
        const results: Set[] = [];

        if (!this.props.exerciseToFilter) {
            return;
        }

        Object.values(this.props.setsHistory).forEach((sets: Set[]) => {
            sets.forEach((set: Set) => {
                if (this.props.exerciseToFilter && this.props.exercises && set.goal.exercise.id === this.props.exerciseToFilter.id) {
                    results.push(set);
                }
            })
        });

        this.props.onFilter(results);
    }

    getCircuitTranslatedOptions = () => ["current", "previous", "all"].map(type => I18n.t(`planner.circuits.${type}`))
    render() {
        const selectTextStyles = [this.style.buttons.buttonText, this.style.buttons.buttonTextActive];

        return (
            <View style={this.style.container}>
                <Text style={this.style.title} numberOfLines={3}>{I18n.t('statistics.progress.title')}</Text>
                <View style={this.style.buttons.container}>
                    {/* <View style={[this.style.buttons.buttonContainer, { marginRight: 7.5 }]}>
                            <Text style={this.style.buttons.buttonLabel}>{I18n.t('statistics.circuit')}</Text>
                            <Select small
                                autoSize
                                value={I18n.t(`planner.circuits.${this.state.circuit}`)}
                                onChange={(value) => this.changeCircuit(value)}
                                options={this.getCircuitTranslatedOptions()}
                                textStyle={selectTextStyles}
                                containerStyle={this.style.buttons.button}
                            />
                        </View> */}

                    <View style={[this.style.buttons.buttonContainer]}>
                        <Text style={this.style.buttons.buttonLabel}>{I18n.t('statistics.exercise')}</Text>
                        <Select small
                            autoSize
                            placeholder={I18n.t('mics.filter')}
                            onChange={this.pickExercise}
                            value={this.props.exerciseToFilter ? this.props.exerciseToFilter.name : undefined}
                            options={this._getExercisesOptions()}
                            textStyle={selectTextStyles}
                            containerStyle={this.style.buttons.button}
                        />
                    </View>
                    <View style={{flex: 2}}></View>
                </View>
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

    _getExercisesOptions = (): string[] => {
        const options: string[] = [];
        Object.values(this.props.setsHistory).forEach((sets: Set[]) => {
            sets.forEach((set: Set) => {
                const name = set.goal.exercise.name.toLocaleLowerCase();
                if (!options.includes(name)) {
                    options.push(name);
                }
            })
        });

        options.sort();

        return ["-", ...options];
    };
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    exercises: state.exercise.exercises,
    setsHistory: state.planner.setsHistory,
    exerciseToFilter: state.exercise.exercisesToFilter
});

export default connect(mapStateToProps)(Header);
