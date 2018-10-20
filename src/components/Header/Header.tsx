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

// @ts-ignore
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
        console.log(routeName);
        return I18n.t(`routes.${routeName.toLocaleLowerCase()}`);
    };

    showRightButton = () => {
        const routeName = this.getRawCurrentTitle().toLocaleLowerCase();
        if (routeName === 'planner' && !this.props.plannerIsEmpty) {
            // return <PlannerEditButton />
        }

        return <BackButton headerProps={this.props.headerProps} />
    }

    render() {
        const currentIndex = this.props.headerProps.scene.index;
        let previousTitle = '';
        if (this.props.headerProps.scenes[currentIndex - 1]) {
            previousTitle = this.props.headerProps.scenes[currentIndex - 1].route.routeName.toLocaleLowerCase();
        }

        return (
            <Animated.View style={[this.style.header]}>
                <View style={this.style.left.container}>
                    <BackButton headerProps={this.props.headerProps} />
                </View>
                <View style={this.style.center.container}>
                    <Animated.View style={HeaderStyleInterpolator.forCenter(this.props.headerProps)}>
                        <Text numberOfLines={1} style={[this.style.center.text]}>
                            {this.getCurrentTitle()}
                        </Text>
                    </Animated.View>
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
