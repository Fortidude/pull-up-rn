import React from 'react';
import { Dispatch } from 'redux';
import { View, Animated, Text, KeyboardAvoidingView, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import I18n from 'src/assets/translations';
import Styles, { EMPTY_LIST_HEIGHT } from './EmptyList.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import ButtonBig from '../../ButtonBig';
import { ModalActions } from '../../../store/actions/modal';
import Input from 'src/components/Input';
import { PlannerActions } from 'src/store/actions/planner';
import { AppActions } from 'src/store/actions/app';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface
}

interface State {
    formVisible: boolean;
    title: string;
}

class EmptyList extends React.Component<Props, State> {
    style: ThemeValueInterface;

    containerTranslateY = new Animated.Value(0);
    formVisibleAnimation = new Animated.Value(0);

    addTrainingSectionModalTitleInputRef: any;
    keyboardDidShowListener: any;
    keyboardDidHideListener: any;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            formVisible: false,
            title: ''
        }
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    onButtonPress = () => {
        if (this.state.formVisible) {
            if (this._isTitleValid()) {
                this.props.dispatch(AppActions.togglePlannerEdit(true));
                this.props.dispatch(PlannerActions.createSection(this.state.title, ''));
            }

            this.setState({ formVisible: false, title: '' });
            Keyboard.dismiss();
            Animated.spring(this.formVisibleAnimation, {
                toValue: 0,
                useNativeDriver: true
            }).start();
            return;
        }

        this.setState({ formVisible: true })
        Animated.spring(this.formVisibleAnimation, {
            toValue: 1,
            useNativeDriver: true
        }).start(() => this.addTrainingSectionModalTitleInputRef.focus());
    }

    render() {
        let buttonText = this.state.formVisible ? I18n.t('buttons.close') : I18n.t('planner.add_first_training')
        buttonText = this.state.formVisible && this._isTitleValid() ? I18n.t('buttons.add') : buttonText;

        const buttonTranslateY = this.formVisibleAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [-EMPTY_LIST_HEIGHT / 6, 50]
        });

        const formOpacity = this.formVisibleAnimation.interpolate({
            inputRange: [0, 0.7, 1],
            outputRange: [0, 0.1, 1]
        });

        const formScale = this.formVisibleAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });

        return (
            <Animated.View style={[this.style.container, { transform: [{ translateY: this.containerTranslateY }] }]}>
                <Animated.View style={[this.style.formContainer, { opacity: formOpacity, transform: [{ scale: formScale }] }]}>
                    <Text style={this.style.form.label}>{I18n.t('fields.type_name')}</Text>
                    <Input medium
                        inputRef={ref => this.addTrainingSectionModalTitleInputRef = ref}
                        keyboardType={"default"}
                        value={this.state.title ? this.state.title.toString() : undefined}
                        onChange={(value) => this.setState({ title: value })}
                    />

                    <Text style={this.style.infoText}>{I18n.t('planner.empty_list_iniformation')}</Text>

                </Animated.View>

                <Animated.View style={[this.style.buttonContainer, { transform: [{ translateY: buttonTranslateY }] }]}>
                    <ButtonBig lightShadow text={buttonText} onPress={this.onButtonPress} />
                </Animated.View>
            </Animated.View>

        );
    }

    _isTitleValid = () => this.state.title.length >= 3;

    _keyboardDidShow = () => {
        Animated.timing(this.containerTranslateY, {
            toValue: -100,
            useNativeDriver: true
        }).start()
    }

    _keyboardDidHide = () => {
        Animated.timing(this.containerTranslateY, {
            toValue: 0,
            useNativeDriver: true
        }).start()
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(EmptyList);
