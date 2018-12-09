import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';

import I18n from 'src/assets/translations';
import getStyle from './AddTraining.styles';
import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';
import Input from 'src/components/Input';
import Events from 'src/service/Events';
import { PlannerActions } from 'src/store/actions/planner';
import { NavigationActions } from 'react-navigation';
import { SectionInterface } from 'src/models/Section';

interface Props {
    dispatch: Dispatch,
    theme: ThemeInterface,
    sections: SectionInterface[]
};

interface State {
    title: string
}

class AddTraining extends React.Component<Props, State> {
    style: ThemeValueInterface;

    addTrainingSectionModalTitleInputRef: any;

    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);
        this.state = {
            title: ''
        }

        Events.emit('FULLSCREEN_MODAL_VISIBLE');
        Events.listenTo('HEADER_SAVE_CLICKED', 'AddTreningScreen', this.onSave);
    }

    componentWillUnmount() {
        Events.emit('FULLSCREEN_MODAL_HIDDEN');
        Events.remove('HEADER_SAVE_CLICKED', 'AddTreningScreen');
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    onSave = () => {
        if (!this.state.title) {
            return;
        }

        this.props.dispatch(PlannerActions.createSection(this.state.title, ''));
        this.props.dispatch(NavigationActions.back());
    }

    componentDidMount() {
        this.addTrainingSectionModalTitleInputRef.focus();
    }

    render() {
        this.props.sections.sort((a, b) => +(a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) || -(a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()));

        return (
            <View style={this.style.container}>
                <View style={this.style.form.container}>
                    <Text style={this.style.form.label}>{I18n.t('fields.type_name')}</Text>
                    <Input medium
                        inputRef={ref => this.addTrainingSectionModalTitleInputRef = ref}
                        keyboardType={"default"}
                        value={this.state.title ? this.state.title.toString() : undefined}
                        onChange={(value) => this.setState({ title: value })}
                    />

                    <Text style={this.style.infoText}>{I18n.t('planner.add_training_title_information')}</Text>

                </View>
                <View style={this.style.existingSections.container}>
                    <Text style={this.style.existingSections.title}>{I18n.t('mics.your_trainings')}:</Text>
                    <ScrollView keyboardDismissMode="on-drag">
                        {this.props.sections.map((section, index) => {
                            return (
                                <View key={index} style={this.style.existingSectionName.container}>
                                    <Text style={this.style.existingSectionName.text}>{section.name.ucFirst()}</Text>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    sections: state.planner.sections
});

export default connect(mapStateToProps)(AddTraining);
