import React from 'react';
import { Dispatch } from 'redux';
import { FlatList, Animated, View } from 'react-native';
import { connect } from 'react-redux';

import Data from '../../../api/data';
import GoalList from '../../../components/GoalList';
import Training from '../../../models/Training';
import getStyle from './PlannerList.styles';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface
    onScroll?: (position: number) => void;
}

interface State {
    trainings: Training[];
    scrollY: any;
}

class PlannerList extends React.Component<Props, State> {
    style: ThemeValueInterface;
    static defaultProps = {
        onScroll: (position: number) => { }
    }

    constructor(props: Props) {
        super(props);
        this.style = getStyle(props.theme)
        this.state = {
            trainings: [],
            scrollY: new Animated.Value(0),
        }
    }

    async componentWillMount() {
        const planner = await Data.getPlannerByTrainings();
        this.setState({ trainings: planner.trainings });
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    render() {
        return (
            <View style={this.style.listContainer}>
                <FlatList
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        {
                            listener: (event) => {
                                this.props.onScroll(event.nativeEvent.contentOffset.y);
                            }
                        }
                    )}
                    scrollEventThrottle={1}
                    showsVerticalScrollIndicator={false}
                    data={this.state.trainings}
                    renderItem={({ item, index }) => (
                        <GoalList training={item} isFirst={index === 0} />
                    )}
                />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(PlannerList);
