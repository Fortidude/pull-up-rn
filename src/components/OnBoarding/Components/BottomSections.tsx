import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import I18n from 'src/assets/translations';

interface Props {
    skip?: () => void;
    goNext?: () => void;
    finish?: () => void;
}
export default (props: Props) => {
    return (
        <View style={[style.container, (!!props.goNext || !!props.skip) ? style.buttonNextContainer : style.buttonFinishContainer]}>
            {props.goNext && <TouchableOpacity onPress={props.goNext} style={[style.buttonContanier]}>
                <Text style={[style.text, { textAlign: 'center' }]}>{I18n.t('buttons.next').toUpperCase()}</Text>
            </TouchableOpacity>}
            {props.skip && <TouchableOpacity onPress={props.skip} style={[style.buttonContanier]}>
                <Text style={[style.text, { textAlign: 'center' }]}>{I18n.t('butttons.skip').toUpperCase()}</Text>
            </TouchableOpacity>}
            {props.finish && <TouchableOpacity onPress={props.finish} style={[style.buttonContanier]}>
                <Text style={[style.text, { textAlign: 'center' }]}>{I18n.t('buttons.finish').toUpperCase()}</Text>
            </TouchableOpacity>}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        height: 40,
        width: '100%',
        flexDirection: 'row'
    },

    buttonNextContainer: {
        justifyContent: 'flex-end'
    },

    buttonFinishContainer: {
        justifyContent: 'center'
    },

    buttonContanier: {
        height: '100%',
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderColor: 'rgba(255,255,255,0.5)',
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderRadius: 20
    },

    text: {
        fontSize: 15,
        width: '100%',
        color: 'white',
        letterSpacing: 2,
        fontFamily: 'Avenir-Light'
    }
});

