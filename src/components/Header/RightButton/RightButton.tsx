import React from 'react';
import { Dispatch } from 'redux';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import Styles from './RightButton.styles';
import I18n from 'src/assets/translations';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import HapticFeedback from 'src/service/Haptic';
import Events from 'src/service/Events';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    isOnline: boolean;
}

interface State {
    text: string | null;
    onClick: null | (() => any);
    hide: boolean;
}

class RightButton extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            text: null,
            onClick: null,
            hide: false
        }
    }

    componentDidMount() {
        Events.listenTo("HEADER_RIGHT_BUTTON_HIDE", "RightButton", () => {
            this.setState({ hide: true });
        });
        Events.listenTo("HEADER_RIGHT_BUTTON_SHOW", "RightButton", () => {
            this.setState({ hide: false });
        });
        Events.listenTo("FULLSCREEN_MODAL_VISIBLE", "RightButton", () => {
            const onClick = () => {
                Events.emit('HEADER_SAVE_CLICKED');
            }
            this.setState({ text: I18n.t('buttons.save'), onClick: onClick });
        });

        Events.listenTo("FULLSCREEN_MODAL_HIDDEN", "RightButton", () => {
            this.setState({ text: null, onClick: null });
        });
    }

    componentWillUnmount() {
        Events.remove("HEADER_RIGHT_BUTTON_HIDE", "RightButton");
        Events.remove("HEADER_RIGHT_BUTTON_SHOW", "RightButton");
        Events.remove("FULLSCREEN_MODAL_VISIBLE", "RightButton");
        Events.remove("FULLSCREEN_MODAL_HIDDEN", "RightButton");
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    onPress = () => {
        HapticFeedback('impactLight');
        if (this.state.onClick) {
            this.state.onClick();
        }
    }

    render() {
        if (this.state.hide || !this.state.text || !this.props.isOnline) {
            return (null);
        }

        return (
            <TouchableOpacity onPress={this.onPress} style={this.style.editButton}>
                <Text style={this.style.text}>{this.state.text}</Text>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    isOnline: state.app.isOnline
});

export default connect(mapStateToProps)(RightButton);
