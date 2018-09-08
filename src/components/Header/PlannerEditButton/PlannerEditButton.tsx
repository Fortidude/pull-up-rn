import React from 'react';
import { Dispatch } from 'redux';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Styles from './PlannerEditButton.styles';
import I18n from '../../../assets/translations';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import { AppActions } from '../../../store/actions/app';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    plannerEditMode: boolean;
}

class PlannerEditButton extends React.Component<Props> {
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

    getText = () => this.props.plannerEditMode ? I18n.t('buttons.finish') : I18n.t('buttons.edit');
    onPress = () => this.props.dispatch(AppActions.togglePlannerEdit(!this.props.plannerEditMode));

    render() {
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
