import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import SettingListItem from 'src/components/SettingListItem/SettingListItem';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import KeepAwake from 'react-native-keep-awake';

import getStyle from './Cardio.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import I18n from 'src/assets/translations';
import ButtonCircle from 'src/components/ButtonCircle';
import { FOOTER_IPHONE_X_PADDING } from 'src/components/FooterBar/FooterBar.styles';
import { CardioActions } from 'src/store/actions/cardio';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    keepAwake: boolean;
};

type Round = { seconds: number; pause: boolean, reset: boolean };

interface State {
    runningSeconds: number;
    pauseSeconds: number;
    running: boolean;
    pause: boolean;
    rounds: Array<Round>;
}

class Cardio extends Component<Props, State> {
    style: ThemeValueInterface;

    countingInterval = 0;
    pauseInterval = 0;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);

        this.state = {
            runningSeconds: 0,
            pauseSeconds: 0,
            running: false,
            pause: false,
            rounds: []
        }
    }

    componentWillMount() {
        this.stopCounting();
    }

    start = () => {
        if (this.props.keepAwake) {
            KeepAwake.activate();
        }
        
        clearInterval(this.pauseInterval);
        let newState: any = { running: true, pause: false };
        if (this.state.pauseSeconds > 0) {
            const { rounds } = this.state;
            rounds.push({ seconds: this.state.pauseSeconds, pause: true, reset: false });
            newState.rounds = rounds;
            newState.pauseSeconds = 0;
        }

        this.setState(newState, this.runCounting);
    }

    pause = () => {
        let newState: any = { running: false, pause: true };
        if (this.state.runningSeconds > 0) {
            const { rounds } = this.state;
            rounds.push({ seconds: this.state.runningSeconds, pause: false, reset: false });
            newState.rounds = rounds;
        }

        this.setState(newState, () => {
            this.stopCounting();
            this.runPauseCounting();
        });
    }

    reset = () => {
        this.stopCounting();
        let newState: any = { pause: false, runningSeconds: 0, pauseSeconds: 0 };
        if (this.state.rounds.length > 0) {
            const { rounds } = this.state;
            rounds.push({ seconds: this.state.runningSeconds, pause: this.state.pause, reset: true });
            newState.rounds = rounds;
        }

        this.setState(newState);
    }

    round = () => {
        const rounds = this.state.rounds;
        rounds.push({ seconds: this.state.runningSeconds, pause: false, reset: false });
        this.setState({ rounds });
    }

    runCounting = () => {
        this.countingInterval = setInterval(() => {
            this.setState({ runningSeconds: this.state.runningSeconds + 1 });
        }, 1000);
    }

    runPauseCounting = () => {
        this.pauseInterval = setInterval(() => {
            this.setState({ pauseSeconds: this.state.pauseSeconds + 1 });
        }, 1000);
    }

    stopCounting = () => {
        clearInterval(this.countingInterval);
        clearInterval(this.pauseInterval);

        KeepAwake.deactivate();
    }

    toggleKeepAwake = (value: boolean) => {
        if (value && this.state.runningSeconds) {
            KeepAwake.activate();
        } else if (!value) {
            KeepAwake.deactivate();
        }

        this.props.dispatch(CardioActions.keepAwake(value));
    }

    render() {
        const minutes = Math.floor(this.state.runningSeconds / 60);
        const seconds = this.state.runningSeconds % 60;

        const pauseMinutes = Math.floor(this.state.pauseSeconds / 60);
        const pauseSeconds = this.state.pauseSeconds % 60;

        return (
            <View style={this.style.container}>
                <SettingListItem
                    text={I18n.t('cardio.screen_awake_title')}
                    subText={I18n.t('cardio.screen_awake_subtitle')}
                    rightSwitch={this.props.keepAwake}
                    rightOnSwitch={this.toggleKeepAwake}
                    rightSwitchTintColor={this.props.theme.colors.main}
                    last
                />

                <View style={this.style.timer.container}>
                    <Text style={[this.style.timer.text, { textAlign: 'right' }]}>{this._formatToDouble(minutes)}</Text>
                    <Text style={this.style.timer.colon}>:</Text>
                    <Text style={[this.style.timer.text, { textAlign: 'left' }]}>{this._formatToDouble(seconds)}</Text>

                    {this.state.pause && <Text style={this.style.timer.pause}>
                        Pause: {this._formatToDouble(pauseMinutes)}:{this._formatToDouble(pauseSeconds)}
                    </Text>}
                </View>

                <View style={this.style.buttonsContainer}>
                    {!this.state.running && !this.state.pause && <ButtonCircle onPress={this.start} style="green" text={I18n.t("cardio.start")} />}
                    {!this.state.running && !this.state.pause && <ButtonCircle onPress={() => { }} style="green" text={""} hidden />}

                    {this.state.running && <ButtonCircle onPress={this.pause} style="red" text={I18n.t("cardio.pause")} />}
                    {this.state.running && <ButtonCircle onPress={this.round} style="blue" text={I18n.t("cardio.round")} />}

                    {!this.state.running && this.state.pause && <ButtonCircle onPress={this.start} style="green" text={I18n.t("cardio.resume")} />}
                    {!this.state.running && this.state.pause && <ButtonCircle onPress={this.reset} style="red" text={I18n.t("cardio.reset")} />}
                </View>

                <View style={this.style.list.container}>
                    <ScrollView contentInset={{ bottom: FOOTER_IPHONE_X_PADDING }}>
                        {this._renderRounds()}
                    </ScrollView>
                </View>
            </View>
        );
    }

    _formatToDouble = (number: number | string) => {
        const length = number.toString().length;

        if (length === 1) {
            return `0${number}`;
        } else if (length === 0) {
            return `00`
        }

        return number;
    }

    _renderRounds = () => {
        const rounds: Array<Round> = Object.assign([], this.state.rounds);
        let response: Array<any> = [];

        let roundNumber = 0;
        rounds.forEach((round, key) => {
            let containerStyle = [this.style.list.roundContainer];
            let style = this.style.list.roundText;
            let text = I18n.t("cardio.round");

            if (round.reset) {
                containerStyle.push(this.style.list.resetContainer);
                style = this.style.list.resetText;
                text = I18n.t("cardio.end");
            } else if (round.pause) {
                style = this.style.list.pauseText;
                text = I18n.t("cardio.pause");
            } else {
                roundNumber++;
                text = `${text} #${roundNumber}`;
            }

            const minutes = Math.floor(round.seconds / 60);
            const seconds = round.seconds % 60;

            response.push(
                <View key={key} style={containerStyle}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 2 }}>
                        <Text style={style}>{text}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 2 }}>
                        <Text style={[style, { textAlign: 'center' }]}>
                            {this._formatToDouble(minutes)}:{this._formatToDouble(seconds)}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            )
        });

        return response.reverse();
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    keepAwake: state.cardio.keepAwake
});

export default connect(mapStateToProps)(Cardio);
