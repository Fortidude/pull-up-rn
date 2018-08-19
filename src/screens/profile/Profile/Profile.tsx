import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import { Button, View } from 'react-native';
import getStyle from './Profile.styles';

type Props = {
    dispatch: void,
    theme: {},
};
class Profile extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.style = getStyle(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    goToSettingsPage = () => {
        this.props.dispatch(NavigationActions.navigate({routeName: 'Settings'}));
    };

    render() {
        return (
            <View style={this.style.container}>
                <Button title="Settings" onPress={this.goToSettingsPage}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    theme: state.app.theme
});

export default connect(mapStateToProps)(Profile);
