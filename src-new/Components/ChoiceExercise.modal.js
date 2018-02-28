import React from 'react'
import PropTypes from 'prop-types';
import { View, StatusBar, Platform, Keyboard } from 'react-native';
import { Card, Input, Button, Item } from 'native-base';

import Modal from 'react-native-modal';

import ExerciseList from './ExerciseList';

import Style from './../Styles/style';
import Color from './../Styles/color';

export default class ChoiceExerciseModal extends React.Component {
    static propTypes = {
        isVisible: PropTypes.bool,

        exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
        onSelect: PropTypes.func.isRequired,
        onDismiss: PropTypes.func.isRequired,
        createExercise: PropTypes.func
    };

    static defaultProps = {
        isVisible: false,

        onDismiss: () => {}
    };

    constructor(props) {
        super(props);

        this.state = {
            keyboardHeight: 0
        }
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow(event) {
        this.setState({keyboardHeight: event.endCoordinates.height});
    }

    _keyboardDidHide() {
        this.setState({keyboardHeight: 0});
    }

    _cancel() {
        this.props.onDismiss();
    }

    _select(exercise) {
        this.props.onSelect(exercise);
        this._cancel();
    }

    render() {


        return (
            <Modal
                animationIn="fadeInUp"
                animationOut="fadeOutDown"
                backdropColor={Color.black.color}
                backdropOpacity={1}
                isVisible={this.props.isVisible}
                style={[{paddingLeft: 0, paddingRight: 0, marginLeft: 0, marginRight: 0}, Platform.select({android: {marginTop: 0, marginBottom: 0}}) ]}>

                {Platform.OS === 'ios' && <StatusBar hidden={true}/>}
                <View style={[Platform.select({android: {height: Style.heightValue - StatusBar.currentHeight - this.state.keyboardHeight}, ios: {height: Style.heightValue}}), {paddingBottom: 0, borderColor: Color.black.color, borderWidth: 0}]}>
                    <ExerciseList exercises={this.props.exercises} createExercise={this.props.createExercise} cancel={this._cancel.bind(this)} select={this._select.bind(this)}/>
                </View>
            </Modal>
        );
    }
}