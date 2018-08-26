import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Button, View } from 'react-native';

import getStyle from './Profile.styles';
import { ThemeValueInterface, ThemeInterface } from '../../../assets/themes';

type Props = {
    dispatch: Dispatch,
    theme: ThemeInterface,
};
class Profile extends React.Component<Props> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    goToSettingsPage = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Settings' }));
    };

    render() {
        return (
            <View style={this.style.container}>
                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <Button title="Settings" onPress={this.goToSettingsPage} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.app.theme
});

export default connect(mapStateToProps)(Profile);
