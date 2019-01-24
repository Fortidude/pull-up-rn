import React from 'react';
import { Dispatch } from 'redux';
import { Text, Animated, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/EvilIcons';

import Styles from './ListHeader.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    show: boolean;
    name: string;
    onClose: () => void;
}

class SingleFilterItem extends React.Component<Props> {
    style: ThemeValueInterface;

    filterScale = new Animated.Value(0);

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);

        this.animateHeight();
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    componentDidUpdate() {
        this.animateHeight();
    }

    animateHeight = () => {
        const animations = [
            Animated.spring(this.filterScale, { toValue: this.props.show ? 1 : 0 }),
        ]

        if (this.props.show) {
            animations.reverse();
            Animated.sequence(animations).start();
            return;
        }

        Animated.parallel(animations).start();
    }

    render() {
        return (
            <Animated.View style={[this.style.itemContainer, { transform: [{ scale: this.filterScale }] }]}>
                <TouchableOpacity onPress={this.props.onClose} style={this.style.innerContainer}>
                    <View style={this.style.closeIconContainer}>
                        <Icon name="close" style={this.style.closeIcon} />
                    </View>
                    <Text style={this.style.text}>{this.props.name}</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
});

export default connect(mapStateToProps)(SingleFilterItem);
