import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Styles from './ButtonBig.styles';

interface Props {
    theme: {};
    value: string
}

class ButtonBig extends React.Component<Props> {
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
            <TouchableOpacity style={this.style.container} onPress={this.props.onPress}>
                <Text style={this.style.text}>Przycisk</Text>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state) => ({
    theme: state.app.theme
});

export default connect(mapStateToProps)(ButtonBig);
