import React from 'react';
import { Dispatch } from 'redux';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Styles from './PlannerEditButton.styles';
import I18n from 'src/assets/translations';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import { AppActions } from 'src/store/actions/app';
import HapticFeedback from 'src/service/Haptic';
import Events from 'src/service/Events';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    plannerEditMode: boolean;
}

interface State {
    overrideText: string | null;
    overrideClose: null | (() => any);
    hide: boolean;
}

class PlannerEditButton extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            overrideText: null,
            overrideClose: null,
            hide: false
        }
    }

    componentDidMount() {
        Events.listenTo("HEADER_LEFT_BUTTON_HIDE", "PlannerEditButton", () => {
            this.setState({ hide: true });
        });
        Events.listenTo("HEADER_LEFT_BUTTON_SHOW", "PlannerEditButton", () => {
            this.setState({ hide: false });
        });
        
        Events.listenTo("FULLSCREEN_MODAL_VISIBLE", "PlannerEditButton", () => {
            this.setState({ overrideText: I18n.t('buttons.cancel'), overrideClose: () => {
                Events.emit('HEADER_CANCEL_CLICKED');
            } });
        });
        Events.listenTo("FULLSCREEN_MODAL_HIDDEN", "PlannerEditButton", () => {
            this.setState({ overrideText: null, overrideClose: null });
        });
    }

    componentWillUnmount() {
        Events.remove("HEADER_LEFT_BUTTON_HIDE", "PlannerEditButton");
        Events.remove("HEADER_LEFT_BUTTON_SHOW", "PlannerEditButton");
        Events.remove("FULLSCREEN_MODAL_VISIBLE", "PlannerEditButton");
        Events.remove("FULLSCREEN_MODAL_HIDDEN", "PlannerEditButton");
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    getText = () => {
        if (this.state.overrideText !== null) {
            return this.state.overrideText;
        }

        return this.props.plannerEditMode ? I18n.t('buttons.finish') : I18n.t('buttons.edit')
    };
    onPress = () => {
        HapticFeedback('impactLight');
        if (this.state.overrideClose) {
            this.state.overrideClose();
            return;
        }

        this.props.dispatch(AppActions.togglePlannerEdit(!this.props.plannerEditMode));
    }

    render() {
        if (this.state.hide || !this.state.overrideText) {
            return null;
        }

        return (
            <TouchableOpacity onPress={this.onPress} style={this.style.editButton}>
                <Text style={this.style.text}>{this.getText()}</Text>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    plannerEditMode: state.app.plannerEditMode
});

export default connect(mapStateToProps)(PlannerEditButton);
