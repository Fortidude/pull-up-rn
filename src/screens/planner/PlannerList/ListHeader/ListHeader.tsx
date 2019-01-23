import React from 'react';
import { Dispatch } from 'redux';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import Styles from './ListHeader.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import SettingListItem from 'src/components/SettingListItem/SettingListItem';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface
}

class ListHeader extends React.Component<Props> {
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
                <Text style={this.style.text}>Rozwiń </Text>
                <Text style={this.style.text}>Pokaż niewykonane</Text>
                
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(ListHeader);
