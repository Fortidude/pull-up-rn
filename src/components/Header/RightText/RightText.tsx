import React from 'react';
import { Animated } from 'react-native';
import { connect } from 'react-redux';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import Styles from './RightText.styles';

interface Props {
    theme: ThemeInterface;
    value: string;
    back: boolean;
}

interface State {
    marginLeft: any;
    opacity: any;
    back: boolean;
}

class RightText extends React.Component<Props, State> {
    style: ThemeValueInterface;
    marginLeft = 40;
    marginRight = -40;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            marginLeft: new Animated.Value(this.marginLeft),
            opacity: new Animated.Value(0),
            back: false
        }
    }

    componentDidMount() {
        if (!!this.props.value) {
            this.animateShow().start();
        }
    }

    componentWillUnmount() {
        this.animateHide().start();
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.value !== this.props.value) {
            const currentlyValue = !!this.props.value;
            const nextValue = !!nextProps.value;
            if (currentlyValue && !nextValue) {
                this.animateHide().start();
                return;
            } else {
                const toValue = this.state.back ? this.marginRight : this.marginLeft;
                Animated.sequence([
                    Animated.parallel([
                        Animated.timing(this.state.marginLeft, { toValue: toValue, duration: 0 }),
                        Animated.timing(this.state.opacity, { toValue: 0, duration: 0 }),
                    ]),
                    this.animateShow()
                ]).start();
            }
        }

        if (nextProps.back !== this.props.back) {
            this.setState({ back: nextProps.back });
        }

        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    animateShow = () => {
        return Animated.parallel([
            Animated.timing(this.state.marginLeft, { toValue: 0, duration: 280 }),
            Animated.timing(this.state.opacity, { toValue: 1, duration: 300 })
        ])
    }

    animateHide = () => {
        return Animated.parallel([
            Animated.timing(this.state.marginLeft, { toValue: this.marginLeft, duration: 280 }),
            Animated.timing(this.state.opacity, { toValue: 0, duration: 300 })
        ])
    }

    render() {
        return (
            <Animated.Text style={[this.style.text, { marginLeft: this.state.marginLeft, opacity: this.state.opacity }]} numberOfLines={1}>
                {this.props.value}
            </Animated.Text>
        );
    }
}

const mapStateToProps = (state: any) => ({
    theme: state.settings.theme
});

export default connect(mapStateToProps)(RightText);
