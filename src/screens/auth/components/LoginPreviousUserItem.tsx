import React from 'react';
import { Text, Image, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';;
import { connect } from 'react-redux';

import User from 'src/models/User';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';

interface Props {
    theme: ThemeInterface;
    user: User;

    onPress: (email: string) => void;
}

class LoginPreviousUserItem extends React.Component<Props> {
    style: ThemeValueInterface;
    
    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);
    }
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onPress(this.props.user.email)} style={this.style.container}>
                <View style={this.style.avatar}>
                    {this._getAvatar()}
                </View>
                <Text numberOfLines={1} style={this.style.text}>{this.props.user.username}</Text>
            </TouchableOpacity>
        );
    }

    _getAvatar = () => {
        if (this.props.user.avatar) {
            return <Image style={this.style.avatarImage} source={{ uri: this.props.user.avatar }} />;
        }

        return <Icon name="user-ninja" style={{}} size={15} />;
    }
}

const mapStateToProps = (state: any) => ({
    theme: state.settings.theme
});

export default connect(mapStateToProps)(LoginPreviousUserItem);

function getStyle(theme: ThemeInterface) {
    return {
        container: {
            flexDirection: 'row',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            height: 30,
            width: 200,
            marginTop: 10,
            borderRadius: 5,
            shadowColor: theme.colors.buttonBigShadowColor,
            shadowOpacity: 0.5,
            shadowOffset: { width: 0, height: 3 }
        },
        avatar: {
            width: 30,
            height: 30,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.white,
            overflow: 'hidden'
        },
        avatarImage: {
            width: 30,
            height: 30
        },
        text: {
            fontFamily: theme.fonts.mainFontFamily,
            fontSize: theme.fonts.fontH3Size,
            textAlignVertical: 'center',
            textAlign: 'center',
            lineHeight: 30,
            marginLeft: 10
        }
    }
}
