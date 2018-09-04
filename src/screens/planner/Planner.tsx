import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { View, Modal, Animated } from 'react-native';

import { ThemeValueInterface, ThemeInterface } from '../../assets/themes';
import I18n from '../../assets/translations';
import getStyle from './Planner.styles';
import PlannerList from './PlannerList';
import Profile from '../profile/Profile';
import TopProgressBar from './TopProgressBar';
import ProfileModal from '../../components/ProfileModal';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    profileModalVisible: boolean;
};
interface State {}

class Planner extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(props.theme);
        this.state = {}
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
                <TopProgressBar />
                <View style={this.style.listContainer}>
                    <PlannerList />
                </View>

                <ProfileModal/>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
});

export default connect(mapStateToProps)(Planner);
