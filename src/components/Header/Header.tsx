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
import Events from 'src/service/Events';

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
    borderBottom = new Animated.Value(0);

    routesWithoutBottomBorder = [
        'planner',
      //  'effectivenessstats'
    ]

    constructor(props: Props) {
        super(props);
        this.style = Styles(this.props.theme);
        this.state = {
            overrideTitle: null
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return nextProps.isOnline !== this.props.isOnline
            || nextProps.theme.name !== this.props.theme.name
            || nextProps.plannerIsEmpty !== this.props.plannerIsEmpty
            || nextProps.headerProps.scene.route.routeName !== this.props.headerProps.scene.route.routeName;
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        const routeName = nextProps.headerProps.scene.route.routeName.toLocaleLowerCase();
        Animated.timing(this.borderBottom, {
            toValue: this.routesWithoutBottomBorder.includes(routeName) ? 0 : 1,
            duration: 50
        }).start();
    }

    getRawCurrentTitle = () => this.props.headerProps.scene.route.routeName;
    getCurrentTitle = () => {
        const routeName = this.getRawCurrentTitle().toLocaleLowerCase();
        return I18n.t(`routes.${routeName.toLocaleLowerCase()}`);
    };

    getRightButton = () => {
        const routeName = this.getRawCurrentTitle().toLocaleLowerCase();
        if (routeName === 'planner' && !this.props.plannerIsEmpty) {
            return <PlannerEditButton />
        }

        return <BackButton headerProps={this.props.headerProps} />
    }

    render() {
        const borderBottomColor = this.borderBottom.interpolate({
            inputRange: [0, 1],
            outputRange: ['transparent', this.props.theme.borders.borderColor]
        });

        return (
            <Animated.View style={[this.style.header, { borderBottomColor: borderBottomColor }]}>
                <View style={this.style.left.container}>
                    {this.getRightButton()}
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
