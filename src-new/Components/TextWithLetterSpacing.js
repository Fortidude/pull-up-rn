import React from 'react'
import { StyleSheet, View } from 'react-native'
import Letter from './Letter'

import Style from './../Styles/style';

export default class TextWithLetterSpacing extends React.Component {
    constructor() {
        super();
    }

    _withLine() {
        return (<View style={Style.textHeaderContainer}>
            {(this.props.right || this.props.center) && <View style={[this.props.line ? Style.textHeaderLine : {flex: 1}, {marginRight: 5}]}></View>}
            {this._withoutLine()}
            {(this.props.left || this.props.center) && <View style={[this.props.line ? Style.textHeaderLine : {flex: 1}, {marginLeft: 5}]}></View>}
        </View>)
    }

    _withoutLine() {
        const { children, spacing, viewStyle, textStyle } = this.props;
        const letters = children.split('');

        return (<View style={[styles.container, viewStyle]}>
            {letters.map((letter, index) =>
                <Letter key={index} spacing={spacing} textStyle={textStyle}>
                    {letter}
                </Letter>
            )}
        </View>)
    }

    render() {
        if (this.props.line || this.props.center) {
            return this._withLine();
        }

        return this._withoutLine();
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
});
