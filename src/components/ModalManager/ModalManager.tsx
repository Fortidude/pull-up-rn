import React from 'react';
import { Dispatch } from 'redux';
import { Animated, Dimensions, KeyboardAvoidingView, Keyboard, EventSubscription, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import Styles from './ModalManager.styles';
import { ThemeInterface, ThemeValueInterface } from '../../assets/themes'; import { ModalState } from '../../store/reducers/modal';

import AddSetModal from './Modals/AddSetModal';
import CreateGoalModal from './Modals/CreateGoalModal';

const HEIGHT = Dimensions.get('window').height;

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface,
    modal: ModalState
}

interface State {
    showOverlay: boolean;
    cancelPressed: boolean;
    keyboardVisible: boolean;
    overlayOpacity: Animated.Value;
    containerTranslateY: Animated.Value;

    addSetModal: boolean;
    createGoalModal: boolean;
}

class ModalManager extends React.Component<Props, State> {
    style: ThemeValueInterface;

    keyboardDidShowListener: EventSubscription;
    keyboardDidHideListener: EventSubscription;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            showOverlay: false,
            cancelPressed: false,
            keyboardVisible: false,
            overlayOpacity: new Animated.Value(0),
            containerTranslateY: new Animated.Value(-HEIGHT),

            addSetModal: false,
            createGoalModal: false
        }
    }

    componentWillMount() {
        let keyboardShowEvent = "keyboardDidShow";
        let keyboardHideEvent = "keyboardDidHide";
        if (Platform.OS === 'ios') {
            keyboardShowEvent = "keyboardWillShow";
            keyboardHideEvent = "keyboardWillHide";
        }

        this.keyboardDidShowListener = Keyboard.addListener(keyboardShowEvent, this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener(keyboardHideEvent, this._keyboardDidHide);
    }

    componentWillUnmount() {
        if (this.keyboardDidShowListener) {
            this.keyboardDidShowListener.remove();
        }

        if (this.keyboardDidHideListener) {
            this.keyboardDidHideListener.remove();
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return this.isModalVisible(nextProps) !== this.isModalVisible(this.props)
            || nextProps.theme.name !== this.props.theme.name
            || nextState.showOverlay !== this.state.showOverlay
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        if (this.isModalVisible(nextProps)) {
            this.showModal(nextProps);
        } else {
            this.hideModal(nextProps);
        }
    }

    _keyboardDidShow = (event: any) => {
        if (!this.isModalVisible(this.props)) {
            return
        }

        const keyboardHeight = event.endCoordinates.height;
        Animated.spring(this.state.containerTranslateY, { toValue: -(keyboardHeight / 2) }).start();
        this.setState({ keyboardVisible: true });
    }

    _keyboardDidHide = () => {
        if (this.state.cancelPressed) {
            this._animateClose(this.props);
            return;
        }

        if (this.isModalVisible(this.props)) {
            Animated.spring(this.state.containerTranslateY, { toValue: 0 }).start();
        }
    }

    isModalVisible = (props: Props): boolean => {
        let visible = false;
        Object.keys(props.modal).forEach(modalName => {
            visible = (visible || (props.modal[modalName] && modalName !== 'profileModalVisible'));
        });

        return visible;
    }

    showModal = (props: Props) => {
        const state = this._getToggledState(props);
        state.showOverlay = true;

        this.setState(state, () => {
            Animated.sequence([
                Animated.timing(this.state.overlayOpacity, { toValue: 1, duration: 150 }),
                Animated.spring(this.state.containerTranslateY, { toValue: 0 })
            ]).start();
        });
    }

    hideModal = (props: Props) => {
        this.setState({ cancelPressed: true }, () => {
            if (this.state.keyboardVisible) {
                Keyboard.dismiss();
            } else {
                this._animateClose(props);
            }
        });
    }

    _getToggledState = (props: Props) => {
        const state: State = Object.assign({}, this.state);
        state.addSetModal = props.modal.addSetModalVisible;
        state.createGoalModal = props.modal.goalCreateModalVisible;

        return state;
    }

    _animateClose = (props: Props) => {
        Animated.parallel([
            Animated.timing(this.state.containerTranslateY, { toValue: -HEIGHT, duration: 300 }),
            Animated.timing(this.state.overlayOpacity, { toValue: 0, duration: 150, delay: 100 })
        ]).start(() => {
            const state = Object.assign(
                {},
                this._getToggledState(props),
                { showOverlay: false, cancelPressed: false, keyboardVisible: false }
            );
            this.setState(state);
        });
    }

    render() {
        if (!this.state.showOverlay) {
            return (null);
        };

        console.log(this.state);

        const background = this.state.overlayOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: ['transparent', this.props.theme.colors.modalBackgroundColor]
        })

        return (
            <Animated.View style={[this.style.overlay, { backgroundColor: background }]}>
                <Animated.ScrollView onScroll={() => {Keyboard.dismiss()}} contentContainerStyle={this.style.container} style={{ transform: [{ translateY: this.state.containerTranslateY }] }}>
                    {!!this.state.addSetModal && <AddSetModal />}
                    {!!this.state.createGoalModal && <CreateGoalModal />}
                </Animated.ScrollView>
            </Animated.View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    modal: state.modal
});

export default connect(mapStateToProps)(ModalManager);
