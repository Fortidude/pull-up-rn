
import React from 'react';
import { Dispatch } from 'redux';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Styles from './ButtonCircle.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    style?: 'green' | 'red' | 'blue';
    hidden?: boolean;

    text: string;
    onPress: () => void;
}

class ButtonCircle extends React.Component<Props> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    render() {
        const backgroundColorStyle = this._getBackgroundColor();

        return (
            <TouchableOpacity onPress={this.props.onPress} style={[this.style.container, backgroundColorStyle]}>
                {!this.props.hidden && <View style={this.style.innerContent}>
                    <Text numberOfLines={1} adjustsFontSizeToFit style={this.style.text}>{this.props.text.toLocaleUpperCase()}</Text>
                </View>}
            </TouchableOpacity>
        );
    }

    _getBackgroundColor = (): object => {
        if (this.props.hidden) {
            return this.style.transparent;
        }

        switch (this.props.style) {
            case 'green':
                return this.style.green;
            case 'red':
                return this.style.red;
            case 'blue':
                return this.style.blue;
            default:
                return this.style.green;
        }
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(ButtonCircle);
