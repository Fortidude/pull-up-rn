import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {
    Header, Body, Left, Right, Text, View, Button, Icon, Title
} from 'native-base';
import MenuProfileTouchable from './MenuProfileTouchable';

import Style from './../Styles/style';
import Color from './../Styles/color';

const theme = {
    backgroundColor: Color.white.color,
    borderBottomColor: Color.black.color02,
    statusBarStyle: 'dark-content',
    statusBarBackground: 'white',
    backColor: Color.black.color,
    titleColor: Color.black.color,
    rightColor: Color.black.color,

    fontWeight: '400',
}

const themeDark = {
    backgroundColor: Color.background.color, //Color.light_black.colorHalf,
    borderBottomColor: Color.white.color02,
    statusBarStyle: 'light-content',
    statusBarBackground: 'black',
    backColor: Color.white.color,
    titleColor: Color.white.color08,
    rightColor: Color.white.color,

    fontWeight: '200',
}

class PullUpHeader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false,

            theme: props.lightTheme ? theme : themeDark
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.lightTheme !== this.props.lightTheme) {
            this.setState({theme : nextProps.lightTheme ? theme : themeDark})
        }
    }

    render() {
        return (
            <Header style={[Style.header.container, {paddingLeft: 0, paddingRight: 0, backgroundColor: this.state.theme.backgroundColor, borderBottomColor: this.state.theme.borderBottomColor}]}>
                <StatusBar barStyle={this.state.theme.statusBarStyle} backgroundColor={this.state.theme.statusBarBackground}/>
                <Left style={Style.header.left.container}>
                    {this.props.profileLeft && !this.props.profile && !this.props.left && !this.props.leftText && <MenuProfileTouchable navigation={this.props.navigation}/>}
                    {this.props.back && this.props.navigation && <Button style={{alignSelf: 'stretch', paddingLeft: 10}} onPress={() => this.props.navigation.dispatch({ type: 'Navigation/BACK' }) } transparent>
                        <Icon name="ios-arrow-back" style={[Style.header.left.back, {color: this.state.theme.backColor}]}/>
                    </Button>}
                    {this.props.customBackFn && this.props.navigation && <Button onPress={() => this.props.customBackFn() } transparent>
                        <Icon name="ios-arrow-back" style={[Style.header.left.back, {color: this.state.theme.backColor}]}/>
                    </Button>}
                    {this.props.leftText && !this.props.back && <Text numberOfLines={1}  style={[Style.header.body.text, {color: this.state.theme.titleColor, fontWeight: this.state.theme.fontWeight}]}>{ this.props.leftText}</Text>}
                    {!this.props.leftText && !this.props.back && this.props.left && <View style={{marginTop: 5}}>{ this.props.left}</View>}
                    {!this.props.leftText && !this.props.back && !this.props.left && <View></View>}
                </Left>

                <Body style={Style.header.body.container}>
                    {this.props.bodyText && <Text numberOfLines={1} style={[Style.header.body.text, {color: this.state.theme.titleColor, fontWeight: this.state.theme.fontWeight}]}>{ this.props.bodyText }</Text>}
                    {!this.props.bodyText && this.props.body && <View>{ this.props.body }</View>}
                    {!this.props.bodyText && !this.props.body && <View></View>}
                </Body>

                <Right style={Style.header.right.container}>
                    {this.props.profile && !this.props.right && !this.props.rightText && <MenuProfileTouchable navigation={this.props.navigation}/>}
                    {this.props.rightText && <Text numberOfLines={1} style={[Style.header.right.text, {color: this.state.theme.rightColor, fontWeight: this.state.theme.fontWeight}]}>{ this.props.rightText }</Text>}
                    {!this.props.rightText && this.props.right && <View style={{marginTop: 5}}>{ this.props.right }</View>}
                    {!this.props.rightText && !this.props.right && <View></View>}
                </Right>
            </Header>
        );
    }
}

export default PullUpHeader;
