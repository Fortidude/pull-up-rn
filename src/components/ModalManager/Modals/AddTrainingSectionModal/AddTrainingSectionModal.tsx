import React from 'react';
import { Dispatch } from 'redux';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import Styles from './AddTrainingSectionModal.styles';
import I18n from 'src/assets/translations';
import { ModalActions } from 'src/store/actions/modal';

import Goal from 'src/models/Goal';
import { PlannerActions } from 'src/store/actions/planner';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';

import ModalFooter from 'src/components/ModalManager/ModalFooter';
import ModalHeader from 'src/components/ModalManager/ModalHeader';
import Input from 'src/components/Input';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    style?: any
}

interface State {
    title: string | null;
}

class AddTrainingSectionModal extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            title: null
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    componentWillUnmount() {
    }

    success = () => {
        if (!this.state.title) {
            return;
        }

        this.props.dispatch(PlannerActions.createSection(this.state.title, ''));
    }

    cancel = () => {
        this.props.dispatch(ModalActions.addTrainingSectionClose());
    }

    render() {
        return (
            <View style={[this.style.container, this.props.style]}>
                <ModalHeader text={I18n.t('modals.addTreningSection.title')} />
                <View style={this.style.content}>
                    <View style={this.style.form.container}>
                        <Text style={this.style.form.label}>{I18n.t('fields.type_name')}</Text>
                        <Input small
                            keyboardType={"default"}
                            value={this.state.title ? this.state.title.toString() : undefined}
                            onChange={(value) => this.setState({ title: value })}
                        />

                        <Text style={this.style.infoText}>Nazwą treningu może być dzień tygodnia ("Poniedziałek") lub typ ćwiczeń, np. "Trening Pull" czy "Trening nóg"</Text>

                    </View>
                </View>
                <ModalFooter
                    loading={false}
                    cancelText={I18n.t('buttons.cancel')}
                    onCancel={this.cancel}
                    successText={I18n.t('buttons.add')}
                    onSuccess={this.success} />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(AddTrainingSectionModal);
