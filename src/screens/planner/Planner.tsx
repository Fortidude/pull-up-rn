import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { View, Modal, Animated } from 'react-native';

import I18n from '../../assets/translations';
import getStyle from './Planner.styles';
import { ThemeValueInterface, ThemeInterface } from '../../assets/themes';

import CircleProgress from '../../components/CircleProgress';
import PlannerList from './PlannerList';
import Profile from '../profile/Profile';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    profileModalVisible: boolean;
};
interface State {
    profileModalTop: any;
}

class Planner extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(props.theme);
        this.state = {
            profileModalTop: new Animated.Value(props.profileModalVisible ? 0 : 100)
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.profileModalVisible !== this.props.profileModalVisible) {
            const modalVisible = this.props.profileModalVisible;

            console.log('animate');
           Animated.timing(this.state.profileModalTop, {
               toValue: modalVisible ? 0 : 100,
               duration: 500
           }).start();
        }
    }

    render() {
        const profileModalTop = this.state.profileModalTop.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"]
        })

        return (
            <View style={this.style.container}>
                <View style={this.style.topCirclesContainer}>
                    <View style={[this.style.topCircleContainer, this.style.topCircleLeft]}>
                        <CircleProgress fill={33} progressWidth={2} subTitle={I18n.t('mics.effectiveness')} />
                    </View>
                    <View style={[this.style.topCircleContainer, this.style.topCircleRight]}>
                        <CircleProgress fill={75} progressWidth={3} title={"5 dni"} subTitle={I18n.t('mics.left')} />
                    </View>
                </View>
                <View style={this.style.listContainer}>
                    <PlannerList/>
                </View>

                <Animated.View style={[this.style.profileModalContainer, {top: profileModalTop}]}>
                    <Profile/>
                </Animated.View>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    profileModalVisible: state.modal.profileModalVisible
});

export default connect(mapStateToProps)(Planner);
