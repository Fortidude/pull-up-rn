import React from 'react'
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, Card, Input, Button, Item } from 'native-base';

import Modal from 'react-native-modal';

import Style, {isIos} from './../Styles/style';
import Color from './../Styles/color';
import I18n from './../Translations/translations';

export default class CreateSectionModal extends React.Component {
    static propTypes = {
        isVisible: PropTypes.bool,

        onDismiss: PropTypes.func,
        createSection: PropTypes.func.isRequired
    };

    static defaultProps = {
        isVisible: false,

        onDismiss: () => {}
    };

    constructor(props) {
        super(props);

        this.state = {
            formValid: false,
            name: '',
        }
    }

    _cancel() {
        this.setState({name: ''});
        this.props.onDismiss();
    }

    _create() {
        this.props.createSection(this.state.name);
        this._cancel();
    }

    _isValid = () => this.state.name.length >= 1;

    render() {
        return (
            <Modal
                animationIn="fadeInUp"
                animationOut="fadeOutUp"
                backdropColor={Color.black.color}
                isVisible={this.props.isVisible}>

                <View style={{alignSelf: 'center', alignContent: 'center', height: (Style.heightValue/3)+50, width: Style.widthValue-40, marginLeft: 20, marginRight: 20, backgroundColor: Color.light_black_03.color}}>
                    <View style={{flex:3, paddingLeft: 20, paddingRight: 20, justifyContent: 'center'}}>

                        <Text style={[Style.card.cardItem.text, {marginBottom: 20, marginTop: 20}]}>{ I18n.t('planner.sections.add_new') }</Text>

                        <Text style={[Style.card.cardItem.text_note]}>{ I18n.t('planner.sections.name') }</Text>
                        <Input style={Style.card.cardItem.input}
                               value={this.state.name.toString()}
                               selectTextOnFocus={true}
                               keyboardAppearance="dark"
                               autoCapitalize="none"
                               autoCorrect={false}
                               keyboardType={'default'}
                               onChangeText={value => this.setState({name: value})}
                        />
                    </View>
                    <View style={{flex:2, flexDirection: 'row'}}>
                        <Button rounded={isIos()} bordered disabled={!this._isValid()}
                                style={{borderColor: Style.touchColor.color, marginLeft: 20, marginRight: 10, flex: 1, justifyContent: 'center', alignSelf: 'center'}}
                                onPress={_ => this._create()}>
                            <Text style={{color: Color.white.color}}>{ I18n.t('buttons.create') }</Text>
                        </Button>
                        <Button rounded={isIos()} bordered disabled={false}
                                style={{borderColor: Color.red.color, marginLeft: 10, marginRight: 20, flex: 1, justifyContent: 'center', alignSelf: 'center'}}
                                onPress={_ => {this._cancel()}}>
                            <Text style={{color: Color.white.color}}>{ I18n.t('buttons.cancel') }</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        );
    }
}