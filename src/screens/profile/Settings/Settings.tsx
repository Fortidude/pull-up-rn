import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Dispatch } from 'redux';
import { NavigationActions } from 'react-navigation';
import getStyle from './Settings.styles';
import SettingListItem from '../../../components/SettingListItem';
import I18n, { locales } from '../../../assets/translations';
import { ThemeValueInterface, ThemeInterface } from '../../../assets/themes';

type Props = {
    dispatch: Dispatch,
    theme: ThemeInterface,
    locale: string
};
class Settings extends React.Component<Props> {
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

    goToThemeScreen = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'ThemePicker' }));
    }

    goToLanguageScreen = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'LanguagePicker' }));
    }

    render() {
        return (
            <View style={this.style.container}>
                <SettingListItem
                    icon="moon"
                    text={I18n.t('settings.theme')}
                    onPress={this.goToThemeScreen}
                    rightText={I18n.t(`themes.${this.props.theme.name}`)}
                    rightArrow 
                />

                <SettingListItem
                    icon="language"
                    text={I18n.t('settings.language')}
                    onPress={this.goToLanguageScreen}
                    rightText={locales[this.props.locale]}
                    rightArrow 
                />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    locale: state.settings.locale
});

export default connect(mapStateToProps)(Settings);
