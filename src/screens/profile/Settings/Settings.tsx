import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Dispatch } from 'redux';
import { NavigationActions } from 'react-navigation';

import getStyle from './Settings.styles';
import SettingListItem, { SettingListPlaceholder } from 'src/components/SettingListItem';
import I18n, { locales } from 'src/assets/translations';
import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';
import { ModalActions } from 'src/store/actions/modal';
import { SettingsActions, PlannerFooterCircleComponent } from 'src/store/actions/settings';

type Props = {
    dispatch: Dispatch,
    theme: ThemeInterface,
    locale: string,
    plannerFooterCircleComponent: PlannerFooterCircleComponent
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

    changePlannerFooterComponent = () => {
        const options = ['avatar', 'circuit_left', 'circuit_progress'];
        const translatedOptions = options.map((option) => I18n.t(`settings.planner_footer_circle_component.options.${option}`));

        this.props.dispatch(ModalActions.pickerOpen(translatedOptions, true, (index: number) => {
            //@ts-ignore
            this.props.dispatch(SettingsActions.changePlannerFooterCircleComponent(options[index]));
        }))
    }

    render() {
        return (
            <View style={this.style.container}>
                
                <SettingListPlaceholder/>

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
                    last
                />

                <SettingListPlaceholder/>
                
                <SettingListItem
                    icon="shapes"
                    text={I18n.t('settings.planner_footer_circle_component.title')}
                    subText={I18n.t('settings.planner_footer_circle_component.subtext')}
                    onPress={this.changePlannerFooterComponent}
                    rightText={I18n.t(`settings.planner_footer_circle_component.options.${this.props.plannerFooterCircleComponent}`)}
                    last
                />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    locale: state.settings.locale,
    plannerFooterCircleComponent: state.settings.plannerFooterCircleComponent
});

export default connect(mapStateToProps)(Settings);
