import React from 'react';
import Abstract from './../abstract';
import { RefreshControl } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';

import I18n from './../../Translations/translations';

import PullUpHeader from './../../Components/PullUpHeader';

import {default as NewGoalTab} from './Tabs/NewGoal';

import Style from './../../Styles/style';
import Color from './../../Styles/color';

class newGoal extends Abstract {
    constructor(props) {
        super(props);

        this.state = {
            first: true,

            refreshing: false
        };
    }

    componentWillMount() {
    }


    componentDidUpdate() {
    }

    changeActionOnRight = (text, callback) => this.setState({right_header_text: text, right_header_callback: callback});
    getRightHeader = () => <Button transparent onPress={() => this.state.right_header_callback()}><Text style={Style.header.right.text_button}>{ this.state.right_header_text }</Text></Button>

    onGoalCreated() {
        this.props.navigation.dispatch({ type: 'Navigation/BACK' })
    }

    render() {
        return (
            <Container>
                <PullUpHeader back
                              bodyText={I18n.t('planner.titles.3')}
                              navigation={this.props.navigation}
                              right={this.getRightHeader()}
                />

                <NewGoalTab store={this.props.store}
                            style={{flex: 1}}
                            isToggled={true}
                            onCreateExercise={this.props.dispatchCreateExercise}
                            onGoalCreate={this.props.dispatchCreateGoal}
                            onGoalCreated={this.onGoalCreated.bind(this)}
                            errorReset={this.props.dispatchResetError}
                            changeRightHeader={this.changeActionOnRight.bind(this)}
                            plannerCustomMode={this.props.store.auth.user.planner_custom_mode}
                />
            </Container>
        )

    }
}

import { resetError } from './../../Store/Planner/planner.actions';
import { createGoal } from './../../Store/Planner/goal.actions';
import { loadExercises, createExercise } from './../../Store/Exercise/actions';

import {connect} from 'react-redux';

function mapStateToProps (state) {
    return {
        store: state
    }
}

function mapDispatchToProps (dispatch) {
    return {
        dispatchResetError: () => {dispatch(resetError())},

        dispatchCreateExercise: (name, variantName, isCardio) => {dispatch(createExercise(name, variantName, isCardio))},

        dispatchCreateGoal: (payload) => {dispatch(createGoal(payload))},

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(newGoal);