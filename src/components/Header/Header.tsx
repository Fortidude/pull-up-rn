import React from 'react';
import { Text, View, Animated } from 'react-native';
import { HeaderProps } from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import Styles from './Header.styles';
import I18n from '../../assets/translations';
import { ThemeInterface, ThemeValueInterface } from '../../assets/themes/index'
import BackButton from './BackButton';

interface Props {
    headerProps: HeaderProps;
    dispatch: Dispatch;
    theme: ThemeInterface
}

interface State {}

class Header extends React.Component<Props, State> {
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

    getRawCurrentTitle = () => this.props.headerProps.scene.route.routeName;
    getCurrentTitle = () => {
        const routeName = this.getRawCurrentTitle().toLocaleLowerCase();
        return I18n.t(`routes.${routeName.toLocaleLowerCase()}`);
    };

    render() {
        return (
            <Animated.View style={[this.style.header]}>
                <View style={this.style.left.container}>
                    <BackButton headerProps={this.props.headerProps}/>
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
    theme: state.settings.theme
});

export default connect(mapStateToProps)(Header);
