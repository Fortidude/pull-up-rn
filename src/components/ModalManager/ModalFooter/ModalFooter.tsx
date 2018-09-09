import React from 'react';
import { Dispatch } from 'redux';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import Styles from './ModalFooter.styles';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    successText: string;
    onSuccess: () => void;
    
    cancelText?: string;
    onCancel?: () => void;
}

class ModalFooter extends React.Component<Props> {
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
            <View style={this.style.container}>

                {this.props.onCancel &&
                    <TouchableOpacity onPress={this.props.onCancel} style={this.style.leftButton.container}>
                        <Text style={this.style.leftButton.text}>{this.props.cancelText}</Text>
                    </TouchableOpacity>
                }
                {this.props.onCancel &&
                    <View style={this.style.betweenButtons}></View>
                }
                <TouchableOpacity onPress={this.props.onSuccess} style={this.style.rightButton.container}>
                    <Text style={this.style.rightButton.text}>{this.props.successText}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(ModalFooter);
