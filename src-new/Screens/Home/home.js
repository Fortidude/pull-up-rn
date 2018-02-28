import React from 'react';
import Abstract from './../abstract';
import {AsyncStorage, Animated, RefreshControl, View, ScrollView, ImageBackground, LayoutAnimation, TouchableOpacity, TouchableHighlight, Alert} from 'react-native';
import {Container, Content, List, Item, ListItem, Icon, Text, Left, Body, Right, Separator,
    Header, Button, Footer, Fab
} from 'native-base';

import SplashScreen from 'react-native-splash-screen'
import * as Animatable from 'react-native-animatable';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';

import CountProgress from './../../Data/countProgress';
import PullUpHeader from './../../Components/PullUpHeader';
import TextWithLetterSpacing from './../../Components/TextWithLetterSpacing';
import InformationModal from './../../Components/Information.modal';
import CreateSetModal from './../../Components/CreateSet.modal';
import CreateSectionModal from './../../Components/CreateSection.modal';
import SimpleChooseModal from './../../Components/SimpleChoose.modal';
import FooterSaveButton from './../../Components/FooterSaveButton';
import Spinkit from './../../Components/Spinner';
import GoalInformation from './../../Components/GoalInformation.modal';


import I18n from './../../Translations/translations';

import SwipeListItem from './Components/listItem';
import {TutorialStepFourInfo, TutorialStepThreeSwipe, TutorialStepThreeInfo, TutorialStepOneBottomIcon, TutorialStepOneBottomInfo, TutorialStepOneInfo, TutorialStepTwoInfo, TutorialStepTwoIcon} from './Components/tutorial';

import homeStyle, {tileSizeMedium} from './home.style';
import Color from './../../Styles/color';
import Style, {isIphoneX} from './../../Styles/style';
const TileSectionStyle = homeStyle.tileSection;

const theme = {
    name: 'light',
    textColor: Color.black.color,
    textNoteColor: Color.black.colorHalf,

    backgroundColor: Color.white.color,

    headerBackgroundColor: Color.white.color,
    goalBackgroundColor: '#f9f9fc',

    sectionHeaderBorderBottom: {borderBottomColor: 'transparent'},
    goalSwipeRightButton1BackgroundColor: Color.orange.color,
    goalSwipeRightButton1TextColor: Color.white.color,
    goalSwipeRightButton2BackgroundColor: Color.red.color,
    goalSwipeRightButton2TextColor: Color.white.color,
    goalSwipeLeftButtonBackgroundColor: Color.purple.color,
    goalSwipeLeftButtonTextColor: Color.white.color,
    goalPercentageLineBackground: Color.light_black.color01,

    goalBorderColor: 'transparent',
    borderColor: Color.light_black_02.colorHalf,

    tileChartImage: require('../../Images/Tiles/chart-light.jpg'),
    tileCardioImage: require('../../Images/Tiles/cardio-light.jpg'),
}

export const themeDark = {
    name: 'dark',
    textColor: Color.white.color,
    textNoteColor: Color.white.colorHalf,

    backgroundColor: Color.black.color,

    headerBackgroundColor: Color.background.color,
    goalBackgroundColor: 'transparent',

    goalSwipeRightButton1BackgroundColor: 'transparent',
    goalSwipeRightButton1TextColor: Color.tealBlue.color,
    goalSwipeRightButton2BackgroundColor: 'transparent',
    goalSwipeRightButton2TextColor: Color.red.color,
    goalSwipeLeftButtonBackgroundColor: Color.purple.colorHalf,
    goalSwipeLeftButtonTextColor: Color.white.color,
    goalPercentageLineBackground: Color.background.color07,

    sectionHeaderBorderBottom: {},

    goalBorderColor: Color.light_black_02.color,
    borderColor: Color.light_black_02.color,

    tileChartImage: require('../../Images/Tiles/chart.jpg'),
    tileCardioImage: require('../../Images/Tiles/cardio.png'),
}

class home extends Abstract {
    editModeEnabled = false;
    swipeRefs = [];
    scrollEndPosition = 0;
    scrollEndVelocity = 0;
    scrollStartPosition = 0;

    constructor(props) {
        super(props);

        this.state = {
            show_start_step_one: false,
            show_start_step_two: false,
            show_start_step_three: false,
            show_start_step_four: false,

            planner_padding_top: -(tileSizeMedium + 20),
            predefined_trainings_height_max: tileSizeMedium + 20,
            predefined_trainings_opacity: 1,

            fab_active: false,
            soon_available: false,
            quick_set_modal: false,

            edit_mode: false,

            min_section_height: 35,
            sections: {},
            sections_updated: 0,

            left_header_text: 'Edycja',
            left_header_callback: this.editMode.bind(this),

            refreshing: false,

            create_set_modal: false,
            create_set_goal: null,

            create_section_modal: false,

            goal_information: null,
            info_level_modal: false,
            info_days_modal: false,

            move_goal_to_section_modal: false,
            move_goal_to_section_goal: null,
            move_goal_to_section_old: null,

            progress_percent: 0,

            scrollY: new Animated.Value(0),

            theme: props.store.settings.settings.light_theme ? theme : themeDark
        };
    }

    componentWillMount() {
       // AsyncStorage.removeItem('show_start_step_one_done');
       // AsyncStorage.removeItem('show_start_step_two_done');
       // AsyncStorage.removeItem('show_start_step_three_done');
       // AsyncStorage.removeItem('show_start_step_four_done');
       // AsyncStorage.setItem('show_start_step_one_done', 'true');
       // AsyncStorage.setItem('show_start_step_two_done', 'true');

        this.props.dispatchLoadPlanner();
        this.props.dispatchLoadExercises();
        this.props.dispatchLoadStatistics();
    }

    componentDidMount() {
        SplashScreen.hide();
        this.updateSectionHeightAfterProps(this.props, this.state.edit_mode);

        CountProgress.countProgress(this.props.store.planner.planner).then((percent) => {
            if (percent !== this.state.progress_percent) {
                this.setState({progress_percent: percent});
            }
        });

        AsyncStorage.getItem('show_start_step_one_done', (error, result) => {
            if (!result) {
                this.setState({show_start_step_one: true});
            } else {
                AsyncStorage.getItem('show_start_step_two_done', (error, result) => {
                    if (!result) {
                        this.setState({show_start_step_two: true});
                    } else {
                        AsyncStorage.getItem('show_start_step_three_done', (error, result) => {
                            if (!result) {
                                this.setState({show_start_step_three: true});
                            } else {
                                AsyncStorage.getItem('show_start_step_four_done', (error, result) => {
                                    if (!result) {
                                        this.setState({show_start_step_four: true});
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }

    componentWillUpdate(nextProps, nextState) {
        if (!nextState.edit_mode) {
            this.closeAllSwipeable();
        }

        if (!this.isStoreLoading() && this.state.refreshing) {
            this.setState({refreshing: false});
        }
    }

    componentWillReceiveProps(nextProps) {
        this.updateSectionHeightAfterProps(nextProps, true);

        let keys = Object.keys(nextProps.store.planner.planner);
        if (this.state.show_start_step_two) {
            let created = false;
            keys.forEach(key => {
                if (nextProps.store.planner.planner[key].length > 0) {
                    created = true;
                }
            });

            if (created) {
                this.setState({show_start_step_two: false, show_start_step_three: true}, () => {
                    AsyncStorage.setItem('show_start_step_two_done', 'true');
                });
            }
        }

        if (nextProps.store.settings.settings.light_theme !== this.props.store.settings.settings.light_theme) {
            this.setState({theme: nextProps.store.settings.settings.light_theme ? theme : themeDark});
        }
    }

    updateSectionHeightAfterProps(props, closeModals = false) {
        let state = this.state;
        let list = props.store.planner.planner;
        let keys = Object.keys(list);
        keys.forEach(sectionName => {
            let height = 35 + (list[sectionName].length * 70);
            let toggled = props.store.planner.sections_hidden.indexOf(sectionName) === -1;
            state.sections[sectionName] = {max_height: height, toggled: toggled};
            state[this._getSectionNameForAnimate(sectionName)] = new Animated.Value(toggled ? height : this.state.min_section_height);
        });

        state.sections_updated = state.sections_updated + 1;

        if (closeModals) {
            state = Object.assign(state, {
                create_set_modal: false,
                create_set_goal: null,
                create_section_modal: false,
                move_goal_to_section_modal: false,
                move_goal_to_section_goal: null,
                move_goal_to_section_old: null
            });
        }

        if (state.show_start_step_one) {
            let foundAmount = 0;
            keys.forEach(sectionName => {
                foundAmount += list[sectionName].length;
            });
            if (foundAmount >= 1) {
                AsyncStorage.setItem('show_start_step_one_done', 'true');
                AsyncStorage.setItem('show_start_step_two_done', 'true');
                AsyncStorage.setItem('show_start_step_three_done', 'true');
                AsyncStorage.setItem('show_start_step_four_done', 'true');
                state.show_start_step_one = false;
                state.show_start_step_two = false;
                state.show_start_step_three = false;
                state.show_start_step_four = false;

            }
        }

        CountProgress.countProgress(list).then((percent) => {
            if (percent !== this.state.progress_percent) {
                this.setState({progress_percent: percent});
            }
        });

        this.setState(state);
    }

    onDismissInformationModal() {
        this.setState({soon_available: false});
    }

    _getSectionNameForAnimate(sectionName) {
        return sectionName + '_anim';
    }

    _toggleSection(sectionName, nextState = null) {
        let state = nextState ? nextState : this.state;

        let sectionNameAnim = this._getSectionNameForAnimate(sectionName);
        let sectionsConfig = state.sections;

        let toValue = state.min_section_height;
        let toggled = sectionsConfig[sectionName].toggled;

        if (!toggled) {
            toValue = sectionsConfig[sectionName].max_height;
        }

        sectionsConfig[sectionName]['toggled'] = !toggled;
        this.setState({sections: sectionsConfig, sections_updated: this.state.sections_updated + 1}, () => {
            Animated.timing(this.state[sectionNameAnim], {
                toValue: toValue,
                duration: 300,
            }).start(() => {
                this.props.dispatchToggleSection(sectionName);
            });
        });
    }

    _disableScroll() {
        this._list.getScrollResponder().setNativeProps({
            scrollEnabled: false
        })
    }

    _enableScroll() {
        this._list.getScrollResponder().setNativeProps({
            scrollEnabled: true
        })
    }

    _renderSectionHeader(sectionName, goalAmount) {
        let toggled = this.state.sections[sectionName] && this.state.sections[sectionName].toggled;
        return (
            <View key={sectionName} style={[Style.planner.section.button, {backgroundColor: this.state.theme.headerBackgroundColor}, this.state.theme.sectionHeaderBorderBottom]}>
                <View style={{flexDirection: 'row', marginTop: 0, height: 35}}>
                    <TouchableOpacity onPress={() => this._toggleSection(sectionName)}  style={{flex: 3, alignItems: 'flex-start', justifyContent: 'center', marginLeft: 20}}>
                        <TextWithLetterSpacing left spacing={0.5} textStyle={[Style.card.text_header, {color: this.state.theme.textColor}]}>{ sectionName }</TextWithLetterSpacing>
                    </TouchableOpacity>
                    {(this.state.edit_mode || this.state.show_start_step_two) && <TouchableOpacity onPress={() => this.createGoalToSection(sectionName)} style={{flex: 1, alignItems: 'flex-end'}}>
                        {this.state.show_start_step_two && <TutorialStepTwoIcon/>}
                        <View style={{alignSelf: 'stretch', marginTop: 6, width: 50}}>
                            <Text style={[Style.card.cardItem.text, Style.touchColor]}>Dodaj</Text>
                        </View>
                    </TouchableOpacity>}
                    <TouchableOpacity onPress={() => this._toggleSection(sectionName)}  style={{flex: 1, alignItems: 'flex-end'}}>
                        {toggled && goalAmount > 0 && <EvilIcon name="chevron-down" style={{color: this.state.theme.textColor, backgroundColor: 'transparent', marginTop: -4, fontSize: 50, height: 35}}/>}
                        {!toggled && goalAmount > 0 && <EvilIcon name="chevron-left" style={{color: Style.touchColor.color, backgroundColor: 'transparent', marginTop: -2, fontSize: 50, height: 35}}/>}
                        {goalAmount === 0 && <EvilIcon name="chevron-left" style={{color: Color.grey.color, backgroundColor: 'transparent', marginTop: -2, fontSize: 50}}/>}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _renderSectionGoal(goal, key, sectionName, isFirst = false, isLast = false, isSectionLast = false) {
        return <View key={key}>
            {this.state.show_start_step_three && <TutorialStepThreeSwipe/>}
            <SwipeListItem
                              openChangeSectionGoalModal={this.openChangeSectionGoalModal.bind(this)}
                              onGoalRemove={this.onGoalRemove.bind(this)}
                              disableScroll={this._disableScroll.bind(this)}
                              enableScroll={this._enableScroll.bind(this)}
                              onGoalInfo={this.onGoalInfo.bind(this)}
                              openCreateSetModal={this.openCreateSetModal.bind(this)}
                              goal={goal}
                              keyValue={key} sectionName={sectionName} isFist={isFirst} isLast={isLast} isSectionLast={isSectionLast}/>
        </View>
    }

    _renderSections() {
        this.swipeRefs = [];
        let sections = [];
        let list = this.props.store.planner.planner;

        let keys = Object.keys(list);
        let sectionAmount = keys.length;
        let isSectionLast = false;
        keys.forEach((key, index) => {
            isSectionLast = (sectionAmount - 2) === index;
            if (list[key].length === 0 && key === 'other') {
                return;
            }

            let section = [];
            section.push(this._renderSectionHeader(key, list[key].length));

            let isLast = false;
            let isFirst = true;
            let amount = list[key].length;
            list[key].forEach((goal, index) => {
                if (amount-1 === index) {
                    isLast = true;
                }
                section.push(this._renderSectionGoal(goal, index, key, isFirst, isLast, isSectionLast));
                isFirst = false;
            });

            let sectionStyle = {overflow: 'hidden', elevation: 0};
            let sectionNameAnim = this._getSectionNameForAnimate(key);
            this.state[sectionNameAnim] ? sectionStyle['height'] = this.state[sectionNameAnim] : null;
            sections.push(
                <Animated.View key={key + '_section'} style={sectionStyle}>
                    { section }
                </Animated.View>
            );
        });

        return sections;
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
            this.props.dispatchMoveGoalToSection(goal.id, currentSection, keys[index]);
        });
    }
    openChangeSectionGoalModal(goal, currentSection) {
        this.setState({
            move_goal_to_section_modal: true,
            move_goal_to_section_goal: goal,
            move_goal_to_section_old: currentSection
        })
    }
    closeAllSwipeable() {
        this.swipeRefs.forEach(ref => {
            if (ref && (ref._root !== null)) {
                ref.recenter();
            }
        });
    }

    refresh = () => {this.props.dispatchLoadPlanner(true); this.props.dispatchLoadExercises(true); this.setState({refreshing: true})};
    getRightHeader = () => this.props.store.planner.custom_mode ? <Button transparent onPress={() => this.state.left_header_callback()}><Text style={Style.header.right.text_button}>{ this.state.left_header_text }</Text></Button> : null;
    isStoreLoading = () => this.props.store.planner.loading || this.props.store.exercise.loading;

    editMode = () => { LayoutAnimation.spring(); this._list.scrollTo(this.state.predefined_trainings_height_max*2); this.setState({edit_mode: true, left_header_text: I18n.t('buttons.ready'), left_header_callback: this.editModeSave.bind(this)})};
    editModeSave = () => { LayoutAnimation.spring(); this._list.scrollTo(0); this.setState({edit_mode: false, left_header_text: I18n.t('buttons.edit'), left_header_callback: this.editMode.bind(this)})};

    closeSimpleChooseModal = () => this.setState({move_goal_to_section_modal: false, move_goal_to_section_goal: null, move_goal_to_section_old: null});
    closeCreateSectionModal = () => this.setState({create_section_modal: false});
    closeCreateSetModal = () => this.setState({create_set_goal: null, create_set_modal: false});

    openCreateSetModal = (goal) => this.setState({create_set_goal: goal, create_set_modal: true});
    createSection = (sectionName) => {
        if (this.state.show_start_step_one) {
            this.setState({show_start_step_one: false, show_start_step_two: true}, () => {
                AsyncStorage.setItem('show_start_step_one_done', 'true');
                this.props.dispatchCreateSection(sectionName);
            });
        } else {
            this.props.dispatchCreateSection(sectionName);
        }
    };
    createSet = (goal, value) => {
        let type = (goal.required_type === 'none' || goal.required_type === 'sets') ? 'reps' : goal.required_type;
        let payload = {goal: goal.id, data: new Date()};
        payload[type] = value;

        this.props.dispatchCreateSet(payload);
    };
    onGoalRemove(goal) {
        Alert.alert(
            'Czy na pewno?',
            "Usunięte cele i ćwiczenia nie zostaną uwzględnione w statystykach.\n Zawsze możesz to cofnąc w ustawieniach.",
            [
                {text: I18n.t('buttons.cancel'), onPress: () => {}, style: 'cancel'},
                {text: I18n.t('buttons.delete'), onPress: () => {
                    this.closeAllSwipeable();
                    this.props.dispatchDisableGoal(goal.id);
                }, style: 'destructive'},
            ],
            { cancelable: true }
        )
    };
    onGoalInfo(goal) {
        this.setState({goal_information: goal});
    }
    createGoalToSection(sectionName) {
        this.props.dispatchSelectSectionForGoalCreate(sectionName);
        this.props.navigation.navigate('NewGoal');
    }
    
    _getHeaderTrainings() {
        const headerBottom = this.state.scrollY.interpolate({
            inputRange: [this.state.predefined_trainings_height_max, this.state.predefined_trainings_height_max*2],
            outputRange: [0, 40],
            extrapolate: 'clamp',
        });
        const imageBottom = this.state.scrollY.interpolate({
            inputRange: [this.state.predefined_trainings_height_max, this.state.predefined_trainings_height_max*2],
            outputRange: [0, 40],
            extrapolate: 'clamp',
       });

        return (
            <View style={{marginTop: 0, marginBottom: 0}}>
                 {false && <TextWithLetterSpacing line center spacing={1} textStyle={[Style.textHeader]}>{'Treningi'.toUpperCase()}</TextWithLetterSpacing>}

                 <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={[{opacity: this.state.predefined_trainings_opacity, backgroundColor: this.state.theme.backgroundColor, flexDirection:'row', marginTop: 0}]}>
                     <TouchableOpacity underlayColor={'transparent'} onShowUnderlay={() => this.setState({tile01: true})} onHideUnderlay={() => this.setState({tile01: false})}
                                         style={[{marginRight: 2}, homeStyle.flexRow, TileSectionStyle.mediumTileSingle.container, TileSectionStyle.tile.container]}
                                         onPress={() => this.props.navigation.navigate('Statistics')}>
                         <Animated.View style={{bottom: imageBottom}}>
                             <ImageBackground source={this.state.theme.tileChartImage} style={[TileSectionStyle.mediumTileSingle.image_background]}>
                                 <Animated.Text note numberOfLines={1} style={[TileSectionStyle.textHeader, TileSectionStyle.tile.text_title, {bottom: headerBottom}]}>Statystyki</Animated.Text>
                             </ImageBackground>
                         </Animated.View>
                     </TouchableOpacity>
                     <TouchableOpacity underlayColor={'transparent'} onShowUnderlay={() => this.setState({tile01: true})} onHideUnderlay={() => this.setState({tile01: false})}
                                         style={[{marginLeft: 2, marginRight: 2}, homeStyle.flexRow, TileSectionStyle.mediumTileSingle.container, TileSectionStyle.tile.container]}
                                         onPress={() => this.props.navigation.navigate('Cardio')}>
                         <Animated.View style={{bottom: imageBottom}}>
                             <ImageBackground source={this.state.theme.tileCardioImage} style={[TileSectionStyle.mediumTileSingle.image_background]}>
                                 <Animated.Text note style={[TileSectionStyle.textHeader, TileSectionStyle.tile.text_title, {bottom: headerBottom}]}>Cardio</Animated.Text>
                             </ImageBackground>
                         </Animated.View>
                     </TouchableOpacity>
                     <TouchableOpacity underlayColor={'transparent'} onShowUnderlay={() => this.setState({tile01: true})} onHideUnderlay={() => this.setState({tile01: false})}
                                         style={[{marginLeft: 2, marginRight: 2}, homeStyle.flexRow, TileSectionStyle.mediumTileSingle.container, TileSectionStyle.mediumTileSingle.container_disabled, TileSectionStyle.tile.container]}
                                         onPress={() => this.setState({soon_available: true})}>
                         <Animated.View style={{bottom: imageBottom}}>
                             <ImageBackground source={require('../../Images/Tiles/pullups.jpg')} style={[TileSectionStyle.mediumTileSingle.image_background]}>
                                 <Animated.Text note style={[TileSectionStyle.textHeader, TileSectionStyle.tile.text_title, {bottom: headerBottom}]}>Pull</Animated.Text>
                             </ImageBackground>
                         </Animated.View>
                     </TouchableOpacity>
                     <TouchableOpacity underlayColor={'transparent'} onShowUnderlay={() => this.setState({tile01: true})} onHideUnderlay={() => this.setState({tile01: false})}
                                         style={[{marginLeft: 2}, homeStyle.flexRow, TileSectionStyle.mediumTileSingle.container, TileSectionStyle.mediumTileSingle.container_disabled, TileSectionStyle.tile.container]}
                                         onPress={() => this.setState({soon_available: true})}>
                         <Animated.View style={{bottom: imageBottom}}>
                             <ImageBackground source={require('../../Images/Tiles/handstand.jpg')} style={[TileSectionStyle.mediumTileSingle.image_background]}>
                                 <Animated.Text note style={[TileSectionStyle.textHeader, TileSectionStyle.tile.text_title, {bottom: headerBottom}]}>Handstand</Animated.Text>
                             </ImageBackground>
                         </Animated.View>
                     </TouchableOpacity>
                 </ScrollView>
             </View>
        )
    }

    _getProgressSection() {
        let height = this.state.predefined_trainings_height_max * 0.8;
        const size = this.state.scrollY.interpolate({
            inputRange: [0, this.state.predefined_trainings_height_max],
            outputRange: [height, 0],
            extrapolate: 'clamp',
        });
        const heightContainer = this.state.scrollY.interpolate({
            inputRange: [0, this.state.predefined_trainings_height_max],
            outputRange: [this.state.predefined_trainings_height_max, 0],
            extrapolate: 'clamp',
        });
        const textOpacity = this.state.scrollY.interpolate({
            inputRange: [0, this.state.predefined_trainings_height_max * 0.2],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        let progressPercent = this.state.progress_percent !== null ? this.state.progress_percent : 0;

        let leftDays = this.props.store.auth.user.days_left_circuit;
        let goneDays = this.props.store.auth.user.days_per_circuit - leftDays;
        goneDays = isNaN(goneDays) ? 0 : goneDays;

        let leftDaysPercent = goneDays / this.props.store.auth.user.days_per_circuit * 100;
        leftDaysPercent = isNaN(leftDaysPercent) ? 0 : leftDaysPercent;


        let margin =  ((Style.widthValue/2) - this.state.predefined_trainings_height_max) / 3;
        return (
            <Animated.View style={{flexDirection: 'row', alignItems: 'center', height: heightContainer}}>
                <Animated.View style={{width: this.state.predefined_trainings_height_max, alignItems: 'center', marginLeft: margin*2, marginRight: margin}}>
                    <AnimatedCircularProgress
                        style={{backgroundColor: 'transparent'}}
                        size={size}
                        width={5}
                        fill={progressPercent ? progressPercent : 0}
                        rotation={0}
                        tintColor={Color.blue.color}
                        // onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor={Color.light_black_03.colorHalf}>
                        {
                            (fill) => (
                                <TouchableOpacity onPress={() => this.setState({info_level_modal: true})}>
                                    <Animated.View style={{opacity: textOpacity}}>
                                        {progressPercent !== false && <View style={{alignItems: 'center'}}>
                                            <Text numberOfLines={1} style={[Style.card.cardItem.text_blue, {fontSize: 22}]}>
                                                1
                                            </Text>
                                            <Text numberOfLines={1} note style={[Style.card.cardItem.text_note, {fontSize: 12}]}>
                                                Poziom ({ progressPercent }%)
                                            </Text>
                                        </View>}
                                        {progressPercent === false && <View style={{alignItems: 'center'}}>
                                            <Text numberOfLines={1} note style={[Style.card.cardItem.text_note]}>
                                                brak
                                            </Text>
                                            <Text numberOfLines={1} style={Style.card.cardItem.text_note}>
                                                celów
                                            </Text>
                                        </View>}
                                    </Animated.View>
                                </TouchableOpacity>
                            )
                        }
                    </AnimatedCircularProgress>
                </Animated.View>
                <Animated.View style={{width: this.state.predefined_trainings_height_max, alignItems: 'center', marginLeft: margin, marginRight: margin*2}}>
                    <AnimatedCircularProgress
                        style={{backgroundColor: 'transparent'}}
                        size={size}
                        width={2}
                        fill={Math.round(leftDaysPercent)}
                        rotation={0}
                        tintColor={Color.tealBlue.color}
                       // onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor={Color.light_black_03.colorHalf}>
                        {
                            (fill) => (
                                <TouchableOpacity onPress={() => this.setState({info_days_modal: true})}>
                                    <Animated.View style={{alignItems: 'center', opacity: textOpacity}}>
                                        <Text numberOfLines={1} style={Style.card.cardItem.text_blue}>
                                            { leftDays } {leftDays === 1 && 'dzień' || leftDays !== 1 && 'dni'}
                                        </Text>
                                        <Text numberOfLines={1} note style={[Style.card.cardItem.text_note, {fontSize: 12}]}>
                                            pozostało
                                        </Text>
                                    </Animated.View>
                                </TouchableOpacity>
                            )
                        }
                    </AnimatedCircularProgress>
                </Animated.View>
            </Animated.View>
        )
    }

    _getRefreshNeeded() {
        return (
            <View style={{flex: 1, marginTop: 40, alignItems: 'center', elevation: 0}}>
                <Text style={[Style.card.cardItem.text, {color: this.state.theme.textColor}]}>Przeciągnij w dół aby odświeżyć</Text>
                <Animatable.Text style={{marginTop: 50}}
                                 animation="fadeInDown"
                                 duration={1500}
                                 direction="normal"
                                 iterationCount="infinite">
                    <Icon name="ios-arrow-dropdown" style={{color: this.state.theme.textColor, marginTop: 20, fontSize: 30}}/>
                </Animatable.Text>
            </View>
        )
    }

    _goTutorialStepFour() {
        this.setState({show_start_step_three: false, show_start_step_four: true}, () => {
            AsyncStorage.setItem('show_start_step_three_done', 'true');
        });
    }

    _fonishTutorialStepFour() {
        this.setState({show_start_step_three: false, show_start_step_four: false}, () => {
            AsyncStorage.setItem('show_start_step_four_done', 'true');
        });
    }

    render() {
        const firstHeaderHeight = this.state.scrollY.interpolate({
            inputRange: [this.state.predefined_trainings_height_max, this.state.predefined_trainings_height_max*2],
            outputRange: [this.state.predefined_trainings_height_max, 0],
            extrapolate: 'clamp',
        });
        const secondHeaderHeight = this.state.scrollY.interpolate({
            inputRange: [0, this.state.predefined_trainings_height_max],
            outputRange: [this.state.predefined_trainings_height_max, 0],
            extrapolate: 'clamp',
        });
        const secondHeaderTop = this.state.predefined_trainings_height_max + (isIphoneX() ? 88 : 64);
        const secondHeaderOpacity = this.state.scrollY.interpolate({
            inputRange: [0, this.state.predefined_trainings_height_max * 0.3, this.state.predefined_trainings_height_max * 0.6],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const indicatorWidth = this.state.scrollY.interpolate({
            inputRange: [-120, 0],
            outputRange: [Style.widthValue, 0],
        });

        let sections = this._renderSections();
        let isRefreshNeeded = sections.length === 0;

        let startStepOne = this.state.show_start_step_one;
        let startStepTwo = !startStepOne && this.state.show_start_step_two;
        let startStepThree = !startStepTwo && this.state.show_start_step_three;
        let startStepFour = !startStepThree && this.state.show_start_step_four;
        let showStart = startStepOne || startStepTwo || startStepThree || startStepFour;

        return (
                <Container androidStatusBarColor="green" style={[homeStyle.container, {backgroundColor: 'transparent'}]}>
                    <PullUpHeader profile
                                  left={this.getRightHeader()}
                                  bodyText="Pull up!"
                                  lightTheme={this.props.store.settings.settings.light_theme}
                                  navigation={this.props.navigation} />

                    <ScrollView scrollEventThrottle={16}
                                ref={ref => this._list = ref}
                                showsVerticalScrollIndicator={false}
                                style={{backgroundColor: this.state.theme.backgroundColor}}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={() => this.refresh()}
                                    />
                                }
                                onScroll={Animated.event(
                                    [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
                                     {listener: (event) => {
                                         const current = event.nativeEvent.contentOffset.y;
                                         const height = this.state.predefined_trainings_height_max*2;
                                         const endPosition = this.scrollEndPosition;
                                         const directionUp = this.scrollEndVelocity > 0;

                                         if (this.scrollEndPosition !== null) {
                                             if (endPosition > height && current < height) {
                                                  this._list.scrollTo({y: height});
                                                  this.scrollEndPosition = null;
                                             } else if (endPosition > 0 && endPosition < height / 3) {
                                                 this._list.scrollTo({y: 0});
                                                 this.scrollEndPosition = null;
                                             } else if (endPosition > height * 0.75 && endPosition < height && directionUp) {
                                                // this._list.scrollTo({y: height});
                                                // this.scrollEndPosition = null;
                                             }
                                         }
                                     }}
                                )}
                                onScrollStartDrag={event => {
                                  //  this.scrollStartPosition = event.nativeEvent.contentOffset.y;
                                  //  this.scrollEndPosition = null;
                                }}
                                onScrollEndDrag={event => {
                                    const height = this.state.predefined_trainings_height_max*2;
                                    if (event.nativeEvent.velocity.y === 0 && event.nativeEvent.contentOffset.y < height) {
                                        this._list.scrollTo({y: height});
                                        this.scrollEndPosition = null;
                                    }

                                    this.scrollEndPosition = event.nativeEvent.contentOffset.y;
                                    this.scrollEndVelocity = event.nativeEvent.velocity.y;

                                }}
                    >

                        <View style={{marginTop: this.state.predefined_trainings_height_max*2, backgroundColor: 'transparent'}}>
                            {(!this.isStoreLoading() || !this.state.refreshing) && sections }
                            {false && (this.isStoreLoading() && !this.state.refreshing) && <Spinkit style={{marginTop: Style.heightValue/4, alignSelf:'center', elevation: 0}}/> }
                            {isRefreshNeeded && !showStart && this._getRefreshNeeded()}
                            {startStepOne && <TutorialStepOneInfo name={this.props.store.auth.user.name}/>}
                            {startStepTwo && <TutorialStepTwoInfo/>}
                            {startStepThree && <TutorialStepThreeInfo next={this._goTutorialStepFour.bind(this)}/>}
                            {startStepFour && <TutorialStepFourInfo finish={this._fonishTutorialStepFour.bind(this)}/>}

                        </View>
                    </ScrollView>

                    <Animated.View style={{height: firstHeaderHeight, opacity: 1, position: 'absolute', top: isIphoneX() ? 88 : 64,left: 0,right: 0, backgroundColor: Color.black.color}}>
                        { this._getHeaderTrainings() }
                    </Animated.View>
                    <Animated.View style={{height: secondHeaderHeight, opacity: secondHeaderOpacity, position: 'absolute', top: secondHeaderTop,left: 0,right: 0, paddingBottom: 10}}>
                        <LinearGradient
                            colors={['#101010', Color.black.color]}
                            style={{flex: 1, borderTopColor: 'black', borderTopWidth: 1}}>
                            { this._getProgressSection() }
                        </LinearGradient>
                    </Animated.View>

                    <Animated.View style={{position: 'absolute', top: this.state.predefined_trainings_height_max*2 + (isIphoneX() ? 88 : 64), width: indicatorWidth, height: Style.borderWidth.borderWidth, backgroundColor: Color.blue.color}}>
                    </Animated.View>

                    <GoalInformation
                        isVisible={this.state.goal_information !== null}
                        goal={this.state.goal_information}
                        onDismiss={() => this.setState({goal_information: null})}
                    />

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
                    <InformationModal onDismiss={this.onDismissInformationModal.bind(this)} isVisible={this.state.soon_available} message="informations.soon_available"/>
                    <InformationModal onDismiss={() => this.setState({info_level_modal: false})} isVisible={this.state.info_level_modal} message="informations.info_level"/>
                    <InformationModal onDismiss={() => this.setState({info_days_modal: false})} isVisible={this.state.info_days_modal} message="informations.info_days"/>
                    {startStepOne && <TutorialStepOneBottomInfo/>}
                    {startStepOne && <TutorialStepOneBottomIcon/>}
                    {((!this.isStoreLoading() && this.props.store.planner.custom_mode) || startStepOne) && <FooterSaveButton containerStyle={{borderTopWidth: Style.borderWidth.borderWidth, borderTopColor: Style.touchColor.color}} borderTop={true} text={'Dodaj trening'} changed={(this.state.edit_mode || startStepOne)} onPress={() => this.setState({create_section_modal: true})}/>}
                </Container>
        );
    }
}

import {connect} from 'react-redux';
import { loadPlanner, toggleSection, createSection, createSet, moveGoalToSection, selectSectionForGoalCreate, loadStatistics } from './../../Store/Planner/planner.actions';
import { disableGoal } from './../../Store/Planner/goal.actions';
import { loadExercises } from './../../Store/Exercise/actions';

function mapStateToProps (state) {
    return {
        store: state
    }
}

function mapDispatchToProps (dispatch) {
    return {
        dispatchLoadPlanner: (refresh = false) => {dispatch(loadPlanner(refresh))},
        dispatchLoadExercises: (refresh = false) => {dispatch(loadExercises(refresh))},
        dispatchLoadStatistics: (refresh = false) => {dispatch(loadStatistics(refresh))},

        dispatchToggleSection: (sectionName) => {dispatch(toggleSection(sectionName))},

        dispatchSelectSectionForGoalCreate: (sectionName) => {dispatch(selectSectionForGoalCreate(sectionName))},
        dispatchCreateSection: (sectionName) => {dispatch(createSection(sectionName))},
        dispatchCreateSet: (payload) => {dispatch(createSet(payload))},
        dispatchMoveGoalToSection: (goalId, oldSectionName, newSectionName) => {dispatch(moveGoalToSection(goalId, oldSectionName, newSectionName))},

        dispatchDisableGoal: (goalId) => {dispatch(disableGoal(goalId))},
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(home)