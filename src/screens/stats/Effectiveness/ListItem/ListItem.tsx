import React from 'react';
import { Dispatch } from 'redux';
import { Text, View, Dimensions, Animated } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Styles from './ListItem.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { StatisticGoalInterface } from 'src/models/Statistics';

const WIDTH = Dimensions.get('window').width;
interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    goal: StatisticGoalInterface;
    showSectionName: boolean;
}

class ListItem extends React.Component<Props> {
    style: ThemeValueInterface;
    progrerssTranslateX = new Animated.Value(-WIDTH);

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    componentDidUpdate() {
        this.countProgress(0);
    }

    componentDidMount() {
        this.countProgress(500);
    }

    countProgress = (delay: number) => {
        const toValue = WIDTH - ((WIDTH / 100) * this.props.goal.percentage);
        Animated.timing(this.progrerssTranslateX, {
            toValue: -toValue,
            delay: delay
        }).start();
    }

    render() {
        const { name, variant_name, section_name, percentage } = this.props.goal;

        return (
            <View style={this.style.container}>
                <Animated.View style={[this.style.progressBackground, { transform: [{ translateX: this.progrerssTranslateX }] }]}></Animated.View>
                <View style={this.style.leftContainer}>
                    <Text style={[this.style.title]}>{name}</Text>
                    <Text style={this.style.subTitle}>
                        {!!variant_name && <Text style={{ fontWeight: "500" }}>{variant_name}</Text>}
                        {!!variant_name && !!this.props.showSectionName && ", "}
                        {!!this.props.showSectionName && <Text>({section_name})</Text>}
                    </Text>
                </View>
                <View style={this.style.rightContainer}>
                    {percentage < 100 && <Text style={this.style.percentText}>{percentage}%</Text>}
                    {percentage === 100 && <Icon name="check" style={this.style.completed} />}
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(ListItem);
