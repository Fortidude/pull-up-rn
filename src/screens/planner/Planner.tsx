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

    goToProfilePage = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Profile' }));
    };

    render() {
        return (
            <View style={this.style.container}>
                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <Text>Planner</Text>

                    <Text>{this.props.theme.name}</Text>
                    <Button title="Profile" onPress={this.goToProfilePage} />
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
