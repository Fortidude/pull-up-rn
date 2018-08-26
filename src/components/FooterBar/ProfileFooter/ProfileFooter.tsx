import React from 'react';
import { Dispatch } from 'redux';
import { View, Text, TouchableOpacity, ActionSheetIOS } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Styles from './ProfileFooter.styles';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import I18n from './../../../assets/translations';
import Avatar from '../Avatar';
import { AuthActions } from '../../../store/actions/auth';

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

    logout = () => {
        ActionSheetIOS.showActionSheetWithOptions({
            options: [I18n.t('buttons.cancel'), I18n.t('buttons.logout')],
            destructiveButtonIndex: 1,
            cancelButtonIndex: 0,
          },
          (buttonIndex) => {
            if (buttonIndex === 1) { 
                this.props.dispatch(AuthActions.logout());
             }
          });
    
    }

    render() {
        return (
            <View style={this.style.container} onLayout={this.props.onLayout}>
                <View style={this.style.leftSide}>
                    <Text style={this.style.leftMainText}>Username</Text>
                    <Text style={this.style.leftSubText}>User</Text>
                </View>
                <Avatar editMode />
                <TouchableOpacity style={this.style.rightSide} onPress={this.logout}>
                    <Text style={this.style.rightSideText}>{I18n.t('buttons.logout')}</Text>
                    <Icon name={"sign-out-alt"} style={this.style.rightSideIcon}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.app.theme
});

export default connect(mapStateToProps)(ProfileFooter);
