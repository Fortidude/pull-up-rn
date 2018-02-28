import React from 'react';
import PropTypes from 'prop-types';
import { View, RefreshControl } from 'react-native';
import { Content, Text, List, ListItem, Left, Right, Icon, Input, Button, Item, Picker } from 'native-base';

import CreateExerciseModal from './../../../Components/CreateExercise.modal';
import ChoiceExerciseModal from './../../../Components/ChoiceExercise.modal';
import ChoiceGoalTypeModal from './../../../Components/ChoiceGoalType.modal';
import SimpleChooseModal from './../../../Components/SimpleChoose.modal';

import I18n from '../../../Translations/translations';

import Style from '../../../Styles/style';
import Color from '../../../Styles/color';
import Spinkit from "../../../Components/Spinner";

const newGoalStyle = Style.planner.new_goal;
const pickerTextStyle = [Style.card.cardItem.text_blue, {paddingLeft: 0, paddingRight: 0}];

export default class NewGoal extends React.Component {
    static propTypes = {
        store: PropTypes.object,
        isToggled: PropTypes.bool,
        plannerCustomMode: PropTypes.bool,
        changeRightHeader: PropTypes.func,

        onCreateExercise: PropTypes.func.isRequired,
        onGoalCreate: PropTypes.func.isRequired,
        onGoalCreated: PropTypes.func.isRequired,
        errorReset: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            exercise: null,
            exercise_variant: null,
            type: 'none',
            value: '',
            section: this.props.store.planner.selected_section_name,

            refreshing: false,
            loading: false,

            goal_type_options: ['sets', 'reps', 'time', 'none'],

            create_exercise_modal: false,
            choice_goal_type_modal: false,
            choice_exercise_modal: false,
            choice_exercise_variant_modal: false,

            section_choice_modal: false,

            header_changed: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.store.planner.selected_section_name !== this.props.store.planner.selected_section_name) {
            this.setState({'section': nextProps.store.planner.selected_section_name});
        }
    }

    componentDidUpdate() {
        if (this.isValid() && this.props.changeRightHeader && this.props.isToggled && !this.state.header_changed) {
            this.setState({header_changed: true});
            this.props.changeRightHeader('Zapisz', this.createGoal.bind(this))
        } else if (!this.isValid() && this.props.changeRightHeader && this.state.header_changed) {
            this.setState({header_changed: false});
            if (this.props.isToggled) {
                this.props.changeRightHeader(null, null);
            }
        }

        if (this.state.header_changed && !this.props.isToggled) {
            this.setState({header_changed: false});
        }

        if (this.props.store.planner.goal_created === true) {
            this.props.errorReset();
            this.setState({exercise: null, exercise_variant: null, type: 'none', value: '0', loading: false}, () => {
                this.props.onGoalCreated();
            });
        }

        /**
         * AFTER EXERCISE CREATED
         */
        if (this.props.store.exercise.created !== null && this.props.store.exercise.loaded === true) {
            let createdName = this.props.store.exercise.created.createdName;
            let createdVariantName = this.props.store.exercise.created.createdVariantName;

            let createdExercise = null;
            let createdExerciseVariant = null;

            this.props.store.exercise.items.forEach((exercise) => {
                if (exercise.name === createdName) {
                    createdExercise = exercise;
                    exercise.exercise_variants.forEach(variant => {
                        if (variant.name === createdVariantName) {
                            createdExerciseVariant = variant;
                        }
                    })
                }
            });

            this.setState({loading: false, exercise: createdExercise, exercise_variant: createdExerciseVariant}, this.props.errorReset.bind(this));
        }
    }

    dismissCreateExerciseModal() {
        this.setState({create_exercise_modal: false});
    }
    dismissChoiceExerciseModal() {
        this.setState({choice_exercise_modal: false, choice_exercise_variant_modal: false});
    }
    dismissChoiceGoalTypeModal() {
        this.setState({choice_goal_type_modal: false});
    }

    showCreateExerciseModal() {
        this.setState({choice_goal_type_modal: false,
            choice_exercise_modal: false,
            choice_exercise_variant_modal: false
        }, () => {
            setTimeout(() => this.setState({create_exercise_modal: true}), 500);
        });
    }
    choiceExercise(exercise) {
        this.setState({exercise: exercise, exercise_variant: null});
    }
    choiceExerciseVariant(exercise) {
        this.setState({exercise_variant: exercise});
    }
    choiceGoal(type) {
        this.setState({type: type});
    }
    choiceSection(index) {
        let sections = Object.keys(this.props.store.planner.planner);
        this.setState({section: sections[index]});
    }

    translateIfSectionNameRequire = (sectionName) => (sectionName === 'other' ? I18n.t('planner.sections.other') : sectionName);
    getSectionNames() {
        let sections = Object.keys(this.props.store.planner.planner);
        return sections.map(section => {
            return this.translateIfSectionNameRequire(section);
        });
    }

    goalIsValid = () => (this.state.type === 'none' || (this.state.value.length > 0 && parseInt(this.state.value) > 0));
    isValid = () => !!this.state.exercise && this.goalIsValid();
    isLoading = () => this.state.loading && (this.props.store.planner.loading || this.props.store.exercise.loading);
    createGoal = () => {
        let payload = {
            name: 'empty',
            description: 'empty',
            exercise: this.state.exercise.id,
            exercise_variant: this.state.exercise_variant ? this.state.exercise_variant.id : null,
            no_specified_goal: this.state.type === 'none'
        };

        payload[this.state.type] = this.state.value;

        if (this.props.plannerCustomMode && this.state.section) {
            payload['section'] = this.state.section;
        }

        this.setState({loading: true});
        this.props.onGoalCreate(payload);
    };
    createExercise = (name, variantName, isCardio) => {
        this.setState({loading: true}, this.props.onCreateExercise(name, variantName, isCardio));
    };

    choiceGoalSimpleModal(index) {
        let types = this._getTypesByGoal();
        if (!types[index]) {
            return;
        }

        this.setState({type: types[index]});
    }
    _getTypesByGoal() {
        let types = this.state.goal_type_options;
        if (this.state.exercise && this.state.exercise.is_cardio) { // Dla cardio usuwamy reps
            types = types.filter(type => {
                return type !== "reps";
            })
        }

        return types;
    }
    getGoalTypeListTranslated() {
        let types = this._getTypesByGoal();
        return types.map(type => {
            return type === 'none' ? I18n.t('planner.type.none_t') : I18n.t('planner.type.' + type);
        })
    }

    render() {
        return (
            <Content style={this.props.isToggled ? {flex: 1} : {position: 'absolute', flex: 0, width: 0, height: 0, right: -Style.widthValue, zIndex: -5}}
                     keyboardShouldPersistTaps="always"
                     keyboardDismissMode={'on-drag'}
                     showsVerticalScrollIndicator={false}>
                    {!this.isLoading() && <List style={{marginTop: 10}}>
                        <ListItem>
                            <View style={newGoalStyle.left}>
                                <Text style={Style.card.cardItem.text}>Ćwiczenie</Text>
                            </View>
                            <View style={newGoalStyle.right}>
                                <Button transparent small onPress={() => this.setState({choice_exercise_modal: true})} style={Style.planner.new_goal.right_button}>
                                    {!this.state.exercise && <Text numberOfLines={1} style={pickerTextStyle}>Wybierz z listy</Text>}
                                    {this.state.exercise && <Text numberOfLines={1} style={pickerTextStyle}>{ this.state.exercise.name }</Text>}
                                </Button>
                            </View>
                        </ListItem>
                        <ListItem style={{borderBottomWidth: 0}}>
                            <View style={newGoalStyle.left}>
                                {!this.state.exercise && <Text style={Style.card.cardItem.text_disabled}>Wariant ćwiczenia</Text>}
                                {this.state.exercise && this.state.exercise.exercise_variants.length === 0 && <Text style={Style.card.cardItem.text_disabled}>brak dostępnych wariantów</Text>}
                                {this.state.exercise && this.state.exercise.exercise_variants.length > 0 && <Text style={Style.card.cardItem.text}>Wariant ćwiczenia</Text>}
                            </View>
                            <View style={newGoalStyle.right}>
                                {this.state.exercise && this.state.exercise.exercise_variants.length > 0 && <Button style={Style.planner.new_goal.right_button}
                                    transparent small onPress={() => this.setState({choice_exercise_variant_modal: true})}>
                                    {!this.state.exercise_variant && <Text numberOfLines={1} style={pickerTextStyle}>brak</Text>}
                                    {this.state.exercise_variant && <Text numberOfLines={1} style={pickerTextStyle}>{ this.state.exercise_variant.name }</Text>}
                                </Button>}
                            </View>
                        </ListItem>
                    </List>}

                    {!this.isLoading() && <List style={{marginTop: 50}}>
                        <ListItem>
                            <View style={newGoalStyle.left}>
                                {this.state.exercise && <Text style={Style.card.cardItem.text}>Cel <Text style={Style.card.cardItem.text_note}>(typ)</Text></Text>}
                                {!this.state.exercise && <Text style={Style.card.cardItem.text_disabled}>Cel <Text style={Style.card.cardItem.text_note}>(typ)</Text></Text>}
                            </View>
                            <View style={newGoalStyle.right}>
                                {this.state.exercise && <Button style={Style.planner.new_goal.right_button}
                                    transparent small onPress={() => this.setState({choice_goal_type_modal: true})}>
                                    {!this.state.type && <Text numberOfLines={1} style={pickerTextStyle}>Wybierz z listy</Text>}
                                    {this.state.type && <Text numberOfLines={1} style={pickerTextStyle}>{  I18n.t('planner.choice_type.' + this.state.type).toLocaleUpperCase() }</Text>}
                                </Button>}
                            </View>
                        </ListItem>
                        <ListItem style={{borderBottomWidth: 0}}>
                            <View style={newGoalStyle.left}>
                                {this.state.exercise && this.state.type !== 'none' && <Text style={[Style.card.cardItem.text]}>Cel <Text style={Style.card.cardItem.text_note}>(ilość)</Text> {!this.goalIsValid() && <Icon name="alert" style={{color: Color.red.color, fontSize: 15}}/>}</Text>}
                                {(!this.state.exercise || this.state.type === 'none') && <Text style={[Style.card.cardItem.text_disabled]}>Cel <Text style={Style.card.cardItem.text_note}>(ilość)</Text></Text>}
                            </View>
                            <View style={newGoalStyle.right}>
                                {this.state.exercise && this.state.type !== 'none' && <Input style={[Style.card.cardItem.text_blue, Style.card.cardItem.input, {paddingLeft: 10, paddingRight: 10, lineHeight: 16}]}
                                       onFocus={() => this.valueFocused = true}
                                       keyboardAppearance="dark"
                                       autoCapitalize="none"
                                       autoCorrect={false}
                                       keyboardType={'phone-pad'}
                                       placeholder="Podaj liczbę"
                                       value={this.state.value}
                                       onChangeText={(value) => {
                                           value = parseInt(value);
                                           if (isNaN(value)) {
                                               value = '';
                                           }
                                           this.setState({value: value.toString()})
                                       }}
                                />}
                            </View>
                        </ListItem>
                    </List>}

                    {!this.isLoading() && this.props.plannerCustomMode && <List style={{marginTop: 50}}>
                        <ListItem style={{borderBottomWidth: 0}}>
                            <View style={newGoalStyle.left}>
                                <Text style={Style.card.cardItem.text}>Trening</Text>
                            </View>
                            <View style={newGoalStyle.right}>
                                <Button style={Style.planner.new_goal.right_button}
                                    transparent small onPress={() => this.setState({section_choice_modal: true})}>
                                    {!this.state.type && <Text numberOfLines={1} style={pickerTextStyle}>Wybierz z listy</Text>}
                                    {this.state.type && <Text numberOfLines={1} style={pickerTextStyle}>{ this.translateIfSectionNameRequire(this.state.section) }</Text>}
                                </Button>
                            </View>
                        </ListItem>
                    </List>}

                    {this.isLoading() && <Spinkit style={{marginTop: Style.heightValue/4, alignSelf:'center'}}/>}


                    <CreateExerciseModal
                        isVisible={this.state.create_exercise_modal}
                        onDismiss={this.dismissCreateExerciseModal.bind(this)}
                        createExercise={this.createExercise.bind(this)}
                    />

                    <ChoiceExerciseModal
                        isVisible={this.state.choice_exercise_modal}
                        exercises={this.props.store.exercise.items}
                        onDismiss={this.dismissChoiceExerciseModal.bind(this)}
                        onSelect={this.choiceExercise.bind(this)}
                        createExercise={this.showCreateExerciseModal.bind(this)}
                    />

                    {false && <ChoiceGoalTypeModal
                        isVisible={this.state.choice_goal_type_modal}
                        onDismiss={this.dismissChoiceGoalTypeModal.bind(this)}
                        onSelect={this.choiceGoal.bind(this)}
                    />}

                    {this.state.exercise && this.state.exercise.exercise_variants &&
                    <ChoiceExerciseModal
                        isVisible={this.state.choice_exercise_variant_modal}
                        exercises={[{name: 'brak'}, ...this.state.exercise.exercise_variants]}
                        onDismiss={this.dismissChoiceExerciseModal.bind(this)}
                        onSelect={this.choiceExerciseVariant.bind(this)}
                        createExercise={this.showCreateExerciseModal.bind(this)}
                    />}

                    <SimpleChooseModal isVisible={this.state.choice_goal_type_modal}
                                       collection={this.getGoalTypeListTranslated()}
                                       onDismiss={() => this.setState({choice_goal_type_modal: false})}
                                       onChose={this.choiceGoalSimpleModal.bind(this)}/>

                    {this.props.plannerCustomMode && <SimpleChooseModal isVisible={this.state.section_choice_modal}
                                       collection={this.getSectionNames()}
                                       onDismiss={() => this.setState({section_choice_modal: false})}
                                       onChose={this.choiceSection.bind(this)}/>}

            </Content>
        );
    }
}