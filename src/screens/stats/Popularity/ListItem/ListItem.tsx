import React from 'react';
import { Dispatch } from 'redux';
import { Text, View, Dimensions, Animated } from 'react-native';
import { connect } from 'react-redux';

import Styles from './ListItem.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';

const WIDTH = Dimensions.get('window').width;
interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    name: string;
    percent: number;
    color: string;
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
    }

    componentDidMount() {
    }


    render() {
        const { name, percent, color } = this.props
        return (
            <View style={this.style.container}>
                <View style={this.style.leftContainer}>
                    <Text style={this.style.title}>{name}</Text>
                </View>
                <View style={this.style.rightContainer}>
                    <View style={[{backgroundColor: this.props.color}, this.style.percentContainer]}>
                        <Text style={this.style.percentText}>{percent}%</Text>
                    </View>
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
