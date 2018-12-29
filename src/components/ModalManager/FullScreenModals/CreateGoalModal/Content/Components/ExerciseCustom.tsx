import React from 'react';
import { Dispatch } from 'redux';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'src/assets/translations';

import Styles from './../Content.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import Select from 'src/components/Select/Select';
import { Exercise, ExerciseVariant } from 'src/models/Exercise';
import Input from 'src/components/Input';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    exerciseValid: boolean;

    exercise: Exercise | null;
    onChangeExercise: (exerciseName: string) => void;

    exerciseVariant: ExerciseVariant | null;
    onChangeExerciseVariant: (name: string) => void;
}

class ExerciseFromList extends React.Component<Props> {
    style: ThemeValueInterface;

    inputCustomExercise: TextInput;
    inputCustomExerciseVariant: TextInput;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    render() {
        return (
            <React.Fragment>
                {/* // EXERCISE */}
                <Text style={this.style.form.label}>{I18n.t('mics.exercise')}</Text>
                <Input
                    medium
                    inputRef={ref => this.inputCustomExercise = ref}
                    keyboardType={"default"}
                    placeholder={I18n.t('mics.type_name')}
                    value={this.props.exercise ? this.props.exercise.name : undefined}
                    onChange={(value) => this.props.onChangeExercise(value)}
                />

                {/* // EXERCISE VARIANT */}
                <View style={{ opacity: !!this.props.exercise ? 1 : 0.3 }}>
                    <Text style={this.style.form.label}>{I18n.t('mics.exercise_variant')}</Text>
                    <Input
                        medium
                        inputRef={ref => this.inputCustomExerciseVariant = ref}
                        keyboardType={"default"}
                        placeholder={!this.props.exerciseValid ? I18n.t('mics.you_have_to_type_exercise') : I18n.t('mics.type_name')}
                        value={this.props.exerciseVariant ? this.props.exerciseVariant.name : undefined}
                        onChange={(value) => this.props.onChangeExerciseVariant(value)}
                    />
                </View>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(ExerciseFromList);
