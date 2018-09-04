import React from 'react';
import { Dispatch } from 'redux';
import { View, Modal } from 'react-native';
import { connect } from 'react-redux';
import Styles from './ModalManager.styles';
import { ThemeInterface, ThemeValueInterface } from '../../assets/themes';
import Profile from '../../screens/profile/Profile';
import { ModalState } from '../../store/reducers/modal';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface,
    modal: ModalState
}

interface State {}

class ModalManager extends React.Component<Props> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    render() {
        return (
            <View style={this.style.sampleElement}>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    modal: state.modal
});

export default connect(mapStateToProps)(ModalManager);
