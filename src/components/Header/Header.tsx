import React from 'react';
import { Text, View, Animated } from 'react-native';
import { HeaderProps } from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import Styles from './Header.styles';
import I18n from '../../assets/translations';
import BackButton from './BackButton';
import { ThemeInterface, ThemeValueInterface } from '../../assets/themes/index';
import RightIconNotification from './RightIconNotification';
import PlannerEditButton from './PlannerEditButton';

import HeaderStyleInterpolator from 'react-navigation-stack/dist/views/Header/HeaderStyleInterpolator.js';

interface Props {
    headerProps: HeaderProps;
    dispatch: Dispatch;
    theme: ThemeInterface;
    isOnline: boolean;
    plannerIsEmpty: boolean;
}

interface State { }

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

    showRightButton = () => {
        const routeName = this.getRawCurrentTitle().toLocaleLowerCase();
        if (routeName === 'planner' && !this.props.plannerIsEmpty) {
            return <PlannerEditButton />
        }

        return <BackButton headerProps={this.props.headerProps} />
    }

    render() {
        return (
            <Animated.View style={[this.style.header]}>
                <View style={this.style.left.container}>
                    {this.showRightButton()}
                </View>
                <View style={this.style.center.container}>
                    <Animated.Text numberOfLines={1} style={[this.style.center.text, HeaderStyleInterpolator.forCenter(this.props.headerProps)]}>
                        {this.getCurrentTitle()}
                    </Animated.Text>
                </View>
                <View style={this.style.right.container}>
                    <RightIconNotification />
                </View>
            </Animated.View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    isOnline: state.app.isOnline,
    plannerIsEmpty: state.planner.byTrainingsEmpty
});

export default connect(mapStateToProps)(Header);
