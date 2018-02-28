import React from 'react';
import Abstract from './../abstract';
import { View, TouchableHighlight, Alert, Platform } from 'react-native';
import {Container, Content, Card, CardItem, Icon, Text, Thumbnail, Body, Form,
    Spinner, Footer, Button, FooterTab, ListItem, Right, Left, Input, Picker, Item, Label} from 'native-base';

import Spinkit from 'react-native-spinkit';

import PullUpHeader from './../../Components/PullUpHeader';
import DataService from './../../Data/data';

import Style from './../../Styles/style';
import Color from './../../Styles/color';

class profile extends Abstract {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                email: this.props.user.email,
                name: this.props.user.name,
                sex: this.props.user.sex,
            },
            last_goal_set: null,
            last_goal_set_loading: true
        };

        DataService.getLastGoalSet().then(result => {
            let last = null;
            if (result && result.id && result.goal) {
                last = result
            }

            this.setState({last_goal_set: last, last_goal_set_loading: false})
        })
    }

    logout() {
        Alert.alert(
            'Czy na pewno chcesz się wylogować?',
            '',
            [
                {text: 'Anuluj', onPress: () => {}, style: 'cancel'},
                {text: 'Wyloguj się', onPress: () => {this.props.dispatchLogout()}},
            ],
            { cancelable: false }
        );
    }

    componentDidUpdate() {
        if (!this.props.logged) {
            this.navigateToLogin();
        }
    }

    render() {
        return (
            <Container style={{backgroundColor:'transparent'}}>
                <PullUpHeader back
                              navigation={this.props.navigation}
                              bodyText={this.props.user && this.props.user.name && this.props.user.name.split(' ')[0]}
                              right={<Button transparent onPress={() => {this.props.navigation.navigate('Settings')}}><Text numberOfLines={1} style={[Style.header.right.text_button]}>Ustawienia</Text></Button>}
                />

                {!this.state.loading && <Content keyboardShouldPersistTaps="handled" keyboardDismissMode="none">
                    <View style={[Style.profile.header.container, Platform.select({ios: {marginBottom: 30}})]}>
                        <View style={[Style.profile.header.cardItem.container]}>
                            <Left style={{flex: 1}}>

                                <Text numberOfLines={1} style={Style.profile.header.cardItem.text_note}>{ this.props.user.name }</Text>
                            </Left>
                            <Body style={{flex: 1, alignItems: 'center'}}>
                                <Thumbnail style={[Style.profile.header.avatar, Style.avatar.image, Platform.select({ios: {bottom: -80}})]} large source={this.props.user && this.props.user.avatar ? {'uri': this.props.user.avatar} : require('./../../Images/user_avatar.png')} />
                            </Body>
                            <Right style={{flex: 1}}>
                                <Text numberOfLines={1} style={Style.profile.header.cardItem.text_note}>{ this.props.user.email }</Text>
                            </Right>
                        </View>
                    </View>

                    <View style={[Style.card.container, Style.profile.card.container]}>
                        <CardItem style={[Style.card.cardItem.container, Style.profile.card.cardItem.container]}>
                            <Left style={Style.profile.card.cardItem.left}>
                                <Text style={Style.profile.card.cardItem.text}>
                                    Poziom
                                </Text>
                            </Left>
                            <Right style={{flex: 1}}>
                                <Text style={Style.profile.card.cardItem.text_blue}>
                                    w krótce
                                </Text>
                            </Right>
                        </CardItem>
                        {false && <CardItem style={[Style.card.cardItem.container, Style.profile.card.cardItem.container]}>
                            <Left style={Style.profile.card.cardItem.left}>
                                <Text style={Style.profile.card.cardItem.text}>
                                    Email
                                </Text>
                            </Left>
                            <Right style={{flex: 3}}>
                                <Text style={Style.profile.card.cardItem.text_note}>
                                    { this.props.user.email }
                                </Text>
                            </Right>
                        </CardItem>}
                        <CardItem style={[Style.card.cardItem.container, Style.profile.card.cardItem.container]}>
                            <Left style={Style.profile.card.cardItem.left}>
                                <Text style={Style.profile.card.cardItem.text}>
                                    Ostatnie ćwiczeine
                                </Text>
                            </Left>
                            <Right style={{flex: 1}}>
                                {this.state.last_goal_set && !this.state.last_goal_set_loading && <Text style={Style.profile.card.cardItem.text_note}>
                                    { this.state.last_goal_set.goal.exercise.name }
                                </Text>}
                                {!this.state.last_goal_set && !this.state.last_goal_set_loading && <Text style={Style.profile.card.cardItem.text_note}>
                                    -
                                </Text>}
                                {this.state.last_goal_set_loading && <Spinkit type="ThreeBounce" size={15} color={Style.touchColor.color}/>}
                            </Right>
                        </CardItem>
                        <CardItem style={[Style.card.cardItem.container, Style.profile.card.cardItem.container]}>
                            <Left style={Style.profile.card.cardItem.left}>
                                <Text style={Style.profile.card.cardItem.text}>
                                    Aktywność
                                </Text>
                            </Left>
                            <Right style={{flex: 1}}>
                                <Text style={Style.profile.card.cardItem.text_note}>
                                    średnia
                                </Text>
                            </Right>
                        </CardItem>
                        <CardItem style={[Style.card.cardItem.container, Style.profile.card.cardItem.container]}>
                            <Left style={Style.profile.card.cardItem.left}>
                                <Text style={Style.profile.card.cardItem.text}>
                                    Obieg
                                </Text>
                            </Left>
                            <Right style={{flex: 1}}>
                                <Text style={Style.profile.card.cardItem.text_note}>
                                    1
                                </Text>
                            </Right>
                        </CardItem>
                    </View>


                    <Card style={[Style.card.container, {minHeight: Style.heightValue / 2, marginTop: 50}]}>
                    </Card>


                </Content>}

                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Button rounded style={[Style.footer_button.button, {marginBottom: 30, marginRight: 10, marginLeft: 20}]}
                                onPress={() => {this.props.navigation.navigate('About')}}>
                            <Text style={Style.footer_button.text}>O PROGRAMIE</Text>
                        </Button>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Button rounded style={[Style.footer_button.logout_button, {marginBottom: 30, marginRight: 20, marginLeft: 10}]}
                                onPress={this.logout.bind(this)}>
                            <Text style={Style.footer_button.text}>WYLOGUJ SIĘ</Text>
                        </Button>
                    </View>
                </View>

                {this.state.loading && <Content>
                    <Card style={Style.card.container}>
                        <CardItem style={[{alignSelf: 'center'}, Style.card.cardItem.container]}>
                            <Spinner color='#007aff'/>
                        </CardItem>
                    </Card>
                </Content>}
            </Container>
        );
    }
}

import {connect} from 'react-redux';
import { logout } from './../../Store/Auth/actions';

function mapStateToProps (state) {
    return {
        user: state.auth.user,
        logged: state.auth.logged,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        dispatchLogout: () => {dispatch(logout())}
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(profile)