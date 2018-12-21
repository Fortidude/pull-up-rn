import React from 'react';
import { Dispatch } from 'redux';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import Styles from './ShortInformationModal.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { ModalActions } from 'src/store/actions/modal';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    modalOptions: {
        title: string
        text: string
    }
}

class ASampleTemplate extends React.Component<Props> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);

        setTimeout(() => {
            this.props.dispatch(ModalActions.informationClose());
        }, 1500);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    render() {
        return (
            <View style={this.style.container}>
                <Text style={this.style.title}>{this.props.modalOptions.title.toLocaleUpperCase()}</Text>
                <Text style={this.style.text}>{this.props.modalOptions.text}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    modalOptions: state.modal.informationModalOptions
});

export default connect(mapStateToProps)(ASampleTemplate);
