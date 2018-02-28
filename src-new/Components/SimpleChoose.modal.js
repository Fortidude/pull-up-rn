import React from 'react'
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { Text, Card, Input, Button, Item } from 'native-base';

import Modal from 'react-native-modal';

import Style, {isIos, borderRadiusIfApple} from './../Styles/style';
import Color from './../Styles/color';
import I18n from './../Translations/translations';

export default class SimpleChooseModal extends React.Component {
    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        collection: PropTypes.array.isRequired,

        onDismiss: PropTypes.func.isRequired,
        onChose: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            formValid: false
        }
    }

    _cancel() {
        this.props.onDismiss();
    }

    _choose(index) {
        this.props.onChose(index);
        this._cancel();
    }

    render() {
        let lastIndex = this.props.collection.length - 1;

        return (
            <Modal
                style={{justifyContent: 'flex-end'}}
                animationIn="fadeInUp"
                animationOut="fadeOutDown"
                backdropColor={Color.black.color}
                isVisible={this.props.isVisible}>

                <View style={{alignSelf: 'center', alignContent: 'center', width: Style.widthValue-40, marginLeft: 20, marginRight: 20, backgroundColor: 'transparent'}}>
                    <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={{paddingLeft: 20, paddingRight: 20, maxHeight: Style.heightValue/2}} contentContainerStyle={{justifyContent: 'center'}}>

                        {this.props.collection.map((item, index) => {
                            let style = [Style.card.cardItem.border_bottom, {borderBottomColor: Color.black.color, borderRadius: 0, backgroundColor: Color.light_black_02.color, width: Style.widthValue-40, justifyContent: 'center', alignSelf: 'center'}]

                            if (index === 0) {
                                style.push({borderTopLeftRadius: borderRadiusIfApple(15), borderTopRightRadius: borderRadiusIfApple(15)});
                            }

                            if (index === lastIndex) {
                                style.push({borderBottomLeftRadius: borderRadiusIfApple(15), borderBottomRightRadius: borderRadiusIfApple(15)});
                            }

                            return (
                                <Button key={index} transparent disabled={false}
                                        style={style}
                                        onPress={_ => {
                                            this._choose(index)
                                        }}>
                                    <Text numberOfLines={1} style={Style.card.cardItem.text}>{ item }</Text>
                                </Button>
                            )
                        })}

                    </ScrollView>
                    <View style={{marginTop: 30, flexDirection: 'row'}}>
                        <Button rounded={isIos()} bordered disabled={false}
                                style={{backgroundColor: Color.light_black_03.colorHalf, borderColor: Color.red.color, marginLeft: 20, marginRight: 20, flex: 1, justifyContent: 'center', alignSelf: 'center'}}
                                onPress={_ => {this._cancel()}}>
                            <Text style={{color: Color.white.color}}>{ I18n.t('buttons.cancel') }</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        );
    }
}