import React, { ReactFragment } from 'react';
import { Dispatch } from 'redux';
import { Animated, Easing } from 'react-native';
import { connect } from 'react-redux';

import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import Styles from './GoalListContainer.styles';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    children: ReactFragment;

    active: boolean;
    height: number;
}

interface State {
    viewHeight: any;
    viewOpacity: any;
}

class GoalListContainer extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            viewHeight: new Animated.Value(props.active ? props.height : 0),
            viewOpacity: new Animated.Value(props.active ? 1 : 0)
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return true;
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    componentDidUpdate() {
        Animated.parallel([
            Animated.timing(this.state.viewHeight, {
                toValue: this.props.active ? this.props.height : 0,
                duration: 200,
                delay: this.props.active ? 0 : 50,

            }),
            Animated.timing(this.state.viewOpacity, {
                toValue: this.props.active ? 1 : 0,
                duration: 200,
                delay: this.props.active ? 100 : 0
            })
        ]).start();
    }

    render() {
        return (
            <Animated.View style={[this.style.goalListContainer, { height: this.state.viewHeight, opacity: this.state.viewOpacity }]}>
                {this.props.children}
            </Animated.View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    theme: state.settings.theme
});

export default connect(mapStateToProps)(GoalListContainer);
