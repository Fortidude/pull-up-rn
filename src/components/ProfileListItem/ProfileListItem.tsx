import React from 'react';
import { Dispatch } from 'redux';
import { View, TouchableOpacity, Text, Switch } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Styles from './ProfileListItem.styles';
import { ThemeInterface, ThemeValueInterface } from '../../assets/themes';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface

    icon?: string;
    danger?: boolean;
    text: string;
}

class ProfileListItem extends React.Component<Props> {
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
            <TouchableOpacity style={this.style.container}>
                <View style={this.style.leftIconContainer}>
                    {this.props.icon && <Icon
                        name={this.props.icon}
                        style={[this.style.leftIcon, this.props.danger ? this.style.leftIconDanger : {}]} />}
                </View>
                <View style={this.style.centerTextContainer}>
                    <Text style={this.style.centerText}>{this.props.text}</Text>
                </View>
                <View style={this.style.rightAdditionalContainer}>
                    <Switch />
                </View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.app.theme
});

export default connect(mapStateToProps)(ProfileListItem);
