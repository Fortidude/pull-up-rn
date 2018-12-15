import React from 'react';
import { Dispatch } from 'redux';
import { LayoutAnimation, View, Animated } from 'react-native';
import { connect } from 'react-redux';

import Styles from './TrainingSection.styles';
import GoalListContainer from './GoalListContainer/GoalListContainer';
import GoalListHeader from './GoalListHeader';
import GoalItem from './GoalItem';

import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import Training from 'src/models/Training';
import { ModalActions } from 'src/store/actions/modal';
import { PlannerActions } from '../../store/actions/planner';
import { SectionInterface } from 'src/models/Section';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    plannerEditMode: boolean;
    plannerCustomMode: boolean;
    sections: string[];

    training: Training
    isFirst?: boolean;

    onGoalClick: () => void;
    toggleParentScroll?: (enable: boolean) => void,
}

interface State {
    toggled: boolean;
}

class TrainingSection extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        const toggled = !!props.isFirst;

        this.style = Styles(this.props.theme);
        this.state = {
            toggled: toggled
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }

        if (nextProps.plannerEditMode && !this.props.plannerEditMode) {
            this.setState({ toggled: true });
        }

    }

    countHeight = () => this.countGoals() * 70;
    countGoals = () => this.props.training.goals.reduce((number, goal) => {
        return number + (goal.removed ? 0 : 1);
    }, 0);

    toggleList = (name: string | null) => {
        if (this.props.plannerEditMode) {
            if (!this.props.plannerCustomMode) {
                return;
            }

            //@ts-ignore
            this.refs.listContainer.measure((x, y, width, height, windowX, windowY) => {
                this.props.dispatch(PlannerActions.selectSection(name))
                this.props.dispatch(ModalActions.goalCreateOpen(width, windowY));
            });
            return;
        }
        const toggled = !this.state.toggled;
        this.setState({ toggled: toggled });
    }

    moveGoalToSection = (goalId: string, onPickCallback?: () => void, onDispatchCallback?: () => void) => {
        const options = this.props.sections;
        const onPick = (index: number) => {
            onPickCallback ? onPickCallback() : null;
            setTimeout(() => {
                this.props.dispatch(PlannerActions.moveGoalToSection(goalId, options[index]));
                onDispatchCallback ? onDispatchCallback() : null;
            }, onPickCallback ? 700 : 0);
        }
        this.props.dispatch(ModalActions.pickerOpen(options, true, onPick));
    }

    render() {
        return (
            <View ref="listContainer" style={this.style.exerciseListContainer}>
                <GoalListHeader
                    empty={this.props.training.goals.length === 0}
                    active={this.state.toggled}
                    onButtonClick={this.toggleList}
                    name={this.props.training.name}
                />
                <GoalListContainer active={this.state.toggled} height={this.countHeight()}>
                    <React.Fragment>
                        {this.props.training.goals.map((goal, key) => {
                            if (!goal.removed) {
                                return (<GoalItem
                                    onGoalClick={this.props.onGoalClick}
                                    onMoveToSection={this.moveGoalToSection}
                                    toggleParentScroll={this.props.toggleParentScroll}
                                    isToggled={this.state.toggled}
                                    goal={goal}
                                    key={`${this.props.training.key}-${goal.id}`} />);
                            }
                        })}
                    </React.Fragment>
                </GoalListContainer>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    plannerEditMode: state.app.plannerEditMode,
    plannerCustomMode: state.user.current ? state.user.current.planner_custom_mode : false,
    sections: state.planner.sections
        .map((section: SectionInterface) => section.name)
        .filter((name: string) => name.length > 0)
});

export default connect(mapStateToProps)(TrainingSection);
