import React, {Component} from 'react';
import {
    Text,
    TouchableHighlight,
    Image
} from 'react-native';
import { Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import Style from './../Styles/style';

class MenuProfileTouchable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <TouchableHighlight
                activeOpacity={0.5} underlayColor='transparent'
                onPress={() => this.props.navigation.navigate('Profile')} style={{padding: 20}}>
                <Thumbnail style={Style.header.right.avatar} source={this.props.user && this.props.user.avatar ? {'uri': this.props.user.avatar} : require('./../Images/user_avatar.png')} />
            </TouchableHighlight>
        );
    }
}

import {connect} from 'react-redux';

function mapStateToProps (state) {
    return {
        user: state.auth.user
    }
}

function mapDispatchToProps (dispatch) {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MenuProfileTouchable);