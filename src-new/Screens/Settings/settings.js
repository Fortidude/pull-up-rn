import React from 'react';
import Abstract from './../abstract';
import { View, Alert, TouchableHighlight, Switch } from 'react-native';
import {
    Container, Content, Card, CardItem, Icon, Text, Thumbnail, Body, Left, Right,
    Spinner, Footer, Button, FooterTab, List, Toast, ListItem, Item, Form, Input, ActionSheet
} from 'native-base';

import ImagePicker from 'react-native-image-picker';

import I18n from './../../Translations/translations';
import PullUpHeader from './../../Components/PullUpHeader';
import FooterSaveButton from './../../Components/FooterSaveButton';
import InformationModal from './../../Components/Information.modal';
import SimpleChooseModal from './../../Components/SimpleChoose.modal';
import Spinkit from './../../Components/Spinner';

import Style from './../../Styles/style';
import Color from './../../Styles/color';

class settings extends Abstract {
    settings = {
        days_per_circuit: 0,
        name: '',
        planner_custom_mode: false,
        base64avatar: '',
        cardio_screen_on: false,
        light_theme: false
    };

    constructor(props) {
        super(props);

        this.state = {
            settings: this.settings,
            original: this.settings,

            avatar: null,
            avatat_loading: false,

            soon_available: false,

            select_mode_options: ['Podział na dni', 'Podział na sekcje (treningi)'],
            select_mode_modal: false
        };
    }

    componentDidMount() {
        let state = this.state.settings;
        state.days_per_circuit = this.props.store.auth.user.days_per_circuit;
        state.name = this.props.store.auth.user.name;
        state.planner_custom_mode = this.props.store.auth.user.planner_custom_mode;
        state.cardio_screen_on = this.props.store.settings.settings.cardio_screen_on;
        state.light_theme = false;//this.props.store.settings.settings.light_theme;

        let base64Avatar = this.props.store.auth.user.avatar;
        if (base64Avatar && base64Avatar.indexOf('data:image') === 0) {
            state.base64avatar = base64Avatar;
        }

        this.setState({settings: state, original: Object.assign({}, state)});
    }

    componentDidUpdate() {
        if (this.props.store.settings.loading && this.isFormChanged()) {
           // this.setState({original: this.state.settings});
        }

        if (!this.props.store.settings.loading && this.props.store.settings.updated) {
            this.props.dispatchResetUserInfo();
            this.setState({original: this.state.settings});
        }

        if (this.props.store.settings.error !== null) {
            let text = I18n.t('errors.' + this.props.store.settings.error);

            /**
             * @TODO Alert
             */
            Alert.alert(
                text,
                '',
                [
                    {text: 'OK', onPress: () => {}},
                ],
                { cancelable: false }
            );

            this.props.dispatchResetUserInfo();
        }
    }

    isFormChanged() {
        let changed = false;
        let settings = this.state.settings;
        let original = this.state.original;

        Object.keys(settings).forEach(key => {
            if (settings[key] !== original[key]) {
                changed = true;
            }
        });

        return changed;
    }

    updateField(field, value) {
        let state = Object.assign({}, this.state.settings);
        state[field] = value;

        this.setState({settings: state});
    }

    update() {
        this.props.dispatchUpdateSettings(this.state.settings);
    }

    changeAvatar() {
        this.setState({avatar_loading: true});
        let options = {
            title: 'Zmień swój Avatar',
            maxWidth: 300,
            maxHeight: 300,
            quality: 1,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                this.setState({avatar_loading: false});
            }
            else if (response.error) {
                this.setState({avatar_loading: false});
            }
            else if (response.fileSize > 600000) {
                let size = Math.round(response.fileSize / (1024 * 1024) * 100) / 100;
                Alert.alert(
                    'Zdjęcie jest za duże',
                    'Zdjęcie zostało zmniejszone do maksymalnie 400x400 px, jednak i tak jest wielkość to ' + size + ' MB. Maksymalny rozmiar to 0.6 MB.',
                    [
                        {text: 'OK', onPress: () => {}},
                    ],
                    { cancelable: false }
                );
                this.setState({avatar_loading: false});
            }
            else {
                //let source = {uri: response.uri};
                let image = 'data:image/jpeg;base64,' + response.data;
                let source = { uri: image };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                let settings = this.state.settings;
                settings.base64avatar = image;
                this.setState({
                    settings: settings,
                    avatar: source,
                    avatar_loading: false
                });
            }
        });
    }

    onDismissInformationModal() {
        this.setState({soon_available: false});
    }

    choosePlannerMode(index) {
        let settings = Object.assign({}, this.state.settings);
        if (index === 0) {
            settings.planner_custom_mode = false;
            this.setState({settings: settings});
            return;
        }

        if (index === 1) {
            settings.planner_custom_mode = true;
            this.setState({settings: settings});
        }
    }

    cardioScreenAwake(newValue) {
        let settings = Object.assign({}, this.state.settings);
        settings.cardio_screen_on = newValue;
        this.setState({settings: settings});
    }

    lightTheme(newValue) {
        this.setState({soon_available: true});
    }

    render() {
        let isFormChanged = this.isFormChanged();

        return (
            <Container style={{backgroundColor: 'transparent'}}>
                <PullUpHeader back
                              navigation={this.props.navigation}
                              body={<Text style={Style.header.body.text}>Ustawienia</Text>}
                              right={isFormChanged && !this.props.store.settings.loading && <Button transparent onPress={this.update.bind(this)}><Text style={Style.header.right.text_button}>Zapisz</Text></Button>}
                />

                <Content keyboardShouldPersistTaps="handled" keyboardDismissMode="none">

                    <Card style={Style.profile.header.container}>
                        <CardItem style={Style.profile.header.cardItem.container}>
                            <Left style={{flex: 1}}>
                                <Text style={Style.profile.header.cardItem.text_note}></Text>
                            </Left>
                            <Body style={{flex: 1, alignItems: 'center'}}>
                                <TouchableHighlight onPress={() => this.changeAvatar()} style={[Style.profile.header.avatar, {backgroundColor: 'transparent', borderRadius:100, overflow: 'visible'}]}>
                                    <View>
                                        {!this.state.avatar_loading && <Icon name="ios-camera" style={Style.profile.header.avatar_icon_change}/>}
                                        {!this.state.avatar && !this.state.avatar_loading && <Thumbnail  style={[Style.avatar.image]} large source={this.props.store.auth.user && this.props.store.auth.user.avatar && this.props.store.auth.user.avatar.length > 1 ? {'uri': this.props.store.auth.user.avatar} : require('./../../Images/user_avatar.png')} />}
                                        {this.state.avatar && !this.state.avatar_loading && <Thumbnail  style={[Style.avatar.image]} large source={this.state.avatar} />}
                                        {this.state.avatar_loading && <View style={{borderRadius: 40, height: 80, width: 80, overflow: 'hidden'}}>
                                            <Spinkit type="9CubeGrid" size={80} color={Style.touchColor.color}/>
                                        </View>}
                                    </View>
                                </TouchableHighlight>
                            </Body>
                            <Right style={{flex: 1}}>
                                <Text style={Style.profile.header.cardItem.text_note}></Text>
                            </Right>
                        </CardItem>
                    </Card>

                    {!this.props.store.settings.loading &&
                    <Form style={[Style.card.container, {marginTop: 20}]}>
                        <View style={Style.card.separator}></View>

                        <Text note style={[Style.card.text_header_sub]}></Text>

                        <Item last style={[Style.card.cardItem.input_with_icon.container, {opacity: 0.5}]}>
                            <Icon active name='ios-person-outline' style={Style.card.cardItem.input_with_icon.icon}/>
                            <Input
                                disabled={true} // @TODO
                                keyboardAppearance="dark"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType={'default'}
                                value={this.state.settings ? this.state.settings.name.toString() : ''}
                                style={Style.card.cardItem.input_with_icon.input}
                                onChangeText={(value) => {
                                    this.updateField('name', value);
                                }}
                            />
                        </Item>

                        <View style={Style.card.separator}></View>
                        <Text style={Style.card.text_header}>Treningi</Text>
                        <Text note style={[Style.card.text_header_sub]}></Text>

                        <Item last style={[Style.card.cardItem.container, {marginTop: 5, marginBottom: 5, paddingLeft: 0, marginLeft: 20, marginRight: 20}]}>
                            <Body style={{alignItems: 'flex-start', marginLeft: 10}}>
                                <Text style={Style.card.cardItem.text}>Czas trwania obiegu</Text>
                                <Text style={Style.card.cardItem.text_note}>wyrażona w dniach</Text>
                            </Body>
                            <Right style={{marginRight: 0, paddingRight: 0}}>
                                <Input
                                    keyboardAppearance="dark"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType={'phone-pad'}
                                    placeholder="..."
                                    value={this.state.settings ? this.state.settings.days_per_circuit.toString() : ''}
                                    style={[Style.card.cardItem.input, {width: Style.widthValue /3}]}
                                    onChangeText={(value) => {
                                        value = parseInt(value);
                                        if (isNaN(value)) {
                                            value = '';
                                        }

                                        this.updateField('days_per_circuit', value);
                                    }}
                                />
                            </Right>
                        </Item>
                        <Item last style={[Style.card.cardItem.container, {marginTop: 5, marginBottom: 5, paddingLeft: 0, marginLeft: 20, marginRight: 20}]}>
                            <Body style={{alignItems: 'flex-start', marginLeft: 10}}>
                                <Text style={Style.card.cardItem.text}>Planer mode</Text>
                                <Text style={Style.card.cardItem.text_note}>Grupowanie celów</Text>
                            </Body>
                            <Right style={{marginRight: 0, paddingRight: 0}}>
                                <Button transparent
                                        onPress={() => this.setState({select_mode_modal: true})}
                                        style={[Style.card.cardItem.input_with_icon.container, {width: Style.widthValue /3, paddingLeft: 5, marginLeft: 0, marginRight: 0, justifyContent: 'center'}]}>
                                    {this.state.settings.planner_custom_mode === false && <Text numberOfLines={1} style={[Style.card.cardItem.text_note, {paddingLeft: 0, paddingRight: 0, textAlign: 'center'}]}>Podział na dni</Text>}
                                    {this.state.settings.planner_custom_mode === true  && <Text numberOfLines={1} style={[Style.card.cardItem.text_note, {paddingLeft: 0, paddingRight: 0, textAlign: 'center'}]}>Podział na treningi</Text>}
                                </Button>
                            </Right>
                        </Item>
                        <Item last style={[Style.card.cardItem.container, {marginTop: 5, marginBottom: 5, paddingLeft: 0, marginLeft: 20, marginRight: 20}]}>
                            <Body style={{alignItems: 'flex-start', marginLeft: 10}}>
                                <Text style={Style.card.cardItem.text}>Cardio - awake</Text>
                                <Text style={Style.card.cardItem.text_note}>Nie wyłączaj ekranu w czasie odmierzania</Text>
                            </Body>
                            <Right style={{marginRight: 0, paddingRight: 0}}>
                                <Switch value={this.state.settings.cardio_screen_on}
                                        onValueChange={this.cardioScreenAwake.bind(this)}
                                        onTintColor={Style.touchColor.color}/>
                            </Right>
                        </Item>
                        <Item last style={[Style.card.cardItem.container, {marginTop: 5, marginBottom: 5, paddingLeft: 0, marginLeft: 20, marginRight: 20}]}>
                            <Body style={{alignItems: 'flex-start', marginLeft: 10}}>
                                <Text style={Style.card.cardItem.text}>Biały motyw</Text>
                            </Body>
                            <Right style={{marginRight: 0, paddingRight: 0}}>
                                <Switch value={this.state.settings.light_theme}
                                        onValueChange={this.lightTheme.bind(this)}
                                        onTintColor={Style.touchColor.color}/>
                            </Right>
                        </Item>

                        <View style={Style.card.separator}></View>

                    </Form>}

                    {this.props.store.settings.loading && <Spinkit style={{marginTop: Style.heightValue/4, alignSelf:'center'}}/>}
                </Content>

                <FooterSaveButton changed={isFormChanged && !this.props.store.settings.loading}
                                  onPress={this.update.bind(this)}
                                  text="Zapisz"/>

                <SimpleChooseModal isVisible={this.state.select_mode_modal}
                                   collection={this.state.select_mode_options}
                                   onDismiss={() => this.setState({select_mode_modal: false})}
                                   onChose={this.choosePlannerMode.bind(this)}/>

                <InformationModal onDismiss={this.onDismissInformationModal.bind(this)} isVisible={this.state.soon_available} message="informations.soon_available"/>
            </Container>
        );
    }
}

import { updateSettings, reset } from './../../Store/Settings/actions';
import { connect } from 'react-redux';

function mapStateToProps (state) {
    return {
        store: state
    }
}

function mapDispatchToProps (dispatch) {
    return {
        dispatchResetUserInfo: () => dispatch(reset()),
        dispatchUpdateSettings: (payload) => dispatch(updateSettings(payload)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(settings);
