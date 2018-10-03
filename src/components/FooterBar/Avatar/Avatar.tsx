import React from 'react';
import { Dispatch } from 'redux';
import { View, TouchableOpacity, Image, Modal, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Styles from './Avatar.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { ModalActions } from 'src/store/actions/modal';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    profileEditMode?: boolean;
    plannerEditMode?: boolean;
    avatar: null | string;
}

interface State {
    component: React.ReactNode;
}

class Avatar extends React.Component<Props, State> {
    style: ThemeValueInterface;
    scaleValue = new Animated.Value(1);

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            component: this.getComponent(this.props),
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return nextProps.plannerEditMode !== this.props.plannerEditMode
            || nextProps.profileEditMode !== this.props.profileEditMode
            || nextProps.theme.name !== this.props.theme.name
            || nextProps.avatar !== this.props.avatar
            || nextState.component !== this.state.component;
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        this.processAnimate(nextProps);
    }

    onPress = () => {
        if (this.props.plannerEditMode) {
            this.props.dispatch(ModalActions.addTrainingSectionOpen());
            return;
        }

        if (this.props.profileEditMode) {
            return;
        }

        this.props.dispatch(ModalActions.profileOpen());
    }

    render() {
        
        return (
            <TouchableOpacity onPress={this.onPress}>
                <Animated.View style={[this.style.footerAvatar, { transform: [{ scale: this.scaleValue }] }]}>
                    {this.state.component}
                </Animated.View>
            </TouchableOpacity>
        );
    }

    processAnimate = (props: Props) => {
        Animated.timing(this.scaleValue, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true
        }).start(() => {
            this.setState({ component: this.getComponent(props) }, () => {
                Animated.timing(this.scaleValue, {
                    toValue: 1,
                    duration: 300,
                    easing: Easing.bezier(0.5, 2, 0.5, 1.2),
                    useNativeDriver: true
                }).start();
            });
        })
    }

    getComponent = (props: Props) => {
    
        if (props.profileEditMode) {
            return <Icon name="camera" style={[this.style.icon]} size={40} />
        }

        if (props.plannerEditMode) {
            return <Icon name="plus" style={[this.style.icon]} size={40} />;
        }

        if (props.avatar) {
            return <Image style={[this.style.image]} source={{ uri: props.avatar }} />;
        }

        return <Icon name="user-ninja" style={[this.style.icon]} size={40} />;
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    avatar: state.user.current ? state.user.current.avatar : null,
    plannerEditMode: state.app.plannerEditMode
});

export default connect(mapStateToProps)(Avatar);
