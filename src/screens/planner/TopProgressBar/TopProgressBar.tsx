import React from 'react';
import { Dispatch } from 'redux';
import { View, Animated } from 'react-native';
import { connect } from 'react-redux';

import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import Styles from './TopProgressBar.styles';
import CircleProgress from '../../../components/CircleProgress';
import I18n from '../../../assets/translations';


interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    scrollViewPositionY: Animated.Value;
}

class TopProgressBar extends React.Component<Props> {
    style: ThemeValueInterface;
    static defaultProps = {
        scrollViewPositionY: new Animated.Value(0)
    }

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.props.scrollViewPositionY.addListener(console.log);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    render() {
        const containerTop = this.props.scrollViewPositionY.interpolate({
            inputRange: [-1000, 0, 110, 10000],
            outputRange: [0 ,0, -110, -110]
        })

    

        return (
            <Animated.View style={[this.style.topCirclesContainer, { top: containerTop }]}>
                <View style={[this.style.topCircleContainer, this.style.topCircleLeft]}>
                    <CircleProgress fill={33} progressWidth={2} subTitle={I18n.t('mics.effectiveness')} />
                </View>
                <View style={[this.style.topCircleContainer, this.style.topCircleRight]}>
                    <CircleProgress fill={75} progressWidth={3} title={"5 dni"} subTitle={I18n.t('mics.left')} />
                </View>
            </Animated.View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(TopProgressBar);
