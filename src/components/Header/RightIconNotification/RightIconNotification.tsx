import React from 'react';
import { Alert, Animated, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import Styles from './RightIconNotification.styles';
import I18n from '../../../assets/translations';

interface Props {
    theme: ThemeInterface;
    isOnline: boolean;
}

interface State {
    offlineOpacity: Animated.Value;
    onlineOpacity: Animated.Value;
    delay: number;
}

class RightIconNotification extends React.Component<Props, State> {
    style: ThemeValueInterface;
    interval: number;
    number: number = 0;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            offlineOpacity: new Animated.Value(0),
            onlineOpacity: new Animated.Value(0),
            delay: 750
        }
    }

    shouldComponentUpdate(nextProps: Props) {
        return nextProps.theme.name !== this.props.theme.name || nextProps.isOnline !== this.props.isOnline;
    }

    componentWillMount() {
        if (!this.props.isOnline) {
            this.runAnimateInterval();
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        if (!nextProps.isOnline) {
            this.runAnimateInterval();
        } else if (nextProps.isOnline && !this.props.isOnline) {
            this.animateOnline();
        }
    }

    runAnimateInterval = () => {
        clearInterval(this.interval);

        this.interval = setInterval(() => {
            this.number++;
            const offlineOpacity = this.state.offlineOpacity._value;

            if (this.number >= 5 || offlineOpacity === 0) {
                this.number = 0;
                this.animate(offlineOpacity === 0 ? 1 : 0);
            }
        }, this.state.delay + 1);
    }

    animate = (value: number) => {
        Animated.timing(this.state.offlineOpacity, {
            toValue: value,
            duration: this.state.delay - 1
        }).start();
    }

    animateOnline = () => {
        clearInterval(this.interval);
       // const offlineOpacity = this.state.offlineOpacity._value;

        Animated.sequence([
            Animated.timing(this.state.offlineOpacity, {
                toValue: 0,
                duration: this.state.delay - 1
            }),
            Animated.timing(this.state.onlineOpacity, {
                toValue: 1,
                duration: this.state.delay - 1,
                delay: this.state.delay + 1
            }),
            Animated.timing(this.state.onlineOpacity, {
                toValue: 0,
                duration: this.state.delay - 1,
                delay: this.state.delay * 2 + 2
            })
        ]).start();
    }

    alertInformation = () => {
        if (this.props.isOnline) {
            return;
        }
        
        Alert.alert(I18n.t("errors.no_internet_connection"), I18n.t(`errors.no_internet_connection_text`),
            [{ text: I18n.t('buttons.ok'), onPress: () => { } }],
            { cancelable: false }
        );
    }

    render() {
        return (
            <TouchableOpacity style={this.style.container} onPress={this.alertInformation}>
                <Animated.View style={[{ position: 'absolute', opacity: this.state.offlineOpacity }]}>
                    <Icon name="wifi-off" size={15} color={this.props.theme.colors.danger} />
                </Animated.View>
                <Animated.View style={[{ position: 'absolute', opacity: this.state.onlineOpacity }]}>
                    <Icon name="wifi" size={15} color={this.props.theme.colors.success} />
                </Animated.View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: any) => ({
    theme: state.settings.theme,
    isOnline: state.app.isOnline
});

export default connect(mapStateToProps)(RightIconNotification);
