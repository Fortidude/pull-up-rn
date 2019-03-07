import React from 'react';
import { Dispatch } from 'redux';
import { View, Animated, Text, KeyboardAvoidingView, Keyboard, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import I18n from 'src/assets/translations';
import Styles, { EMPTY_LIST_HEIGHT } from './EmptyList.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import ButtonBig from '../../ButtonBig';
import { ModalActions } from '../../../store/actions/modal';
import Input from 'src/components/Input';
import { PlannerActions } from 'src/store/actions/planner';
import { AppActions } from 'src/store/actions/app';
import ButtonCircle from 'src/components/ButtonCircle/ButtonCircle';
import ButtonSmall from 'src/components/ButtonSmall/ButtonSmall';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    visible: Animated.Value;
    onClose: () => void;
    getRef?: (instance: AddTraining) => void;
}

interface State {
    title: string;
}

class AddTraining extends React.Component<Props, State> {
    style: ThemeValueInterface;

    containerTranslateY = new Animated.Value(0);
    formVisibleAnimation = new Animated.Value(0);

    addTrainingSectionModalTitleInputRef: any;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            title: ''
        }

        if (props.getRef) {
            props.getRef(this);
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    focusInput = () => {
        this.addTrainingSectionModalTitleInputRef.focus();
    }

    onButtonPress = () => {
        if (this._isTitleValid()) {
            this.props.dispatch(AppActions.togglePlannerEdit(true));
            this.props.dispatch(PlannerActions.createSection(this.state.title, ''));
        }

        this.close();
    }

    close = () => {
        Keyboard.dismiss();
        this.props.onClose()
    }

    render() {
        const buttonTranslateY = this.props.visible.interpolate({
            inputRange: [0, 1],
            outputRange: [-EMPTY_LIST_HEIGHT / 6, 150]
        });

        const formOpacity = this.props.visible.interpolate({
            inputRange: [0, 0.7, 1],
            outputRange: [0, 0.1, 1]
        });

        const formScale = this.props.visible.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });

        return (
            <React.Fragment>
                <Animated.View style={[this.style.formContainer, { opacity: formOpacity, transform: [{ scale: formScale }] }]}>
                    <Text style={this.style.form.label}>{I18n.t('planner.first_step.add_first_training')}</Text>
                    <Input medium
                        inputRef={ref => this.addTrainingSectionModalTitleInputRef = ref}
                        keyboardType={"default"}
                        value={this.state.title ? this.state.title.toString() : undefined}
                        onChange={(value) => this.setState({ title: value })}
                        placeholder={I18n.t('planner.first_step.own.placeholder')}
                    />

                    <Text style={this.style.infoText}>{I18n.t('planner.empty_list_iniformation')}</Text>
                </Animated.View>
                <Animated.View style={[this.style.buttonContainer, { flexDirection: 'row', opacity: formOpacity, transform: [{ translateY: buttonTranslateY }] }]}>
                    <ButtonSmall text={I18n.t('buttons.add')} border onPress={this.onButtonPress} />
                    <ButtonSmall text={I18n.t('buttons.cancel')} danger border onPress={this.close} />
                </Animated.View>
            </React.Fragment>
        );
    }

    _isTitleValid = () => this.state.title.length >= 3;
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(AddTraining);
