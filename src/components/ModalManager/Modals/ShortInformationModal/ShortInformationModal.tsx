import React from 'react';
import { Dispatch } from 'redux';
import { Text, View, TouchableOpacity } from 'react-native';
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

        const length = this.props.modalOptions.text.length;
       // if (length < 40) {
            setTimeout(() => {
                this.props.dispatch(ModalActions.informationClose());
            }, length > 70 ? 6000 : 4000);
       // }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    render() {
        const length = this.props.modalOptions.text.length;
      

        return (
            <View style={[this.style.container]}>
                {false && <Text numberOfLines={1} style={[this.style.title]}>{this.props.modalOptions.title.toLocaleUpperCase()}</Text>}
                <Text style={this.style.text}>{this.props.modalOptions.text}</Text>

                {false && length > 40 && <TouchableOpacity onPress={() => this.props.dispatch(ModalActions.informationClose())} style={this.style.dismissButtom.container}>
                    <Text style={this.style.dismissButtom.text}>OK</Text>
                </TouchableOpacity>}
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
