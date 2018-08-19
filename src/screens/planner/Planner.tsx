import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Text, Button, View } from 'react-native';
import getStyle from './Planner.styles';

import { AppActions } from '../../store/actions/app';

type Props = {
    dispatch: void,
    getStyle: void
    theme: {},
};
class Planner extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.style = getStyle(this.props.theme);
    }

     componentWillReceiveProps(nextProps: Props) {
         if (nextProps.theme.name !== this.props.theme.name) {
             this.style = getStyle(nextProps.theme);
         }
     }

    changeTheme = (name) => {
        this.props.dispatch(AppActions.setTheme(name));
    };

    goToProfilePage = () => {
        this.props.dispatch(NavigationActions.navigate({routeName: 'Profile'}));
    };

    render() {
        return (
            <View style={this.style.container}>
                <Text>Planner</Text>

                <Text>{this.props.theme.name}</Text>
                {this.props.theme.name !== 'dark' && <Button onPress={() => this.changeTheme('dark')} title={'Dark'}/>}
                {this.props.theme.name !== 'light' &&
                <Button onPress={() => this.changeTheme('light')} title={'Light'}/>}
                <Button title="Profile" onPress={this.goToProfilePage}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    theme: state.app.theme
});

export default connect(mapStateToProps)(Planner);
