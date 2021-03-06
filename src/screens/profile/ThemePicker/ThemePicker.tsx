import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Dispatch } from 'redux';
import { NavigationActions } from 'react-navigation';

import { ThemeValueInterface, ThemeInterface, list } from 'src/assets/themes';
import getStyle from './ThemePicker.styles';
import SettingListItem, { SettingListPlaceholder } from 'src/components/SettingListItem';
import I18n from 'src/assets/translations';
import { SettingsActions } from 'src/store/actions/settings';

type Props = {
    dispatch: Dispatch,
    theme: ThemeInterface,
};
class ThemePicker extends React.Component<Props> {
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

    changeTheme = (name: string) => {
        this.props.dispatch(SettingsActions.setTheme(name));
        this.props.dispatch(NavigationActions.back());
    };

    renderThemes = () => {
        const length = list.length;
        return list.map((theme, key) =>
            <SettingListItem key={key}
                rightCheck={this.props.theme.name === theme}
                text={I18n.t(`themes.${theme}`)}
                onPress={() => this.changeTheme(theme)}
                last={(key+1) === length} />
        );
    }

    render() {
        return (
            <View style={this.style.container}>
                <SettingListPlaceholder />
                {this.renderThemes()}
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(ThemePicker);
