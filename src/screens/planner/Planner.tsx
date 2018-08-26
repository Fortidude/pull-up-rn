import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Text, Button, View } from 'react-native';

import getStyle from './Planner.styles';
import { AppActions } from '../../store/actions/app';
import { ThemeValueInterface, ThemeInterface } from '../../assets/themes';
import { AuthActions } from '../../store/actions/auth';

import PlannerFooter from './../../components/FooterBar/PlannerFooter';

type Props = {
    dispatch: Dispatch,
    getStyle: void
    theme: ThemeInterface,
};
class Planner extends React.Component<Props> {
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

    changeTheme = (name: string) => {
        this.props.dispatch(AppActions.setTheme(name));
    };

    goToProfilePage = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Profile' }));
    };

    logout = () => {
        this.props.dispatch(AuthActions.logout());
    }

    render() {
        return (
            <View style={this.style.container}>
                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <Text>Planner</Text>

                    <Text>{this.props.theme.name}</Text>
                    {this.props.theme.name !== 'dark' && <Button onPress={() => this.changeTheme('dark')} title={'Dark'} />}
                    {this.props.theme.name !== 'light' &&
                        <Button onPress={() => this.changeTheme('light')} title={'Light'} />}
                    <Button title="Profile" onPress={this.goToProfilePage} />
                    <Button title="Logout" onPress={this.logout} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.app.theme
});

export default connect(mapStateToProps)(Planner);
