import React from 'react';
import { TextInput, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Styles from './Input.styles';

interface Props {
    theme: {};
    value: string
}

class Input extends React.Component<Props> {
    style = {};

    constructor(props) {
        super(props);

        this.style = Styles(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    render() {
        return (
            <View style={this.style.container}>
            <TextInput
                style={this.style.input}
                onChangeText={() => {
                }}
                value={this.props.value}
                placeholder={this.props.placeholder}
                placeholderTextColor={this.style.placeholderColor}
            />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.app.theme
});

export default connect(mapStateToProps)(Input);
