import React from 'react';
import { Dispatch } from 'redux';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import Styles from './CreateGoalModal.styles';
import { ThemeInterface, ThemeValueInterface } from '../../assets/themes';

import ModalFooter from '../ModalManager/ModalFooter';
import ModalHeader from '../ModalManager/ModalHeader';

import I18n from '../../assets/translations';

import { ModalActions } from '../../store/actions/modal';
import { PlannerActions } from '../../store/actions/planner';

import Input from '../Input';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
}

interface State {
    value: number | null;
}

class CreateGoalModal extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            value: null
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    componentWillUnmount() {
        this.props.dispatch(PlannerActions.selectGoal(null));
    }

    success = () => {
        if (!this.state.value) {
            return;
        }
    }

    cancel = () => {
        this.props.dispatch(ModalActions.goalCreateClose());
    }

    render() {

        return (
            <View style={this.style.container}>
                <ModalHeader text={"Utwórz cel"} />
                <View style={this.style.content}>
                    <View style={this.style.textLine.container}>
                        <Text style={this.style.textLine.textLeft} numberOfLines={1}>Text</Text>
                        
                    </View>
                    <View style={this.style.form.container}>
                        <Text style={this.style.form.label}>Label</Text>
                        <Input small
                            keyboardType={"numeric"}
                            value={this.state.value ? this.state.value.toString() : undefined}
                            onChange={(value) => this.setState({ value: parseInt(value) })}
                        />

                        <Text style={this.style.form.label}>Label 2</Text>
                        <Input small
                            keyboardType={"numeric"}
                            value={this.state.value ? this.state.value.toString() : undefined}
                            onChange={(extraWeight) => this.setState({ value: parseInt(extraWeight) })}
                        />
                    </View>
                </View>
                <ModalFooter
                    loading={false}
                    cancelText={I18n.t('buttons.cancel')}
                    onCancel={this.cancel}
                    successText={I18n.t('buttons.save')}
                    onSuccess={this.success} />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(CreateGoalModal);
