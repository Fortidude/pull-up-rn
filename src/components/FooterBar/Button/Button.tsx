import React from 'react';
import { Dispatch } from 'redux';
import { TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Styles from './Button.styles';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    iconName: string;
    text: string;
    isActive?: boolean;
}

class Button extends React.Component<Props> {
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
        let iconClass = [this.style.footerButtonInactive];
        let textClass = [this.style.footerButtonText];

        if (this.props.isActive) {
            iconClass = [this.style.footerButtonActive];
            textClass.push(this.style.footerButtonActive)
        }

        return (
            <TouchableOpacity style={this.style.footerButton}>
                <Icon name={this.props.iconName} size={20} style={iconClass} />
                <Text style={textClass}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(Button);
