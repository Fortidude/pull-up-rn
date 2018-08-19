import React from 'react';
import { View } from 'react-native';
import { NavigationActions, NavigationDispatch } from 'react-navigation';
import { connect } from 'react-redux';
import Styles from './ASampleTemplate.styles';
import { ThemeInterface } from '../../assets/themes';

interface Props {
    dispatch: NavigationDispatch;
    theme: ThemeInterface
}

class ASampleTemplate extends React.Component<Props> {
    style: any = {};

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
        return (
            <View style={this.style.sampleElement}>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.app.theme
});

export default connect(mapStateToProps)(ASampleTemplate);
