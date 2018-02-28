import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Keyboard, Platform } from 'react-native';
import { Text, List, ListItem, Left, Body, Right, Icon, Input, Button } from 'native-base';

import Style, {isIphoneX} from '../Styles/style';
import Color from '../Styles/color';
import I18n from '../Translations/translations';

export default class ExerciseList extends React.Component {
    static propTypes = {
        exercises: PropTypes.arrayOf(PropTypes.object),
        cancel: PropTypes.func.isRequired,
        select: PropTypes.func.isRequired,
        createExercise: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            exercise_list: this.sortList(this.props.exercises),

            search_value: '',
            search_timeout: null,

            keyboardHeight: 50
        }
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow(event) {
        this.setState({keyboardHeight: event.endCoordinates.height});
    }

    _keyboardDidHide() {
        this.setState({keyboardHeight: 50});
    }

    componentDidUpdate() {
        if (this.state.search_value.length > 0) {
            return;
        }

        let sorted = this.sortList(this.props.exercises);
        if (this.state.exercise_list.length !== sorted.length) {
            this.setState({exercise_list: sorted});
        }
    }

    sortList(items) {
        let list = Object.assign([], items);
        let sorted = [];
        list.forEach(exercise => {
            let letter = exercise.name.substr(0, 1);
            if (sorted.indexOf(letter) === -1) {
                sorted.push(letter);
            }

            sorted.push(exercise);
        });

        return sorted.sort((a, b) => {
            if (typeof a === 'object') {
                a = a.name;
            }
            if (typeof b === 'object') {
                b = b.name;
            }

            return a.localeCompare(b);
        });
    }

    search() {
        let list = [];
        let searchValue = this.state.search_value.toLocaleLowerCase();
        if (!searchValue || searchValue.length === 0) {
            this.setState({exercise_list: this.sortList(this.props.exercises)});
        }

        this.props.exercises.forEach(exercise => {
            if (exercise.name.toLocaleLowerCase().indexOf(searchValue) > -1) {
                list.push(exercise);
            }
        });

        this.setState({exercise_list: this.sortList(list)})
    }

    _renderItem(exercise, key) {
        if (typeof exercise === 'string') {
            return (
                <ListItem itemDivider key={exercise} style={[Style.planner.section.button, {height: 30, paddingLeft: 15}]}>
                    <Body>
                        <Text style={Style.card.cardItem.text_note}>{ exercise.toLocaleUpperCase() }</Text>
                    </Body>
                </ListItem>
            )
        }

        let typeOfNext = typeof this.state.exercise_list[key+1];
        let isLast = typeOfNext === 'string' || typeOfNext === 'undefined';

        return (
            <ListItem key={key} style={[{height: 40}, isLast ? {borderBottomWidth: 0} : {}]}>
                <Body style={{flex: 2}}>
                    <Text>{ exercise.name }</Text>
                </Body>
                <Right style={{flex: 1}}>
                    <Button small transparent onPress={() => this.props.select(exercise)}>
                        <Text style={Style.card.cardItem.text}>{ I18n.t('buttons.choose_one') }</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }

    renderList() {
        let list = [];
        this.state.exercise_list.forEach((exercise, key) => list.push(this._renderItem(exercise, key)));

        if (list.length === 0) {
            return (<Text style={[Style.card.cardItem.text, {alignSelf: 'center'}]}>{ I18n.t('planner.exercise.none_exercise_found') }</Text>)
        }
        return list;
    }

    render() {
        let marginTop = isIphoneX() ? 30 : 0;

        return (
            <View style={{flex: 1}}>
                <View style={[Style.card.cardItem.input_with_icon.container, {paddingTop: marginTop, marginTop: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, borderRadius: 0, paddingLeft: 20, paddingRight: 0, minHeight: 50 + marginTop, alignItems: 'center'}]}>
                    <Icon name="ios-search-outline" style={[Style.card.cardItem.input_with_icon.icon, {fontSize: 20, color: Color.white.colorHalf}]}/>
                    <Input style={[Style.card.cardItem.input_with_icon.input]}
                           placeholder="Wyszukaj..."
                           keyboardAppearance="dark"
                           autoCapitalize="none"
                           autoCorrect={false}
                           value={this.state.search_value.toString()}
                           onChangeText={(value) => {
                               let timeout = setTimeout(this.search.bind(this), 200);

                               if (this.state.search_timeout || this.state.search_value.length === 0) {
                                   clearTimeout(this.state.search_timeout);
                               }

                               this.setState({search_value: value, search_timeout: timeout});

                           }}
                    />
                    <Button full transparent style={{flex: 5, height: 50}}
                            onPress={() => this.props.cancel()}>
                        <Text style={Style.touchColor}>{ I18n.t('buttons.cancel') }</Text>
                    </Button>
                </View>

                {this.props.createExercise && <Button full transparent style={{height: 50}}
                        onPress={() => this.props.createExercise()}>
                    <Text style={[{textAlign: 'center'}, Style.touchColor]}>{ I18n.t('planner.exercise.add_custom') }</Text>
                </Button>}
                <ScrollView style={{height: Style.heightValue - 50 - 50 - marginTop}}
                            ref={ref => this.ref = ref}
                            showsVerticalScrollIndicator={false}
                            bounces={false}
                            onContentSizeChange={() => this.ref.scrollTo()}>
                    { this.renderList() }
                </ScrollView>
            </View>
        );
    }
}