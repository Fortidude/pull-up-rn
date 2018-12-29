import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { View, Keyboard, ScrollView, Text, TouchableOpacity } from 'react-native';
import I18n from 'src/assets/translations';

import EvilIcon from 'react-native-vector-icons/EvilIcons';

import Styles from './Content.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import Events from 'src/service/Events';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    switchToCreateGoalView?: () => void;
    isVisible?: boolean;
}

class CreateExerciseModal extends React.Component<Props> {
    style: ThemeValueInterface;
    keyboardDidShowListener: any;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    componentDidMount() {
        Events.listenTo('HEADER_SAVE_CLICKED', 'CreateExerciseModal', this.onSuccess);
        Events.listenTo('HEADER_CANCEL_CLICKED', 'CreateExerciseModal', this.onClose);

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    }

    componentWillUnmount() {
        Events.remove('HEADER_SAVE_CLICKED', 'CreateExerciseModal');
        Events.remove('HEADER_CANCEL_CLICKED', 'CreateExerciseModal');
        this.keyboardDidShowListener.remove();
    }

    onSuccess = () => {
        if (this.props.isVisible === false) {
            console.log('Exercise is not visible, return');
            return;
        }
    }

    onClose = () => {

    }

    render() {
        return (
            <ScrollView
                ref="scrollView"
                style={this.style.content}
                onTouchStart={() => { Keyboard.dismiss() }}
                keyboardShouldPersistTaps="always">

                {this.props.switchToCreateGoalView && <View style={this.style.buttonLine.container}>
                    <TouchableOpacity style={this.style.buttonLine.button} onPress={this.props.switchToCreateGoalView}>
                        <EvilIcon name="chevron-left" style={this.style.buttonLine.buttonIcon} size={this.props.theme.fonts.fontH3Size * 3} />
                        <Text style={this.style.buttonLine.buttonText}>{I18n.t('modals.createExerciseModal.addGoalButtonText')}</Text>
                    </TouchableOpacity>
                </View>}
            </ScrollView>
        );
    }

    _keyboardDidShow = (event: any) => {
        const keyboardHeight = event.endCoordinates.height;
        //@ts-ignore
       // this.refs.scrollView.scrollTo({ y: (HEIGHT - (HEADER_HEIGHT * 2) - keyboardHeight) });
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(CreateExerciseModal);
