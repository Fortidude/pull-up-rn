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
    overlayOpacity: Animated.Value;
    containerTranslateY: Animated.Value;

    pickerBottomPosition: Animated.Value;
    pickerModal: boolean;
    pickerOptions: any;

    datetimePickerBottomPosition: Animated.Value;
    datetimePickerModal: boolean;
    datetimePickerOptions: any;
}

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
            overlayOpacity: new Animated.Value(0),
            containerTranslateY: new Animated.Value(-HEIGHT),

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

        //   this.keyboardDidShowListener = Keyboard.addListener(keyboardShowEvent, this._keyboardDidShow);
        //   this.keyboardDidHideListener = Keyboard.addListener(keyboardHideEvent, this._keyboardDidHide);
    }

    componentWillUnmount() {
        // if (this.keyboardDidShowListener) {
        //     this.keyboardDidShowListener.remove();
        // }

        // if (this.keyboardDidHideListener) {
        //     this.keyboardDidHideListener.remove();
        // }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return nextProps.theme.name !== this.props.theme.name
            || nextState.showOverlay !== this.state.showOverlay
            || nextProps.modal.datetimePickerModalVisible !== this.props.modal.datetimePickerModalVisible
            || nextProps.modal.pickerModalVisible !== this.props.modal.pickerModalVisible
            || nextState.pickerOptions !== this.state.pickerOptions
            || nextState.datetimePickerOptions !== this.state.datetimePickerOptions
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        const isPickerModalVisible = this.isPickerModalVisible(nextProps);
        const isDateTimePickerModalVisible = this.isDateTimePickerModalVisible(nextProps);

        if (isPickerModalVisible) {
            this.showPickerModal(nextProps);
            return;
        }
        
        if (isDateTimePickerModalVisible) {
            this.showDatetimePickerModal(nextProps);
            return;
        }

        if (this.state.showOverlay) {
            this.hideModal();
        }
    }

    isPickerModalVisible = (props: Props) => {
        return props.modal['pickerModalVisible'];
    }

    isDateTimePickerModalVisible = (props: Props) => {
        return props.modal['datetimePickerModalVisible'];
    }

    showPickerModal = (props: Props) => {
        this.setState({ ...this.getUpdatedState(props), showOverlay: true }, () => {
            Animated.parallel([
                Animated.timing(this.state.overlayOpacity, { toValue: 1 }),
                Animated.timing(this.state.pickerBottomPosition, { toValue: 0, ...OPEN_MODAL_ANIMATION_OPTION_SLOW })
            ]).start();
        })
    }

    showDatetimePickerModal = (props: Props) => {
        this.setState({ ...this.getUpdatedState(props), showOverlay: true }, () => {
            Animated.parallel([
                Animated.timing(this.state.overlayOpacity, { toValue: 1 }),
                Animated.timing(this.state.datetimePickerBottomPosition, { toValue: 0, ...OPEN_MODAL_ANIMATION_OPTION_SLOW })
            ]).start();
        })
    }

    hideModal = () => {
        Animated.parallel([
            Animated.timing(this.state.overlayOpacity, { toValue: 0 }),
            Animated.timing(this.state.pickerBottomPosition, { toValue: -HEIGHT, ...CLOSE_MODAL_ANIMATION_OPTION }),
            Animated.timing(this.state.datetimePickerBottomPosition, { toValue: -HEIGHT, ...CLOSE_MODAL_ANIMATION_OPTION }),
        ]).start(() => {
            this.setState({ showOverlay: false });
        });
    }

    getUpdatedState = (props: Props): State => {
        const state: State = this.state;
        state.pickerOptions = props.modal.pickerOptions;
        state.datetimePickerOptions = props.modal.datetimePickerOptions;
        return state;
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
