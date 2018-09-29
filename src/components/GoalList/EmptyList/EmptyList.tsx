import React from 'react';
import { Dispatch } from 'redux';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import Styles from './EmptyList.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import ButtonBig from '../../ButtonBig';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface
}

class EmptyList extends React.Component<Props> {
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
        return (
            <View style={this.style.container}>
                <ButtonBig noShadow text={"Dodaj swój pierwszy trening"} onPress={() => {}} />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(EmptyList);
