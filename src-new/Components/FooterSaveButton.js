import React, { Component } from 'react';

import { Platform, Animated } from 'react-native';
import {
    Container, Content, Card, CardItem, List, ListItem, Icon, Item, Thumbnail, Body, Left, Right,
    Spinner, Footer, Button, FooterTab, Toast,
    Form, Label, Picker, Input, Switch, Fab
} from 'native-base';

import PropTypes from 'prop-types';

import Color from './../Styles/color';
import Style, {isIphoneX} from './../Styles/style';

const height = isIphoneX() ? 85 : 55;
const buttonStyle = Style.footerTab.button;

const theme = {
    backgroundColor: Color.white.colorHalf,
}

const themeDark = {
    backgroundColor: Color.light_black_02.colorHalf
}

class FooterSaveButton extends React.Component {

    static propTypes = {
        changed: PropTypes.bool.isRequired,
        rounded: PropTypes.bool,

        containerStyle: PropTypes.object,
        textStyle: PropTypes.object,

        onPress: PropTypes.func,

        text: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.footerHeight = new Animated.Value(0);
        this.textFade = new Animated.Value(0);

        this.state = {
            theme: themeDark
        }
    }

    componentDidUpdate() {
        if (this.props.changed) {
            Animated.timing(this.footerHeight, {toValue: height, duration: 400}).start();
            Animated.timing(this.textFade, {toValue: 1, duration: 700}).start();
        } else {
            Animated.timing(this.footerHeight, {toValue: 0, duration: 400}).start();
            Animated.timing(this.textFade, {toValue: 0, duration: 200}).start();
        }
    }

    render() {
        const textStyle = this.props.textStyle ? [this.props.textStyle] : [];
        return (
            <Animated.View style={{height: this.footerHeight, elevation: 0}}>
                <Footer style={[{backgroundColor: this.state.theme.backgroundColor, borderTopColor: 'transparent', elevation: 0}, this.props.containerStyle]}>
                    <FooterTab style={[Style.footerTab.container, {minHeight: height}]}>
                        <Button disabled={!this.props.changed}
                                light
                                onPress={this.props.onPress ? this.props.onPress : () => {}}
                                style={[this.props.rounded ? buttonStyle.container_rounded : buttonStyle.container, Platform.OS !== 'ios' ? {display: this.props.changed ? 'flex' : 'none'} : {}, {height: height, backgroundColor: this.state.theme.backgroundColor}]}>
                            <Animated.Text
                                style={[buttonStyle.text.active, {opacity: this.textFade}, ...textStyle]}>{ this.props.text }</Animated.Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Animated.View>
        );
    }
}

export default FooterSaveButton;
