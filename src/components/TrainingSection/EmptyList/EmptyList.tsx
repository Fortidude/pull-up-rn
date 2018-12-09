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

    //  openAddTrainingSectionModal = () => {
    //   this.props.dispatch(ModalActions.addTrainingSectionOpen());
    //  }

    onButtonPress = () => {
        if (this.state.formVisible) {
            this.props.dispatch(AppActions.togglePlannerEdit(true));
            this.props.dispatch(PlannerActions.createSection(this.state.title, ''));

            this.setState({ formVisible: false, title: '' });
            Keyboard.dismiss();
            Animated.timing(this.formVisibleAnimation, {
                toValue: 0,
                useNativeDriver: true
            }).start();
            return;
        }

        this.setState({ formVisible: true })
        Animated.timing(this.formVisibleAnimation, {
            toValue: 1,
            useNativeDriver: true
        }).start(() => this.addTrainingSectionModalTitleInputRef.focus());
    }

    render() {
        let buttonText = this.state.formVisible ? I18n.t('buttons.close') : I18n.t('planner.add_first_training')
        buttonText = this.state.formVisible && this.state.title.length > 0 ? I18n.t('buttons.add') : buttonText;

        const buttonTranslateY = this.formVisibleAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [-EMPTY_LIST_HEIGHT/6, 50]
        });

        const formOpacity = this.formVisibleAnimation.interpolate({
            inputRange: [0, 0.7, 1],
            outputRange: [0, 0.1, 1]
        });

        return (
            <Animated.View style={[this.style.container, { transform: [{ translateY: this.containerTranslateY }] }]}>
                <Animated.View style={[this.style.formContainer, {opacity: formOpacity, transform: [{ scale: this.formVisibleAnimation }] }]}>
                    <Text style={this.style.form.label}>{I18n.t('fields.type_name')}</Text>
                    <Input medium
                        inputRef={ref => this.addTrainingSectionModalTitleInputRef = ref}
                        keyboardType={"default"}
                        value={this.state.title ? this.state.title.toString() : undefined}
                        onChange={(value) => this.setState({ title: value })}
                    />

                    <Text style={this.style.infoText}>Nazwą treningu może być dzień tygodnia ("Poniedziałek") lub typ ćwiczeń, np. "Trening Pull" czy "Trening nóg"</Text>

                </Animated.View>

                <Animated.View style={[this.style.buttonContainer, { transform: [{ translateY: buttonTranslateY }] }]}>
                    <ButtonBig lightShadow text={buttonText} onPress={this.onButtonPress} />
                </Animated.View>
            </Animated.View>

        );
    }

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
