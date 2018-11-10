import React from 'react';
import { Dispatch } from 'redux';
import { Animated, Dimensions, Keyboard, EventSubscription, Platform, Easing, View } from 'react-native';
import { connect } from 'react-redux';

import Styles from './ModalManager.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { ModalState } from 'src/store/reducers/modal';

import AddSetModal from './Modals/AddSetModal';
import CreateGoalModal from './Modals/CreateGoalModal';
import PickerModal from './Modals/PickerModal';
import AddTrainingSectionModal from './Modals/AddTrainingSectionModal';
import DateTimePickerModal from './Modals/DateTimePickerModal/DateTimePickerModal';
import { ModalActions } from 'src/store/actions/modal';

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
    addTrainingSectionModal: boolean

    pickerBottomPosition: Animated.Value;
    pickerModal: boolean;
    pickerOptions: any;

    datetimePickerBottomPosition: Animated.Value;
    datetimePickerModal: boolean;
    datetimePickerOptions: any;
}

const MODALS_HANDLED = [
    'addSetModalVisible',
    'goalCreateModalVisible',
    'addTrainingSectionModalVisible',
    'pickerModalVisible',
    'datetimeModalVisible'
];

export const OPEN_MODAL_ANIMATION_OPTION = { duration: 400, easing: Easing.bezier(0, 1.1, 0, 1) }
export const OPEN_MODAL_ANIMATION_OPTION_SLOW = { duration: 600, easing: Easing.bezier(0, 1.1, 0, 1) }

export const CLOSE_MODAL_ANIMATION_OPTION = { duration: 200, easing: Easing.bezier(0.95, 0.05, 0.795, 0.035) }
export const CLOSE_MODAL_ANIMATION_OPTION_SLOW = { duration: 400, easing: Easing.bezier(0.95, 0.05, 0.795, 0.035) }

/**
 * 
 * @TODO Refactorings, tests. A lot mess over here :/ 
 * 
 * FullScreenModals are not managed by this component - yet
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
            addTrainingSectionModal: false,

            pickerBottomPosition: new Animated.Value(-HEIGHT),
            pickerModal: false,
            pickerOptions: {},

            datetimePickerBottomPosition: new Animated.Value(-HEIGHT),
            datetimePickerModal: false,
            datetimePickerOptions: {}
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
            || nextState.pickerOptions !== this.state.pickerOptions
            || nextState.datetimePickerOptions !== this.state.datetimePickerOptions
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        if (this.isModalVisible(nextProps) > 0) {
            if (this.isPickerModalVisible(this.props) && !this.isPickerModalVisible(nextProps)) {
                this._animateClosePicker(nextProps);
            }

            if (this.isDateTimePickerModalVisible(this.props) && !this.isDateTimePickerModalVisible(nextProps)) {
                this._animateClosePicker(nextProps);
                Animated.spring(this.state.containerTranslateY, { toValue: 0 }).start();
            }

            this.showModal(nextProps);
        } else {
            this.hideModal(nextProps);
        }
    }

    _keyboardDidShow = (event: any) => {
        if (this.isDateTimePickerModalVisible(this.props)) {
            this.props.dispatch(ModalActions.datetimePickerClose());
        }

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

        this.setState({ keyboardVisible: false }, () => {
            if (this.isDateTimePickerModalVisible(this.props)) {
                Animated.spring(this.state.containerTranslateY, { toValue: -120 }).start();
            }
        });
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

    isDateTimePickerModalVisible = (props: Props) => {
        return props.modal['datetimePickerModalVisible'];
    }

    showModal = (props: Props) => {
        const state = this._getToggledState(props);
        state.showOverlay = true;

        // picker animate before setState - faster, but other modals may not working.
        if (this.isPickerModalVisible(props)) {
            Animated.timing(this.state.pickerBottomPosition, { toValue: 0, ...OPEN_MODAL_ANIMATION_OPTION }).start();
        }

        if (this.isDateTimePickerModalVisible(props)) {
            Animated.spring(this.state.containerTranslateY, { toValue: -120 }).start();
            Animated.timing(this.state.datetimePickerBottomPosition, { toValue: 0, ...OPEN_MODAL_ANIMATION_OPTION }).start();
        }

        this.setState(state, () => {
            const modalAnimations = [
                Animated.timing(this.state.overlayOpacity, { toValue: 1, duration: 150, }),
            ];

            if (!this.isPickerModalVisible(props) && !this.isDateTimePickerModalVisible(props) && this.isModalVisible(props) === 1) {
                modalAnimations.push(
                    Animated.timing(this.state.containerTranslateY, { toValue: 0, ...OPEN_MODAL_ANIMATION_OPTION })
                );
            }

            Animated.parallel(modalAnimations).start();
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

    hidePickerModal = (props: Props) => {
        let isAnotherModalVisible = false;
        let pickerModals = ['pickerModalVisible', 'datetimePickerModalVisible'];
        MODALS_HANDLED.forEach(modalName => {
            if (pickerModals.includes(modalName) && !isAnotherModalVisible) {
                isAnotherModalVisible = props.modal[modalName] && MODALS_HANDLED.includes(modalName);
            }
        });

        if (!isAnotherModalVisible) {
            this._animateClose(props);
        } else {
            this._animateClosePicker(props);
        }
    }

    _getToggledState = (props: Props) => {
        const state: State = Object.assign({}, this.state);
        state.addSetModal = props.modal.addSetModalVisible;
        state.createGoalModal = props.modal.goalCreateModalVisible;
        state.addTrainingSectionModal = props.modal.addTrainingSectionModalVisible;
        state.pickerModal = props.modal.pickerModalVisible;
        state.pickerOptions = props.modal.pickerOptions;
        state.datetimePickerModal = props.modal.datetimePickerModalVisible;
        state.datetimePickerOptions = props.modal.datetimePickerOptions;

        return state;
    }

    _animateClose = (props: Props) => {
        Animated.parallel([
            Animated.timing(this.state.containerTranslateY, { toValue: -HEIGHT, ...CLOSE_MODAL_ANIMATION_OPTION }),
            Animated.timing(this.state.pickerBottomPosition, { toValue: -HEIGHT, ...CLOSE_MODAL_ANIMATION_OPTION }),
            Animated.timing(this.state.datetimePickerBottomPosition, { toValue: -HEIGHT, ...CLOSE_MODAL_ANIMATION_OPTION }),
            Animated.timing(this.state.overlayOpacity, { toValue: 0, duration: 150, delay: 100 })
        ]).start(() => {
            const state = Object.assign(
                {},
                this._getToggledState(props),
                { showOverlay: false, cancelPressed: false, keyboardVisible: false, pickerOptions: {}, datetimePickerOptions: {} }
            );

            this.setState(state);
        });
    }

    _animateClosePicker = (props: Props) => {
        Animated.parallel([
            Animated.timing(this.state.pickerBottomPosition, {
                toValue: -HEIGHT, ...CLOSE_MODAL_ANIMATION_OPTION
            }),
            Animated.timing(this.state.datetimePickerBottomPosition, {
                toValue: -HEIGHT, ...CLOSE_MODAL_ANIMATION_OPTION
            })
        ]).start(() => {
            this.setState({ pickerOptions: {} });
        });
    }

    render() {
        if (!this.state.showOverlay) {
            return (null);
        };

        const background = this.state.overlayOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: ['transparent', this.props.theme.colors.modalOverlayBackgroundColor]
        })

        return (
            <React.Fragment>
                <Animated.View style={[this.style.overlay, { backgroundColor: background }]}>
                    <Animated.ScrollView
                        keyboardShouldPersistTaps={"always"}
                        pointerEvents={this.state.pickerModal ? 'none' : 'auto'}
                        scrollEnabled={this._scrollEnabled()}
                        onScroll={() => { Keyboard.dismiss() }}
                        contentContainerStyle={this.style.container}
                        style={[{ transform: [{ translateY: this.state.containerTranslateY }] }]}
                    >

                        {!!this.state.addSetModal && <AddSetModal style={this.state.pickerModal ? { backgroundColor: 'rgba(0,0,0,0.5)' } : {}} />}
                        {!!this.state.createGoalModal && <CreateGoalModal overlay={this.state.pickerModal} />}
                        {!!this.state.addTrainingSectionModal && <AddTrainingSectionModal />}

                    </Animated.ScrollView>

                    <Animated.View style={{ bottom: this.state.pickerBottomPosition, position: 'absolute' }}>
                        <PickerModal {...this.state.pickerOptions} />
                    </Animated.View>

                    <Animated.View style={{ bottom: this.state.datetimePickerBottomPosition, position: 'absolute' }}>
                        <DateTimePickerModal {...this.state.datetimePickerOptions} />
                    </Animated.View>

                </Animated.View>
            </React.Fragment>
        );
    }

    _scrollEnabled = () => {
        return !this.state.pickerModal
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    modal: state.modal
});

export default connect(mapStateToProps)(ModalManager);
