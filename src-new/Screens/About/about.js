import React from 'react';
import Abstract from './../abstract';
import {View, TextInput, Dimensions} from 'react-native';
import {Container, Content, Card, CardItem, Icon, Text, Thumbnail, Left, Right, Body,
        Form, Item, Label, Input, H3, Button, Spinner, Toast} from 'native-base';
import PullUpHeader from './../../Components/PullUpHeader';
import FooterSaveButton from './../../Components/FooterSaveButton';

import Style from './../../Styles/style';
import Color from './../../Styles/color';
import I18n from './../../Translations/translations';

export default class about extends Abstract {
    emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    constructor(props) {
        super(props);

        this.state = {form: {email: '', text: ''}, form_valid: false};
    }

    onFormChange(value, field) {
        let form = this.state.form;

        let validEmail = false;
        let validText = false;
        form[field] = value;

        if (this.emailInputValid()) {
            validEmail = true;
        }

        if (form.text && form.text.length > 0) {
            validText = true;
        }

        this.setState({form: form, form_valid: validEmail && validText});
    }

    onFormSubmit() {

    }

    emailInputValid = () => (this.state.form.email.length >= 5 && this.emailRegex.test(this.state.form.email));

    render() {
        return (
            <Container>
                    <PullUpHeader back profile
                                  navigation={this.props.navigation}
                                  body={<Text style={Style.header.body.text}><Icon name="logo-freebsd-devil" style={{color: Color.orange.color}} size={20}/>Yo!</Text>}
                                  right={this.state.form_valid && <Button transparent onPress={this.onFormSubmit.bind(this)}><Text style={[Style.footerTab.button.text.active, {paddingLeft: 0, paddingRight:0}]}>Wyślij</Text></Button>}
                    />
                    <Content keyboardShouldPersistTaps="handled" keyboardDismissMode="none" onContentSizeChange={() => {this.contentScroll._root.scrollToEnd({animated: true})}} ref={(ref) => {this.contentScroll = ref}}>
                        <Card style={Style.card.container}>
                            <CardItem style={Style.card.cardItem.container}>
                                <View style={{marginRight: 30}}>
                                    <Thumbnail style={Style.avatar.image} large source={require('./../../Images/IMG_2970.jpg')} />
                                </View>
                                <Body style={{justifyContent: "center"}}>
                                    <Text style={Style.card.cardItem.text}>Artur Schroeder</Text>
                                    <Text style={Style.card.cardItem.text_note}>schroeder.artur@hotmail.com</Text>
                                </Body>
                            </CardItem>
                        </Card>

                        {false && <Card style={[Style.card.container, {marginTop: 10}]}>
                            <CardItem style={[Style.card.cardItem.container]}>
                                <Text style={Style.card.cardItem.text}>{ I18n.t('about.form.header') }</Text>
                            </CardItem>
                        </Card>}
                        {false && <Form style={[Style.card.container, Style.card.cardItem.container]}>
                                <Item style={[Style.card.cardItem.input_with_icon.container]}>
                                    <Input
                                        keyboardAppearance="dark"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType={"email-address"}
                                        style={[Style.card.cardItem.input_with_icon.input, {marginLeft: 5}]}
                                        value={this.state.form.email}
                                        placeholder={I18n.t('about.form.email_placeholder')}
                                        placeholderTextColor={Color.white.colorHalf}
                                        onChangeText={(text) => {this.onFormChange(text, 'email')}}/>
                                    {this.emailInputValid() && <Icon active name='ios-checkmark-circle-outline' style={[Style.card.cardItem.input_with_icon.icon, {backgroundColor: 'transparent', marginTop: 3, color: Color.green.color}]}/>}
                                    {this.state.form.email.length > 1 && !this.emailInputValid() && <Icon active name='ios-alert-outline' style={[Style.card.cardItem.input_with_icon.icon, {backgroundColor: 'transparent', marginTop: 3, color: Color.red.color}]}/>}
                                </Item>
                                <Item style={[Style.card.cardItem.input_multi_line.container]}>
                                    <TextInput
                                        keyboardAppearance="dark"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType={"default"}
                                        autoGrow={true}
                                        multiline={true}
                                        style={[Style.card.cardItem.input_multi_line.input]}
                                        placeholder={I18n.t('about.form.text_placeholder')}
                                        placeholderTextColor={Color.white.colorHalf}
                                        value={this.state.form.text}
                                        onChangeText={(text) => {
                                            this.onFormChange(text, 'text')
                                        }}/>
                                </Item>
                        </Form>}

                    </Content>
                    <FooterSaveButton text={I18n.t('buttons.send')} onPress={() => {this.onFormSubmit()}} changed={this.state.form_valid}/>
            </Container>
        );
    }
}