import React from 'react';
import { TouchableOpacity, Text, View, Animated } from 'react-native';
import { NavigationActions, HeaderProps } from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/EvilIcons';

import Styles from './Header.styles';
import I18n from '../../assets/translations';
import RightText from './RightText';
import { ThemeInterface, ThemeValueInterface } from '../../assets/themes/index'

interface Props {
    headerProps: HeaderProps;
    dispatch: Dispatch;
    theme: ThemeInterface
}

interface State {
    back: boolean;
}

class Header extends React.Component<Props, State> {
    previousTitle: string = '';
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);
        this.style = Styles(this.props.theme);

        this.state = {
            back: false
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (!!nextProps.headerProps.scene.index) {
            let currentIndex = nextProps.headerProps.scene.index;
            this.previousTitle = nextProps.headerProps.scenes[currentIndex - 1].route.routeName;
        } else {
            this.previousTitle = '';
        }

        this.setState({ back: false });

        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    onBackPress = () => {
        this.setState({ back: true }, () => {
            this.props.dispatch(NavigationActions.back())
        })
    };

    getPreviousTitle = () => {
        return I18n.t(`routes.${this.previousTitle.toLocaleLowerCase()}`);
    };

    getCurrentTitle = () => {
        const routeName = this.props.headerProps.scene.route.routeName;
        return I18n.t(`routes.${routeName.toLocaleLowerCase()}`);
    };

    render() {
        return (
            <Animated.View style={[this.style.header]}>
                <View style={this.style.left.container}>
                    {!!this.previousTitle && <TouchableOpacity onPress={this.onBackPress} style={this.style.left.backButton}>
                        <Icon name={'chevron-left'} size={50} style={this.style.left.icon} />
                        <RightText back={this.state.back} value={this.getPreviousTitle()} />
                    </TouchableOpacity>}
                </View>
                <View style={this.style.center.container}>
                    <Text style={this.style.center.text} numberOfLines={1}>{this.getCurrentTitle()}</Text>
                </View>
                <View style={this.style.right.container}>
                </View>
            </Animated.View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.app.theme

});

export default connect(mapStateToProps)(Header);
