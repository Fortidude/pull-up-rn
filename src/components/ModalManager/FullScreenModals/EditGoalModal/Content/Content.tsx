import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Text, View, Switch, Keyboard, TextInput, ScrollView } from 'react-native';
import I18n from 'src/assets/translations';

import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';

import getStyle from './Content.styles';
import Events from 'src/service/Events';
import { PlannerActions } from 'src/store/actions/planner';
import { ModalActions } from 'src/store/actions/modal';
import Select from 'src/components/Select/Select';
import Input from 'src/components/Input';
import Goal, { mapStateToGoalDataStructure } from 'src/models/Goal';

import ModalHeader from 'src/components/ModalManager/ModalHeader/ModalHeader';

type GoalType = "sets" | "reps" | "time" | null;

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    isOnline: boolean;
    isLoading: boolean;
    goal: Goal;

    goalEditModalVisible: boolean;
    plannerCustomMode: boolean;

    onClose: () => void;
};

interface State {
    type: GoalType;
    requiredAmount: number | null;
    typeWithAI: boolean;
}

class EditGoalContent extends React.Component<Props, State> {
    style: ThemeValueInterface;
    keyboardWillShowListener: any;
    keyboardWillHideListener: any;
    inputAmountRequiredRef: TextInput;

    private NONE_TYPE_NANE = 'None';

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);

        this.state = {
            //@ts-ignore
            type: props.goal && props.goal.requiredType,
            requiredAmount: props.goal && props.goal.requiredAmount,
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

        return nextProps.goalEditModalVisible !== this.props.goalEditModalVisible
            || differentState;
    }

    componentDidMount() {
        if (this.props.goalEditModalVisible) {
            this.emit(this.props);
        }

        Events.listenTo('HEADER_SAVE_CLICKED', 'EditGoalModal', this.onSuccess);
        Events.listenTo('HEADER_CANCEL_CLICKED', 'EditGoalModal', this.onClose);

        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
    }

    componentWillUnmount() {
        Events.remove('HEADER_SAVE_CLICKED', 'EditGoalModal');
        this.keyboardWillShowListener.remove();
        this.keyboardWillHideListener.remove();
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }

        if (nextProps.goal) {
            const type = nextProps.goal.requiredType;
            const requiredAmount = nextProps.goal.requiredAmount;
            //@ts-ignore
            this.setState({ type, requiredAmount });
        }

        this.emit(nextProps);
    }

    emit = (props: Props) => {
        if (props.goalEditModalVisible) {
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
            type: null,
            requiredAmount: null,
            typeWithAI: false
        });
    }

    onClose = () => {
        if (!this.props.goalEditModalVisible) {
            return;
        }

        this.clear();
        this.props.dispatch(ModalActions.goalEditClose());
        this.props.dispatch(PlannerActions.selectGoal(null));
        this.props.onClose();
        Keyboard.dismiss();
    }

    onSuccess = () => {
        if (!this.props.goalEditModalVisible) {
            return;
        }
        
        let data = mapStateToGoalDataStructure(this.state);
        this.props.dispatch(PlannerActions.updateGoal(this.props.goal.id, data));
        this.onClose();
    }

    pickType = (type: GoalType | string) => {
        if (type === this.NONE_TYPE_NANE) {
            this.setState({ type: null, typeWithAI: false });
            return;
        }

        //@ts-ignore
        this.setState({ type: type, typeWithAI: true });
    }


    render() {
        const exerciseIsValid = true;
        if (!this.props.goal) {
            return null;
        }

        return (
            <View style={[this.style.container]}>
                <ModalHeader text={"Edycja celu"} textStyle={this.style.headerTitle} style={this.style.headerContainer} />

                <ScrollView style={this.style.content}
                    onTouchStart={() => { Keyboard.dismiss() }}
                    keyboardShouldPersistTaps="always"
                >

                    <Text style={this.style.exerciseText} numberOfLines={1}>{this.props.goal.exercise.name || '-'}</Text>
                    <Text style={this.style.variantText} numberOfLines={1}>{this.props.goal.exercise.exerciseVariant.name || '-'}</Text>
                    <Text style={this.style.trainingText} numberOfLines={1}>{this.props.goal.trainingName}</Text>

                    <View style={this.style.form.container}>

                        {/* // TYPE */}
                        <View>
                            <Text style={this.style.form.label}>{I18n.t('mics.goal_type')}</Text>
                            <Select
                                medium
                                disabled={!exerciseIsValid}
                                placeholder={!exerciseIsValid ? I18n.t('mics.you_have_to_pick_exercise') : I18n.t('mics.none')}
                                onChange={this.pickType}
                                value={this.state.type ? I18n.t(`planner.types.${this.state.type.toLocaleLowerCase()}`) : undefined}
                                options={[this.NONE_TYPE_NANE, 'Sets', 'Reps', 'Time']}
                            />
                        </View>

                        {/* // REQUIRED AMOUNT */}
                        <View style={{ opacity: this.state.type ? 1 : 0.3 }}>
                            <Text style={this.style.form.label}>{I18n.t('mics.amount')}</Text>
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
                        {false && <View style={[{ opacity: this.state.type ? 1 : 0.3 }, this.style.form.switch.container]}>
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
                        </View>}
                    </View>
                </ScrollView>
            </View>
        );
    }

    _keyboardWillShow = (event: any) => {
        if (!this.props.goalEditModalVisible) {
            return;
        }

        const keyboardHeight = event.endCoordinates.height;
        // Animated.timing(this.containerHeight, {toValue: CONTAINER_HEIGHT - keyboardHeight}).start();
    }

    _keyboardWillHide = () => {
        //  Animated.timing(this.containerHeight, {toValue: CONTAINER_HEIGHT}).start();
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    isOnline: state.app.isOnline,
    goalEditModalVisible: state.modal.goalEditModalVisible,

    goal: state.planner.goalSelected,
    isLoading: state.planner.createGoalLoading,
    plannerCustomMode: state.user.current ? state.user.current.planner_custom_mode : false
});

export default connect(mapStateToProps)(EditGoalContent);
