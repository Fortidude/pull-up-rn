import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { View, Animated } from 'react-native';

import { ThemeValueInterface, ThemeInterface } from '../../assets/themes';
import getStyle from './Planner.styles';
import PlannerList from './PlannerList';
import TopProgressBar from './TopProgressBar';
import ProfileModal from '../../components/ModalManager/Modals/ProfileModal';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    profileModalVisible: boolean;
};
interface State {
    plannerListScrollPositionY: Animated.Value;
}

class Planner extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(props.theme);
        this.state = {
            plannerListScrollPositionY: new Animated.Value(0)
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    componentDidUpdate(prevProps: Props) {
    }

    render() {
        return (
            <View style={this.style.container}>
                <TopProgressBar scrollViewPositionY={this.state.plannerListScrollPositionY}/>
                <PlannerList scrollBegin={() => {
                    // @ts-ignore
                    const value = this.state.plannerListScrollPositionY._value;
                    this.state.plannerListScrollPositionY.setValue(value + 1);
                }}/>
                <ProfileModal />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
});

export default connect(mapStateToProps)(Planner);
