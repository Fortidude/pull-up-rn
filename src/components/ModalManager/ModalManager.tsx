import React from 'react';
import { Dispatch } from 'redux';
import { Animated, Dimensions, EventSubscription, Platform, Easing } from 'react-native';
import { connect } from 'react-redux';

import Styles from './ModalManager.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { ModalState } from 'src/store/reducers/modal';

import PickerModal from './Modals/PickerModal';
import DateTimePickerModal from './Modals/DateTimePickerModal/DateTimePickerModal';

import GoalInformationModal from './FullScreenModals/GoalInformationModal';
import EditGoalModal from './FullScreenModals/EditGoalModal';
import CreateGoalModal from './FullScreenModals/CreateGoalModal';
import ShortInformationModal from './Modals/ShortInformationModal/ShortInformationModal';

const HEIGHT = Dimensions.get('window').height;

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface,
    modal: ModalState
}

interface State {
    showFullScreenModal: boolean;
    showOverlay: boolean;
    modalWithoutOverlay: boolean;

    overlayOpacity: Animated.Value;
    containerTranslateY: Animated.Value;

    pickerBottomPosition: Animated.Value;
    pickerModal: boolean;
    pickerOptions: any;

    datetimePickerBottomPosition: Animated.Value;
    datetimePickerModal: boolean;
    datetimePickerOptions: any;

    modalEditGoalOpenProgress: Animated.Value;
    modalCreateGoalOpenProgress: Animated.Value;
    modalInformationOpenProgress: Animated.Value;
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
            showFullScreenModal: false,
            showOverlay: false,
            modalWithoutOverlay: false,

            overlayOpacity: new Animated.Value(0),
            containerTranslateY: new Animated.Value(-HEIGHT),

            pickerBottomPosition: new Animated.Value(-HEIGHT),
            pickerModal: false,
            pickerOptions: {},

            datetimePickerBottomPosition: new Animated.Value(-HEIGHT),
            datetimePickerModal: false,
            datetimePickerOptions: {},

            modalEditGoalOpenProgress: new Animated.Value(0),
            modalCreateGoalOpenProgress: new Animated.Value(0),
            modalInformationOpenProgress: new Animated.Value(0)
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return nextProps.theme.name !== this.props.theme.name
            || nextState.showOverlay !== this.state.showOverlay
            || nextState.modalWithoutOverlay !== this.state.modalWithoutOverlay
            || nextProps.modal.datetimePickerModalVisible !== this.props.modal.datetimePickerModalVisible
            || nextProps.modal.pickerModalVisible !== this.props.modal.pickerModalVisible
            || nextProps.modal.informationModalVisible !== this.props.modal.informationModalVisible

            || nextProps.modal.goalInformationModalVisible !== this.props.modal.goalInformationModalVisible
            || nextProps.modal.goalCreateModalVisible !== this.props.modal.goalCreateModalVisible
            || nextProps.modal.goalEditModalVisible !== this.props.modal.goalEditModalVisible

            || nextState.pickerOptions !== this.state.pickerOptions
            || nextState.datetimePickerOptions !== this.state.datetimePickerOptions
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        const isPickerModalVisible = this.isPickerModalVisible(nextProps);
        const isDateTimePickerModalVisible = this.isDateTimePickerModalVisible(nextProps);
        const isInformationModalVisible = this.isInformationModalVisible(nextProps);

        if (isPickerModalVisible) {
            this.showPickerModal(nextProps);
            return;
        }

        if (isDateTimePickerModalVisible) {
            this.showDatetimePickerModal(nextProps);
            return;
        }

        if (isInformationModalVisible) {
            this.showInformationModal(nextProps);
            return;
        }

        if (this.state.showOverlay || this.state.modalWithoutOverlay) {
            this.hideModal();
        }

        if (nextProps.modal.goalInformationModalVisible) {
            this.openFullScreenModal(this.state.modalInformationOpenProgress);
        }

        if (nextProps.modal.goalCreateModalVisible) {
            this.openFullScreenModal(this.state.modalCreateGoalOpenProgress);
        }

        if (nextProps.modal.goalEditModalVisible) {
            this.openFullScreenModal(this.state.modalEditGoalOpenProgress);
        }
    }

    isPickerModalVisible = (props: Props) => {
        return props.modal['pickerModalVisible'];
    }

    isDateTimePickerModalVisible = (props: Props) => {
        return props.modal['datetimePickerModalVisible'];
    }

    isInformationModalVisible = (props: Props) => {
        return props.modal['informationModalVisible'];
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

    showInformationModal = (props: Props) => {
        this.setState({ ...this.getUpdatedState(props), modalWithoutOverlay: true }, () => {
            Animated.parallel([
                Animated.timing(this.state.overlayOpacity, { toValue: 1 }),
            ]).start();
        });
    }

    hideModal = () => {
        console.log('hideModal');
        Animated.parallel([
            Animated.timing(this.state.overlayOpacity, { toValue: 0 }),
            Animated.timing(this.state.pickerBottomPosition, { toValue: -HEIGHT, ...CLOSE_MODAL_ANIMATION_OPTION }),
            Animated.timing(this.state.datetimePickerBottomPosition, { toValue: -HEIGHT, ...CLOSE_MODAL_ANIMATION_OPTION }),
        ]).start(() => {
            this.setState({ showOverlay: false, modalWithoutOverlay: false });
        });
    }

    getUpdatedState = (props: Props): State => {
        const state: State = this.state;
        state.pickerOptions = props.modal.pickerOptions;
        state.datetimePickerOptions = props.modal.datetimePickerOptions;
        return state;
    }

    openFullScreenModal = (animatedValue: Animated.Value) => {
        this.setState({ showFullScreenModal: true }, () => {
            Animated.timing(animatedValue, {
                toValue: 1,
                useNativeDriver: true,
                ...OPEN_MODAL_ANIMATION_OPTION_SLOW
            }).start();
        });
    }

    closeFullScreenModals = () => {
        Animated.parallel([
            Animated.timing(this.state.modalInformationOpenProgress, {
                toValue: 0,
                useNativeDriver: true,
                ...CLOSE_MODAL_ANIMATION_OPTION
            }),
            Animated.timing(this.state.modalCreateGoalOpenProgress, {
                toValue: 0,
                useNativeDriver: true,
                ...CLOSE_MODAL_ANIMATION_OPTION
            }),
            Animated.timing(this.state.modalEditGoalOpenProgress, {
                toValue: 0,
                useNativeDriver: true,
                ...CLOSE_MODAL_ANIMATION_OPTION
            })
        ]).start(() => {
            this.setState({ showFullScreenModal: false });
        });
    }

    render() {
        if (!this.state.showOverlay && !this.state.showFullScreenModal && !this.state.modalWithoutOverlay) {
            return (null);
        };

        const background = this.state.overlayOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: ['transparent', this.props.theme.colors.modalOverlayBackgroundColor]
        })

        return (
            <React.Fragment>
                {this.state.showFullScreenModal && <Animated.View style={this.style.fullScreenModalsContainer}>
                    <GoalInformationModal
                        positionX={this.props.modal.positionX}
                        positionY={this.props.modal.positionY}
                        openProgress={this.state.modalInformationOpenProgress}
                        onClose={this.closeFullScreenModals}
                    />

                    <CreateGoalModal
                        positionX={this.props.modal.positionX}
                        positionY={this.props.modal.positionY}
                        openProgress={this.state.modalCreateGoalOpenProgress}
                        onClose={this.closeFullScreenModals}
                    />

                    <EditGoalModal
                        positionX={this.props.modal.positionX}
                        positionY={this.props.modal.positionY}
                        openProgress={this.state.modalEditGoalOpenProgress}
                        onClose={this.closeFullScreenModals}
                    />
                </Animated.View>}

                {this.state.showOverlay && <Animated.View style={[this.style.overlay, { backgroundColor: background }]}>

                    <Animated.View style={{ bottom: this.state.pickerBottomPosition, position: 'absolute' }}>
                        <PickerModal {...this.state.pickerOptions} />
                    </Animated.View>

                    <Animated.View style={{ bottom: this.state.datetimePickerBottomPosition, position: 'absolute' }}>
                        <DateTimePickerModal {...this.state.datetimePickerOptions} />
                    </Animated.View>

                </Animated.View>}

                {this.state.modalWithoutOverlay && <Animated.View style={[{position: 'absolute', top: 10}, { opacity: this.state.overlayOpacity }]}>
                    <ShortInformationModal />
                </Animated.View>}
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
