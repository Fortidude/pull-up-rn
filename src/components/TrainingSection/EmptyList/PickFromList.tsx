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
    getRef?: (instance: PickFromList) => void;
}

interface State {
    title: string;
}

class PickFromList extends React.Component<Props, State> {
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

    basicTrainingButton = () => {
        this.props.dispatch(PlannerActions.assignTrainingPlan('basic'));

        this.close();
    }

    intermediateTrainingButton = () => {
        this.props.dispatch(ModalActions.informationOpen(
            I18n.t("warnings.information"),
            I18n.t("warnings.still_during_production")
        ));

        this.close();
    }

    close = () => {
        Keyboard.dismiss();
        this.props.onClose();
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
                <Animated.View style={[this.style.buttonContainer, { opacity: formOpacity, transform: [{ scale: formScale }] }]}>
                    <ButtonBig lightShadow text={"Jestem początkujący"} onPress={this.basicTrainingButton} style={this.style.first_button} />
                    <ButtonBig lightShadow text={"Bywałem już na siłowni"} onPress={this.intermediateTrainingButton} style={this.style.last_button} />
                </Animated.View>

                <Animated.View style={{ position: 'absolute', right: 45, opacity: formOpacity, transform: [{ translateY: buttonTranslateY }] }}>
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

export default connect(mapStateToProps)(PickFromList);
