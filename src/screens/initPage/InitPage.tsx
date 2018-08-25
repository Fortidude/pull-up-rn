import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { View } from 'react-native';

import getStyle from './InitPage.styles';
import Spinner from '../../components/Spinner';
import { ThemeValueInterface, ThemeInterface } from '../../assets/themes';
import { AuthActions } from '../../store/actions/auth';

type Props = {
    dispatch: Dispatch,
    theme: ThemeInterface,
};
class PreLoad extends React.Component<Props> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);
    }

    componentDidMount() {
        this.props.dispatch(AuthActions.checkIfLogged());
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    render() {
        return (
            <View style={this.style.container}>
                <View style={this.style.content}>
                    <Spinner large />
                </View>

                <View style={this.style.footer}></View>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.app.theme,
    isLoading: state.auth.isLoading
});

export default connect(mapStateToProps)(PreLoad);
