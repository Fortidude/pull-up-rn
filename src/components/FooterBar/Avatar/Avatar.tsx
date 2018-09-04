import React from 'react';
import { Dispatch } from 'redux';
import { View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Styles from './Avatar.styles';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import { NavigationActions } from 'react-navigation';
import { ModalActions } from '../../../store/actions/modal';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    editMode?: boolean;
    avatar: null|string;
}

class Avatar extends React.Component<Props> {
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

    onPress = () => {
        if (this.props.editMode) {
            // @TODO edit avatar / upload image

            return;
        }
    
        //this.props.dispatch(NavigationActions.navigate({ routeName: 'Profile' }));
        this.props.dispatch(ModalActions.profileOpen());
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onPress}>
                <View style={[this.style.footerAvatar]}>
                {!this.props.editMode && !this.props.avatar && <Icon name="user-ninja" style={[this.style.icon]} size={40}/>}
                {!this.props.editMode && this.props.avatar && <Image style={[this.style.image]} source={{uri: this.props.avatar}}/>}
                {this.props.editMode && <Icon name="camera" style={[this.style.icon]} size={40}/>}
                </View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    avatar: state.user.current ? state.user.current.avatar : null
});

export default connect(mapStateToProps)(Avatar);
