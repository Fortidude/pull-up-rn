import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Dispatch } from 'redux';
import moment from 'moment';

import { ThemeValueInterface, ThemeInterface } from '../../../assets/themes';
import I18n, { locales } from '../../../assets/translations';
import getStyle from './LanguagePicker.styles';
import SettingListItem from '../../../components/SettingListItem';
import { NavigationActions } from 'react-navigation';
import { SettingsActions } from '../../../store/actions/settings';

type Props = {
    dispatch: Dispatch,
    theme: ThemeInterface,
    locale: string
};
class LanguagePicker extends React.Component<Props> {
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

    changeLocale = (locale: string) => {
        moment.locale(locale);
        this.props.dispatch(SettingsActions.setLocale(locale));
        this.props.dispatch(NavigationActions.back());
    };

    renderThemes = () => {
        return Object.keys(locales).map((locale, key) =>
            <SettingListItem key={key}
                rightCheck={this.props.locale === locale}
                text={locales[locale]}
                subText={I18n.t(`locales.${this.props.locale}`)}
                onPress={() => this.changeLocale(locale)} />
        );
    }

    render() {
        return (
            <View style={this.style.container}>
                {this.renderThemes()}
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    locale: state.settings.locale
});

export default connect(mapStateToProps)(LanguagePicker);
