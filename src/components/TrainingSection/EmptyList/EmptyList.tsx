import React from 'react';
import { Dispatch } from 'redux';
import { Animated, Text, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import I18n from 'src/assets/translations';
import Styles from './EmptyList.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import ButtonBig from '../../ButtonBig';
import AddTraining from './AddTraining';
import PickFromList from './PickFromList';
import Spinner from 'src/components/Spinner/Spinner';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    loading: boolean;
}

interface State {
}

class EmptyList extends React.Component<Props, State> {
    style: ThemeValueInterface;

    containerTranslateY = new Animated.Value(0);
    firstVisibleAnimation = new Animated.Value(1);

    createOwnVisibleAnimation = new Animated.Value(0);
    pickOneVisibleAnimation = new Animated.Value(0);
    loaderVisible = new Animated.Value(0);

    addTrainingRef: any;
    pickRef: any;
    keyboardDidShowListener: any;
    keyboardDidHideListener: any;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
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

        if (nextProps.loading && !this.props.loading) {
            Animated.parallel([
                Animated.timing(this.loaderVisible, { toValue: 1, useNativeDriver: true }),
                Animated.spring(this.firstVisibleAnimation, { toValue: 0, useNativeDriver: true }),
                Animated.spring(this.createOwnVisibleAnimation, { toValue: 0, useNativeDriver: true }),
                Animated.spring(this.pickOneVisibleAnimation, { toValue: 0, useNativeDriver: true })
            ]).start();
        }
    }

    close = () => {
        Animated.parallel([
            Animated.spring(this.createOwnVisibleAnimation, { toValue: 0, useNativeDriver: true }),
            Animated.spring(this.pickOneVisibleAnimation, { toValue: 0, useNativeDriver: true }),
            Animated.spring(this.firstVisibleAnimation, { toValue: 1, useNativeDriver: true })
        ]).start();
    }

    createOwnPress = () => {
        this.addTrainingRef.focusInput();
        Animated.parallel([
            Animated.spring(this.createOwnVisibleAnimation, { toValue: 1, useNativeDriver: true }),
            Animated.spring(this.firstVisibleAnimation, { toValue: 0, useNativeDriver: true }),
        ]).start();
    }

    pickOnePress = () => {
        Animated.parallel([
            Animated.spring(this.pickOneVisibleAnimation, { toValue: 1, useNativeDriver: true }),
            Animated.spring(this.firstVisibleAnimation, { toValue: 0, useNativeDriver: true }),
        ]).start();
    }

    render() {
        const pickStepOpacity = this.firstVisibleAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });

        return (
            <Animated.View style={[this.style.container, { transform: [{ translateY: this.containerTranslateY }] }]}>
                <Animated.View style={[this.style.buttonContainer, { opacity: pickStepOpacity }]}>
                    <Text style={[this.style.headerText, { textTransform: 'uppercase', marginVertical: 20, }]}>Plan treningowy</Text>
                    <ButtonBig lightShadow icon="plus" text={I18n.t('planner.first_step.own_button_text')} onPress={this.createOwnPress} style={this.style.first_button} />
                    <ButtonBig lightShadow icon="bars" text={I18n.t('planner.first_step.predefined_button_text')} onPress={this.pickOnePress} style={this.style.last_button} />
                </Animated.View>

                <AddTraining
                    getRef={ref => this.addTrainingRef = ref}
                    visible={this.createOwnVisibleAnimation}
                    onClose={this.close}
                />
                <PickFromList
                    getRef={ref => this.pickRef = ref}
                    visible={this.pickOneVisibleAnimation}
                    onClose={this.close}
                />

                <Animated.View style={[this.style.buttonContainer, { transform: [{ scale: this.loaderVisible }] }]}>
                    <Spinner large />
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
    theme: state.settings.theme,
    loading: state.planner.loading
});

export default connect(mapStateToProps)(EmptyList);
