import React from 'react';
import { Dispatch } from 'redux';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Styles from './ProfileFooter.styles';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import Avatar from '../Avatar';

interface Props {
    onLayout?: () => void;
    dispatch: Dispatch;
    theme: ThemeInterface
}

class ProfileFooter extends React.Component<Props> {
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
            <View style={this.style.container} onLayout={this.props.onLayout}>
                <View style={this.style.leftSide}>
                    <Text style={this.style.leftMainText}>Username</Text>
                    <Text style={this.style.leftSubText}>User</Text>
                </View>
                <Avatar editMode />
                <View style={this.style.rightSide}>
                    <Text style={this.style.rightSideText}>Wyloguj</Text>
                    <Icon name={"sign-out-alt"} style={this.style.rightSideIcon}/>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.app.theme
});

export default connect(mapStateToProps)(ProfileFooter);
