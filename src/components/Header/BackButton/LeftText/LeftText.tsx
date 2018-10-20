import React from 'react';
import { Animated } from 'react-native';
import { connect } from 'react-redux';
import { ThemeInterface, ThemeValueInterface } from '../../../../assets/themes';
import Styles from './LeftText.styles';
import { HeaderProps } from 'react-navigation';

import HeaderStyleInterpolator from 'react-navigation-stack/dist/views/Header/HeaderStyleInterpolator.js';

interface Props {
    headerProps: HeaderProps;
    theme: ThemeInterface;
    value: string;
}

class LeftText extends React.Component<Props> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {


        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    render() {
        return (
            <Animated.Text style={[this.style.text, HeaderStyleInterpolator.forLeftLabel(this.props.headerProps)]} numberOfLines={1}>
                {this.props.value}
            </Animated.Text>
        );
    }
}

const mapStateToProps = (state: any) => ({
    theme: state.settings.theme
});

export default connect(mapStateToProps)(LeftText);
