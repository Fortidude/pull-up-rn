import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { View } from 'react-native';

import I18n from '../../assets/translations';
import getStyle from './Planner.styles';
import { ThemeValueInterface, ThemeInterface } from '../../assets/themes';

import CircleProgress from '../../components/CircleProgress';
import PlannerList from './PlannerList';

type Props = {
    dispatch: Dispatch,
    getStyle: void
    theme: ThemeInterface,
};
class Planner extends React.Component<Props> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    componentDidMount() {
    }

    render() {
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
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(Planner);
