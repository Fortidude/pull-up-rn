import React from 'react';
import { Animated } from 'react-native';
import { connect } from 'react-redux';

import Styles from './FooterBar.styles';
import { ThemeInterface, ThemeValueInterface } from '../../assets/themes';
import PlannerFooter from './PlannerFooter';
import ProfileFooter from './ProfileFooter';

interface Props {
    theme: ThemeInterface;
    nav: { index: number, routes: { routeName: string }[] }
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

    plannerFooter = <PlannerFooter onLayout={() => this.onComponentLayout()} />
    profileFooter = <ProfileFooter onLayout={() => this.onComponentLayout()} />

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            component: null,
            height: new Animated.Value(0)
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    componentWillMount() {
        if (this.getComponentName(this.props)) {
            this.runAnimation(this.props);
        }
    }

    componentWillUpdate(nextProps: Props, nextState: State) {
        if (this.getComponentName(nextProps) !== this.getComponentName(this.props)) {
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
        if (this.routesForPlannerFooter.includes(routeName)) {
            return "Planner";
        }

        if (this.routesForProfileFooter.includes(routeName)) {
            return "Profile";
        }

        return null;
    }

    setComponentByProps(props: Props) {
        const componentName = this.getComponentName(props);
        let footerComponent = null;

        switch (componentName) {
            case "Planner":
                footerComponent = this.plannerFooter;
                break;
            case "Profile":
                footerComponent = this.profileFooter;
                break;
            default:
                footerComponent = null;
        }

        this.setState({ component: footerComponent });
    }

    render() {
        return (
            <Animated.View style={[this.style.container, { height: this.state.height }]}>
                {this.state.component}
            </Animated.View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    theme: state.settings.theme,
    nav: state.nav
});

export default connect(mapStateToProps)(FooterBar);
