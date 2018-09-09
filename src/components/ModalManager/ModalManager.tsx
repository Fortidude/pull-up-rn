import React from 'react';
import { Dispatch } from 'redux';
import { Animated, Dimensions, KeyboardAvoidingView, Keyboard, EventSubscription, Platform } from 'react-native';
import { connect } from 'react-redux';
import Styles from './ModalManager.styles';
import { ThemeInterface, ThemeValueInterface } from '../../assets/themes'; import { ModalState } from '../../store/reducers/modal';
import AddSetModal from '../AddSetModal';

const HEIGHT = Dimensions.get('window').height;

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface,
    modal: ModalState
}

interface State {
    showOverlay: boolean;
    overlayOpacity: Animated.Value;
    containerTranslateY: Animated.Value;
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
            overlayOpacity: new Animated.Value(0),
            containerTranslateY: new Animated.Value(-HEIGHT)
        }

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
        return nextProps.theme.name !== this.props.theme.name || nextProps.modal !== this.props.modal
            || nextState.showOverlay !== this.state.showOverlay
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        if (this.isModalVisible(nextProps)) {
            console.log('show');
            this.showModal();
        } else {
            console.log('hide');
            this.hideModal();
        }
    }

    _keyboardDidShow = (event: any) => {
        const keyboardHeight = event.endCoordinates.height;
        Animated.spring(this.state.containerTranslateY, { toValue: -(keyboardHeight / 2) }).start();
    }

    _keyboardDidHide = () => {
        Animated.spring(this.state.containerTranslateY, { toValue: -HEIGHT }).start();
    }

    isModalVisible = (nextProps: Props): boolean => {
        let visible = false;
        const modals = nextProps.modal;
        Object.keys(modals).forEach(modalName => {
            visible = visible || (modals[modalName] && modalName !== 'profileModalVisible');
        });

        return visible;
    }

    showModal = () => {
        this.setState({ showOverlay: true }, () => {
            Animated.sequence([
                Animated.timing(this.state.overlayOpacity, { toValue: 1, duration: 150 }),
                Animated.spring(this.state.containerTranslateY, { toValue: 0 })
            ]).start();
        });
    }

    hideModal = () => {
        this.keyboardDidHideListener.remove();
        Keyboard.dismiss();
        Animated.parallel([
            Animated.timing(this.state.containerTranslateY, { toValue: -HEIGHT, duration: 300 }),
            Animated.timing(this.state.overlayOpacity, { toValue: 0, duration: 150, delay: 100 })
        ]).start(() => {
            this.setState({ showOverlay: false });
        });
    }

    render() {
        if (!this.state.showOverlay) {
            return (null);
        };

        const background = this.state.overlayOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: ['transparent', this.props.theme.colors.modalBackgroundColor]
        })

        return (
            <Animated.View style={[this.style.overlay, { backgroundColor: background }]}>
                <Animated.View style={[this.style.container, { transform: [{ translateY: this.state.containerTranslateY }] }]}>
                    <AddSetModal />
                </Animated.View>
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
