import React from 'react';
import { Dispatch } from 'redux';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import Styles from './Footer.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { SettingsActions } from 'src/store/actions/settings';
import I18n, { locales } from 'src/assets/translations';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    locale: string;
    deviceLocale: string;
    opacity?: Animated.Value;
}

class Footer extends React.Component<Props> {
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

    changeTheme = (name: string) => {
        this.props.dispatch(SettingsActions.setTheme(name));
    };

    switchToEnglish = () => {
        moment.locale('en');
        I18n.locale = 'en';
        this.props.dispatch(SettingsActions.setLocale('en'));
    }

    switchToUserLocale = () => {
        moment.locale(this.props.deviceLocale);
        I18n.locale = this.props.deviceLocale;
        this.props.dispatch(SettingsActions.setLocale(this.props.deviceLocale));
    }

    render() {
        const opacity = this.props.opacity || 1;
        const activeStyle = { fontWeight: '800' };
        const deviceLocaleIsAvailable = !!locales[this.props.deviceLocale];
        return (
            <Animated.View style={[this.style.container, { opacity: opacity }]}>
                <View style={this.style.leftContainer}>
                    <TouchableOpacity onPress={() => this.switchToEnglish()} style={this.style.buttonContainer}>
                        <Text style={[this.style.buttonText, this.props.locale === 'en' && activeStyle]}>EN</Text>
                    </TouchableOpacity>
                    {deviceLocaleIsAvailable &&
                        <TouchableOpacity onPress={() => this.switchToUserLocale()} style={this.style.buttonContainer}>
                            <Text style={[this.style.buttonText, this.props.locale === this.props.deviceLocale && activeStyle]}>{this.props.deviceLocale.toLocaleUpperCase()}</Text>
                        </TouchableOpacity>
                    }
                </View>

                <View style={this.style.rightContainer}>
                    <TouchableOpacity onPress={() => this.changeTheme('dark')} style={this.style.buttonContainer}>
                        <Text style={[this.style.buttonText, this.props.theme.name === 'dark' && activeStyle]}>Dark</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeTheme('light')} style={this.style.buttonContainer}>
                        <Text style={[this.style.buttonText, this.props.theme.name === 'light' && activeStyle]}>Light</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    locale: state.settings.locale,
    deviceLocale: 'PL'.toLocaleLowerCase()
});

export default connect(mapStateToProps)(Footer);
