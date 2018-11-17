import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Animated, Text, View, TextInput } from 'react-native';
import moment from 'moment'
import I18n from 'src/assets/translations';

import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';

import ModalFooter from 'src/components/ModalManager/ModalFooter/ModalFooter';
import ModalHeader from 'src/components/ModalManager/ModalHeader/ModalHeader';
import { FOOTER_HEIGHT } from 'src/components/FooterBar/FooterBar.styles';

import Set from 'src/models/Set';
import Goal from 'src/models/Goal';

import getStyle from './Content.styles';
import Input from 'src/components/Input';
import DateTimeInput from 'src/components/DateTimeInput/DateTimeInput';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    goal: Goal,

    onClose: () => void;
};

interface State {
    value: number | null;
    extraWeight: number | null;
    date: Date;
}

class DayModalItem extends React.Component<Props, State> {
    style: ThemeValueInterface;
    addSetModalRepAmountRef: TextInput;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);

        this.state = {
            value: null,
            extraWeight: null,
            date: new Date()
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.addSetModalRepAmountRef.focus();
        }, 200);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    render() {
        const goal = this.props.goal;
        const exercise = goal.exercise;
        const variant = exercise.exerciseVariant || null;

        return (
            <React.Fragment>
                <ModalHeader text={"Info"} />
                <View style={this.style.content}>
                    <View style={this.style.textLine.container}>
                        {!!goal.requiredAmount && <Text style={this.style.textLine.textLeft} numberOfLines={1}>
                            {I18n.t('planner.done_of')}: {goal.doneThisCircuit} {I18n.t('mics.of')} {goal.requiredAmount}
                        </Text>}
                        {!goal.requiredAmount && <Text style={this.style.textLine.textLeft} numberOfLines={1}>
                            {I18n.t('planner.done_of')}: {goal.doneThisCircuit}
                        </Text>}
                        {variant &&
                            <Text style={this.style.textLine.textRight} numberOfLines={1}>{variant.name}</Text>
                        }
                    </View>
                    <View style={this.style.form.container}>
                        <Text style={this.style.form.label}>{I18n.t('fields.number_of_reps_done')}</Text>
                        <Input small
                            keyboardType={"numeric"}
                            inputRef={ref => this.addSetModalRepAmountRef = ref}
                            value={this.state.value ? this.state.value.toString() : undefined}
                            onChange={(value) => this.setState({ value: parseInt(value) })}
                        />

                        <Text style={this.style.form.label}>{I18n.t('fields.additional_weight')}</Text>
                        <Input small
                            keyboardType={"numeric"}
                            value={this.state.extraWeight ? this.state.extraWeight.toString() : undefined}
                            onChange={(extraWeight) => this.setState({ extraWeight: parseInt(extraWeight) })}
                        />

                        <Text style={this.style.form.label}>{I18n.t('fields.date')}</Text>
                        <DateTimeInput date={this.state.date} onChange={(date: Date) => { this.setState({ date }) }} />
                    </View>
                </View>
                <ModalFooter style={{ height: FOOTER_HEIGHT }}
                    loading={false}
                    cancelText={'Zamknij'}
                    successText={'Dodaj'}
                    onCancel={this.props.onClose}
                    onSuccess={() => {}}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    goal: state.planner.goalSelected,
});

export default connect(mapStateToProps)(DayModalItem);
