import React from 'react';
import { Animated } from 'react-native';
import { connect } from 'react-redux';

import Styles from './FooterBar.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import PlannerFooter from './PlannerFooter';
import ProfileFooter from './ProfileFooter';
import StatsFooter from './StatsFooter';
import CalendarFooter from './CalendarFooter';
import { ModalState } from 'src/store/reducers/modal';

interface Props {
    theme: ThemeInterface;
    nav: { index: number, routes: { routeName: string }[] },
    modal: ModalState
}

interface State {
    component: any;
    height: any;
}

class FooterBar extends React.Component<Props, State> {
    style: ThemeValueInterface;
    routesForPlannerFooter = [
        'planner'
    ];

    routesForProfileFooter = [
        'profile',
        'settings'
    ];

    routerForStatsFooter = [
        'effectivenessstats',
        'popularitystats',
        'progressstats'
    ];

    routesForCalendarBar = [
        'calendar'
    ];

    calendarFooter = <CalendarFooter onLayout={() => this.onComponentLayout()} />
    plannerFooter = <PlannerFooter onLayout={() => this.onComponentLayout()} />
    profileFooter = <ProfileFooter onLayout={() => this.onComponentLayout()} />
    statsFooter = <StatsFooter onLayout={() => this.onComponentLayout()} />

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            component: null,
            height: new Animated.Value(0)
        }
    }

    componentWillMount() {
        if (this.getComponentName(this.props)) {
            this.runAnimation(this.props);
        }
    }

    componentWillUpdate(nextProps: Props, nextState: State) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        const currName = this.getComponentName(this.props);
        const nextName = this.getComponentName(nextProps);
        if (currName !== nextName) {
            this.runAnimation(nextProps);
        }
    }

    runAnimation = (props: Props) => {
        this.getAnimateOut().start(() => {
            this.setComponentByProps(props)
        });
    }

    getAnimateIn = () => {
        return Animated.timing(this.state.height, {
            toValue: this.style.footerHeight,
            duration: 300
        })
    }

    getAnimateOut = () => {
        return Animated.timing(this.state.height, {
            toValue: 0,
            duration: 200
        })
    }

    onComponentLayout = () => {
        this.getAnimateIn().start();
    }

    getComponentName = (props: Props) => {
        const routeName = props.nav.routes[props.nav.index].routeName.toLocaleLowerCase();
        const profileModalVisible = props.modal.profileModalVisible;
        const pickerModalVisible = props.modal.pickerModalVisible;
        if (pickerModalVisible) {
            return null;
        }
        if (this.routesForPlannerFooter.includes(routeName) && !profileModalVisible) {
            return "Planner";
        }

        if (this.routesForProfileFooter.includes(routeName) || profileModalVisible) {
            return "Profile";
        }

        if (this.routerForStatsFooter.includes(routeName) && !profileModalVisible) {
            return "Stats"
        }

        if (this.routesForCalendarBar.includes(routeName)  && !profileModalVisible) {
            return "Calendar"
        }

        return null;
    }

    setComponentByProps(props: Props) {
        const componentName = this.getComponentName(props);
        const state: State = this.state;

        switch (componentName) {
            case "Planner":
                state.component = this.plannerFooter;
                break;
            case "Profile":
                state.component = this.profileFooter;
                break;
            case "Stats":
                state.component = this.statsFooter;
                break;
            case "Calendar":
                state.component = this.calendarFooter;
                break;
            default:
                state.component = null;
        }
        this.setState(state);
    }

    render() {
        if (!this.state.component) {
            return null;
        }
        return (
            <Animated.View style={[this.style.container, { height: this.state.height }]}>
                {this.state.component}
            </Animated.View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    theme: state.settings.theme,
    nav: state.nav,
    modal: state.modal
});

export default connect(mapStateToProps)(FooterBar);
