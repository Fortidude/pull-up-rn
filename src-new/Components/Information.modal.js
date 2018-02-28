import React from 'react'
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, Card, Input, Button, Item } from 'native-base';

import Modal from 'react-native-modal';

import Style, {isIos} from './../Styles/style';
import Color from './../Styles/color';
import I18n from './../Translations/translations';

export default class Information extends React.Component {
    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired,

        onDismiss: PropTypes.func.isRequired
    };

    static defaultProps = {
        isVisible: false,
    };

    constructor(props) {
        super(props);
    }

    _dismiss() {
        this.props.onDismiss();
    }

    render() {
        let message = I18n.t(this.props.message);
        let lines = message.toString().split('\n');
        message = lines[0];
        lines.shift();
       // let subMessage = typeof lines[1] === 'string' ? lines[1] : null;


        return (
            <Modal
                animationIn="fadeInUp"
                animationOut="fadeOutUp"
                backdropColor={Color.black.color}
                isVisible={this.props.isVisible}>

                <View style={{alignSelf: 'center', alignContent: 'center', height:null, width: Style.widthValue-40, marginLeft: 20, marginRight: 20, paddingTop: 30, paddingBottom: 30, backgroundColor: Color.light_black_03.color}}>
                   <View style={{paddingLeft: 20, paddingRight: 20, justifyContent: 'center', alignSelf: 'stretch'}}>

                    <Text style={[Style.card.cardItem.text, {alignSelf: 'center'}]}>{ message }</Text>

                       {lines.map(subMessage => {
                           return <Text style={[Style.card.cardItem.text_note, {
                               alignSelf: 'center',
                               marginTop: 20
                           }]}>{ subMessage }</Text>;
                       })}
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 30}}>
                        <View style={{flex: 0.5}}></View>
                        <Button rounded={isIos()} bordered disabled={false}
                                style={{borderColor: Style.touchColor.color, marginLeft: 20, marginRight: 20, flex: 1, justifyContent: 'center', alignSelf: 'center'}}
                                onPress={_ => this._dismiss()}>
                            <Text style={{color: Color.white.color}}>{ I18n.t('buttons.ok') }</Text>
                        </Button>
                        <View style={{flex: 0.5}}></View>
                    </View>
                </View>
            </Modal>
        );
    }
}