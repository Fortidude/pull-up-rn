import React from 'react';
import { Dispatch } from 'redux';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'src/assets/translations';

import Styles from './../Content.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import Select from 'src/components/Select/Select';
import { Exercise, ExerciseVariant } from 'src/models/Exercise';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    
    exerciseValid: boolean;
    exercises: Exercise[];

    exercise: Exercise | null;
    onChangeExercise: (exerciseName: string) => void;

    exerciseVariant: ExerciseVariant | null;
    onChangeExerciseVariant: (name: string) => void;
}

class ExerciseFromList extends React.Component<Props> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    getExerciseOptions = () => this.props.exercises ? this.props.exercises.map(exercise => exercise.name) : []
    getExerciseVariantOptions = () => this.props.exercise ? this.props.exercise.exerciseVariants.map(exercise => exercise.name) : [];

    render() {
        return (
            <React.Fragment>
                {/* // EXERCISE */}
                <Text style={this.style.form.label}>{I18n.t('mics.exercise')}</Text>
                <Select
                    medium
                    placeholder="Brak"
                    onChange={this.props.onChangeExercise}
                    value={this.props.exercise ? this.props.exercise.name : undefined}
                    options={this.getExerciseOptions()}
                />

                {/* // EXERCISE VARIANT */}
                <View style={{ opacity: !!this.props.exercise ? 1 : 0.3 }}>
                    <Text style={this.style.form.label}>{I18n.t('mics.exercise_variant')}</Text>
                    <Select
                        medium
                        disabled={!this.props.exerciseValid}
                        placeholder={!this.props.exerciseValid ? I18n.t('mics.you_have_to_pick_exercise') : I18n.t('mics.none')}
                        onChange={this.props.onChangeExerciseVariant}
                        value={this.props.exerciseVariant ? this.props.exerciseVariant.name : undefined}
                        options={['Brak', ...this.getExerciseVariantOptions()]}
                    />
                </View>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,

    exercises: state.exercise.exercises,
});

export default connect(mapStateToProps)(ExerciseFromList);
