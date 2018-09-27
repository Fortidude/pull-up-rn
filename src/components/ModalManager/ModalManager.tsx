import React from 'react';
import { Dispatch } from 'redux';
import { Animated, Dimensions, Keyboard, EventSubscription, Platform } from 'react-native';
import { connect } from 'react-redux';

import Styles from './ModalManager.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { ModalState } from 'src/store/reducers/modal';

import AddSetModal from './Modals/AddSetModal';
import CreateGoalModal from './Modals/CreateGoalModal';
import PickerModal from './Modals/PickerModal';

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

    pickerBottomPosition: Animated.Value;
    pickerModal: boolean;
    pickerOptions: any
}

const MODALS_HANDLED = [
    'addSetModalVisible',
    'goalCreateModalVisible',
    'pickerModalVisible'
]

/**
 * 
 * @TODO Refactorings, tests. A lot mess over here :/ 
 * 
 */
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
            createGoalModal: false,

            pickerBottomPosition: new Animated.Value(-HEIGHT),
            pickerModal: false,
            pickerOptions: {}
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
        return this.isModalVisible(this.props) !== this.isModalVisible(nextProps)
            || nextProps.theme.name !== this.props.theme.name
            || nextState.showOverlay !== this.state.showOverlay
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        if (this.isModalVisible(nextProps) > 0) {
            this.showModal(nextProps);
            if (!this.isPickerModalVisible(nextProps)) {
                this._animateClosePicker(nextProps);
            }
        } else {
            this.hideModal(nextProps);
        }
    }

    _keyboardDidShow = (event: any) => {
        if (this.isModalVisible(this.props) === 0) {
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

        if (this.isModalVisible(this.props) > 0) {
            Animated.spring(this.state.containerTranslateY, { toValue: 0 }).start();
        }
    }

    isModalVisible = (props: Props): number => {
        let visible: number = 0;

        MODALS_HANDLED.forEach(modalName => {
            if ((props.modal[modalName] && MODALS_HANDLED.includes(modalName))) {
                visible++;
            }
        });

        return visible;
    }

    isPickerModalVisible = (props: Props) => {
        return props.modal['pickerModalVisible'];
    }

    showModal = (props: Props) => {
        const state = this._getToggledState(props);
        state.showOverlay = true;

        // picker animate before setState - faster, but other modals may not working.
        if (this.isPickerModalVisible(props)) {
            Animated.spring(this.state.pickerBottomPosition, { toValue: 20 }).start();
        }

        this.setState(state, () => {
            const modalAnimations = [
                Animated.timing(this.state.overlayOpacity, { toValue: 1, duration: 150 }),
            ];

            if (!this.isPickerModalVisible(props) && this.isModalVisible(props) === 1) {
                modalAnimations.push(Animated.spring(this.state.containerTranslateY, { toValue: 0 }));
            }

            Animated.sequence(modalAnimations).start();
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
        state.pickerModal = props.modal.pickerModalVisible;
        state.pickerOptions = props.modal.pickerOptions;

        return state;
    }

    _animateClose = (props: Props) => {
        Animated.parallel([
            Animated.timing(this.state.containerTranslateY, { toValue: -HEIGHT, duration: 300 }),
            Animated.timing(this.state.pickerBottomPosition, { toValue: -HEIGHT, duration: 300 }),
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

    _animateClosePicker = (props: Props) => {
        let anotherModalIsVisible = false;
        MODALS_HANDLED.forEach(modalName => {
            if (modalName !== 'pickerModalVisible' && !anotherModalIsVisible) {
                anotherModalIsVisible = props.modal[modalName] && MODALS_HANDLED.includes(modalName);
            }
        });

        if (!anotherModalIsVisible) {
            this._animateClose(props);
        } else {
            Animated.spring(this.state.pickerBottomPosition, { toValue: -HEIGHT }).start(() => {
                console.log('closed');
            });
        }
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
            <React.Fragment>
                <Animated.View style={[this.style.overlay, { backgroundColor: background }]}>
                    <Animated.ScrollView onScroll={() => { Keyboard.dismiss() }} contentContainerStyle={this.style.container} style={{ transform: [{ translateY: this.state.containerTranslateY }] }}>
                        {!!this.state.addSetModal && <AddSetModal />}
                        {!!this.state.createGoalModal && <CreateGoalModal />}
                    </Animated.ScrollView>

                    <Animated.ScrollView style={{ bottom: this.state.pickerBottomPosition, position: 'absolute' }}>
                        <PickerModal {...this.state.pickerOptions} />
                    </Animated.ScrollView>
                </Animated.View>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    modal: state.modal
});

export default connect(mapStateToProps)(ModalManager);
