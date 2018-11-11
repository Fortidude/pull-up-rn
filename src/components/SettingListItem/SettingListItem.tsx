import React from 'react';
import { Dispatch } from 'redux';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

import Styles from './SettingListItem.styles';
import { ThemeInterface, ThemeValueInterface } from '../../assets/themes';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface

    onPress: () => void;
    icon?: string;
    danger?: boolean;
    text: string;
    subText?: string;

    rightText?: string;
    rightArrow?: boolean;
    rightCheck?: boolean;

    last?: boolean;
}

class SettingListItem extends React.Component<Props> {
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
            <TouchableOpacity style={this.style.container} onPress={this.props.onPress}>
                {this.props.icon && <View style={[this.style.leftIconContainer]}>
                    <Icon name={this.props.icon}
                        style={[this.style.leftIcon, this.props.danger ? this.style.leftIconDanger : {}]} />
                </View>}
                <View style={this.style.centerTextContainer}>
                    <Text numberOfLines={1} style={this.style.centerText}>{this.props.text}</Text>
                    {this.props.subText && <Text numberOfLines={1} style={this.style.centerSubText}>{this.props.subText}</Text>}
                </View>
                <View style={this.style.rightAdditionalContainer}>
                    <View style={this.style.rightTextIconContainer}>
                        {this.props.rightText && <Text numberOfLines={1} style={this.style.rightText}>{this.props.rightText}</Text>}
                        {this.props.rightArrow && <EvilIcon name="chevron-right" style={this.style.rightArrowIcon} />}
                        {this.props.rightCheck && <Icon name="check" style={this.style.rightCheckIcon} />}
                        {!this.props.rightArrow && !this.props.rightCheck && <View style={this.style.rightPlaceholder}></View>}
                    </View>
                </View>
                <View style={[this.style.bottomBorderLine, !this.props.last && this.style.bottomBorderLineLastOnList]}></View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(SettingListItem);
