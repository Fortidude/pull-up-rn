import React from 'react';
import { Dispatch } from 'redux';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Styles from './OfflineInformation.styles';
import { ThemeInterface, ThemeValueInterface } from '../../assets/themes';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface
}

class OfflineInformation extends React.Component<Props> {
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
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(OfflineInformation);
