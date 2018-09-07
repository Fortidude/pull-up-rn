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
    opacity: Animated.Value;
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
            opacity: new Animated.Value(0),
            delay: 750
        }
    }

    shouldComponentUpdate(nextProps: Props) {
        return nextProps.theme.name !== this.props.theme.name || nextProps.isOnline !== this.props.isOnline;
    }

    componentWillMount() {
        this.animate();
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        if (nextProps.isOnline && !this.props.isOnline) {
            this.animate();
        }
    }

    animate = () => {
        clearInterval(this.interval);

        this.interval = setInterval(() => {
            this.number++;
            const value = this.state.opacity._value;

            if (this.number >= 5 || value === 0) {
                this.number = 0;
                Animated.timing(this.state.opacity, {
                    toValue: value === 0 ? 1 : 0,
                    duration: this.state.delay - 1
                }).start();
            }
        }, this.state.delay + 1);
    }

    alertInformation = () => {
        Alert.alert(I18n.t("errors.no_internet_connection"), I18n.t(`errors.no_internet_connection_text`),
            [{ text: I18n.t('buttons.ok'), onPress: () => { } }],
            { cancelable: false }
        );
    }

    render() {
        return (
            <TouchableOpacity onPress={this.alertInformation}>
                <Animated.View style={[this.style.container, { opacity: this.state.opacity }]}>
                    <Icon name="wifi-off" size={15} color={this.props.theme.colors.danger} />
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
