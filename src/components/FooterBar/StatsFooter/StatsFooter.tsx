import React from 'react';
import { Dispatch } from 'redux';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Styles from './StatsFooter.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import Button from 'src/components/FooterBar/Button';
import { StackActions } from 'react-navigation';
import I18n from 'src/assets/translations';

interface Props {
    onLayout?: () => void;
    dispatch: Dispatch;
    theme: ThemeInterface;
    nav: any;
}

class StatsFooter extends React.Component<Props> {
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

    isRouteCurrent = (routeName: string) => {
        let currentIndex = this.props.nav.index;
        return this.props.nav.routes[currentIndex].routeName.toLocaleLowerCase() === routeName.toLocaleLowerCase()
    }

    goToEffectiveness = () => {
        this.props.dispatch(StackActions.replace({
            routeName: 'EffectivenessStats',
        }))
    }

    goToPopularity = () => {
        this.props.dispatch(StackActions.replace({
            routeName: 'PopularityStats',

        }))
    }

    goToProgress = () => {
        this.props.dispatch(StackActions.replace({
            routeName: 'ProgressStats',
        }))
    }

    render() {
        return (
            <View style={this.style.container} onLayout={this.props.onLayout}>
                <Button onPress={this.goToEffectiveness} text={I18n.t('routes.effectivenessstats')} isActive={this.isRouteCurrent("EffectivenessStats")} />
                <Button onPress={this.goToPopularity} text={I18n.t('routes.popularitystats')} isActive={this.isRouteCurrent("PopularityStats")} />
                <Button onPress={this.goToProgress} text={I18n.t('routes.progressstats')} isActive={this.isRouteCurrent("ProgressStats")} />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    nav: state.nav
});

export default connect(mapStateToProps)(StatsFooter);
