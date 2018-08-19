import React from 'react';
import { View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Styles from './ASampleTemplate.styles';

interface Props {
    dispatch: (action) => void;
    theme: {}
}

class ASampleTemplate extends React.Component<Props> {
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
            <View style={this.style.sampleElement}>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    theme: state.app.theme
});

export default connect(mapStateToProps)(ASampleTemplate);
