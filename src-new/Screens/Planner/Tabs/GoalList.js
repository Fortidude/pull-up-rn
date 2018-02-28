import React from 'react'
import PropTypes from 'prop-types';
import { View, RefreshControl, TouchableHighlight } from 'react-native';
import { Content, Text, Button, Left, Body, Right, Icon, SwipeRow, ActionSheet } from 'native-base';

import * as Animatable from 'react-native-animatable';
import Swipeable from 'react-native-swipeable';

import Spinkit from './../../../Components/Spinner';
import CreateSetModal from './../../../Components/CreateSet.modal';
import CreateSectionModal from './../../../Components/CreateSection.modal';
import SimpleChooseModal from './../../../Components/SimpleChoose.modal';
import Section from './../Components/ListSection';

import I18n from './../../../Translations/translations';
import Style from './../../../Styles/style';
import FooterSaveButton from '../../../Components/FooterSaveButton';

export default class GoalList extends React.Component {
    static propTypes = {
        isToggled: PropTypes.bool.isRequired,

        dispatchDisableGoal: PropTypes.func.isRequired,
        dispatchEditGoal: PropTypes.func.isRequired,
        dispatchCreateSection: PropTypes.func.isRequired,

        plannerCustomMode: PropTypes.bool,
        changeRightHeader: PropTypes.func.isRequired,

        createGoalForSpecifiedSection: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            create_set_modal: false,
            create_set_goal: null,

            create_section_modal: false,

            move_goal_to_section_modal: false,
            move_goal_to_section_goal: null,
            move_goal_to_section_old: null,

            refreshing: false,
            edit_mode: false
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        let shouldUpdate = false;
        if (nextProps.store.planner !== this.props.store.planner) {
            shouldUpdate = true;
        }

        if (nextProps.store.planner.loading !== this.props.store.planner.loading) {
            shouldUpdate = true;
        }

        if (nextProps.isToggled !== this.props.isToggled) {
            shouldUpdate = true;
        }

        if (this.state !== nextState) {
            shouldUpdate = true;
        }

        return shouldUpdate;
    }

    componentDidMount() {
        if (this.props.plannerCustomMode && this.props.isToggled) {
            this.setHeaderAction();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.plannerCustomMode && nextProps.isToggled && !this.props.isToggled) {
            this.setHeaderAction();
        }
    }


    setHeaderAction = () => this.props.changeRightHeader(I18n.t('buttons.edit'), this.editMode.bind(this));
    cancelEditMode = () => {this.setState({edit_mode: false});this.setHeaderAction()};
    isLoading = () => this.props.isLoading;
    closeSimpleChooseModal = () => this.setState({move_goal_to_section_modal: false, move_goal_to_section_goal: null, move_goal_to_section_old: null});
    closeCreateSectionModal = () => this.setState({create_section_modal: false});
    closeCreateSetModal = () => this.setState({create_set_goal: null, create_set_modal: false});
    openCreateSetModal = (goal) => this.setState({create_set_goal: goal, create_set_modal: true});
    createSection = (sectionName) => this.props.dispatchCreateSection(sectionName);
    createSet = (goal, value) => {
        let type = goal.required_type === 'none' ? 'reps' : goal.required_type;
        let payload = {goal: goal.id, data: new Date()};
        payload[type] = value;

        this.props.onCreateSet(payload);
    };
    editMode() {
        this.setState({edit_mode: true});
        this.props.changeRightHeader(I18n.t('buttons.cancel'), this.cancelEditMode.bind(this));
    }
    openChangeSectionGoalModal(goal, currentSection) {
        this.setState({
            move_goal_to_section_modal: true,
            move_goal_to_section_goal: goal,
            move_goal_to_section_old: currentSection
        })
    }
    onChangeSection(index) {
        let keys = Object.keys(this.props.store.planner.planner);
        let goal = this.state.move_goal_to_section_goal;
        let currentSection = this.state.move_goal_to_section_old;

        this.setState({
            move_goal_to_section_modal: false,
            move_goal_to_section_goal: null,
            move_goal_to_section_old: null,
        }, () => {
            this.props.dispatchEditGoal(goal.id, currentSection, keys[index]);
        });
    }

    renderSectionHeader(key) {
        let sectionName = key === 'other' ? I18n.t('planner.sections.other') : key;
        if (!this.props.plannerCustomMode) {
            sectionName = I18n.t('planner.sections.' + key);
        }

        return (
            <Button key={key} full
                    onPress={() => this.toggleSection()}
                    style={Style.planner.section.button}>
                <Left style={{flex: 3}}>
                    <TextLetterSpacing left spacing={0.5} textStyle={[Style.card.text_header, {alignSelf: 'flex-start'}]}>{ sectionName }</TextLetterSpacing>
                </Left>
                <Body style={{flex: 1}}>
                </Body>
                <Right style={{flex: 1}}>
                    {this.state.toggled && this.state.amount > 0 && <Icon name="arrow-down" style={{color: Color.grey.color}}/>}
                    {!this.state.toggled && this.state.amount > 0 && <Icon name="arrow-back" style={Style.touchColor}/>}
                    {this.state.amount === 0 && <Icon name="arrow-back" style={{color: Color.grey.colorHalf}}/>}
                </Right>
            </Button>
        )
    }

    renderSections() {
        let sections = [];
        if (!this.props.store || !this.props.store.planner) {
            return [];
        }

        let list = this.props.store.planner.planner;
        let keys = Object.keys(list);
        let isLast = false;
        let isFirst = true;
        keys.forEach((key, index) => {
            if ((keys.length-1) === index) {
                isLast = true;
            }

            sections.push(
                <Section
                    key={key}
                    sectionName={key}
                    goals={list[key]}
                    shouldBeToggled={isFirst}
                    simpleAnimation={isLast}
                    plannerCustomMode={this.props.plannerCustomMode}
                    onCreateSet={this.openCreateSetModal.bind(this)}
                    onGoalRemove={this.props.dispatchDisableGoal}
                    editMode={this.state.edit_mode}
                    onGoalEdit={this.openChangeSectionGoalModal.bind(this)}
                    onGoalCreateForSection={this.props.createGoalForSpecifiedSection}
                />
            );
            isFirst = false;
        });

        if (sections.length === 0 && !this.isLoading()) {
            sections = (
                <View style={{flex: 1, marginTop: 40, alignItems: 'center', elevation: 0}}>
                    <Text style={[Style.card.cardItem.text, {}]}>Przeciągnij w dół aby odświeżyć</Text>
                    <Animatable.Text style={{marginTop: 20}}
                                     animation="rubberBand"
                                     iterationCount="infinite"
                                     direction="alternate">
                        <Icon name="ios-arrow-dropdown" style={{color: 'white', marginTop: 20, fontSize: 30}}/>
                    </Animatable.Text>
                </View>
            );
        }

        return sections;
    }

    /**
     *
     * @returns {XML}
     */
    render() {
        return (
            <Content style={this.props.isToggled ? {} : {position: 'absolute', width: 0, height: 0, zIndex: -2, overflow: 'hidden'}}
                     keyboardShouldPersistTaps="always"
                     keyboardDismissMode={'none'}
                     showsVerticalScrollIndicator={false}
                     refreshControl={
                         <RefreshControl
                             refreshing={this.state.refreshing}
                             onRefresh={() => () => {}}
                         />
                     }>
                    {this.isLoading() && this.props.isToggled && <Spinkit style={{marginTop: Style.heightValue/4, alignSelf:'center', elevation: 0}}/>}
                    {!this.isLoading() && this.props.plannerCustomMode && <FooterSaveButton text={'Dodaj sekcje'} changed={this.state.edit_mode} onPress={() => this.setState({create_section_modal: true})}/>}
                    <View style={this.isLoading() ? {position: 'absolute', width: 0, height: 0, zIndex: -2, elevation: 0} : {}}>
                        {this.renderSections()}
                    </View>
                    <CreateSetModal
                        isVisible={this.state.create_set_modal}
                        goal={this.state.create_set_goal}
                        cancel={this.closeCreateSetModal.bind(this)}
                        createSet={this.createSet.bind(this)}
                    />
                    <CreateSectionModal
                        isVisible={this.state.create_section_modal}
                        onDismiss={this.closeCreateSectionModal.bind(this)}
                        createSection={this.createSection.bind(this)}
                    />
                    <SimpleChooseModal
                        isVisible={this.state.move_goal_to_section_modal}
                        onDismiss={this.closeSimpleChooseModal.bind(this)}
                        collection={Object.keys(this.props.store.planner.planner)}
                        onChose={this.onChangeSection.bind(this)}
                    />
            </Content>
        );
    }
}