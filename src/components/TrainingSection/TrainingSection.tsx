import React from 'react';
import { Dispatch } from 'redux';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Styles from './TrainingSection.styles';
import GoalListContainer from './GoalListContainer/GoalListContainer';
import GoalListHeader from './GoalListHeader';
import GoalItem from './GoalItem';

import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import Training from 'src/models/Training';
import { ModalActions } from 'src/store/actions/modal';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    plannerEditMode: boolean;

    training: Training
    isFirst?: boolean;

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

    countGoals = () => this.props.training.goals.length
    countHeight = () => this.countGoals() * 70;
    toggleList = () => {
        if (this.props.plannerEditMode) {
            this.props.dispatch(ModalActions.goalCreateOpen());
            return;
        }
        const toggled = !this.state.toggled;
        this.setState({ toggled: toggled });
    }

    render() {
        return (
            <View style={this.style.exerciseListContainer}>
                <GoalListHeader active={this.state.toggled} onButtonClick={this.toggleList} name={this.props.training.name} />
                <GoalListContainer active={this.state.toggled} height={this.countHeight()}>
                    <React.Fragment>
                        {this.props.training.goals.map((goal, key) => {
                            return (<GoalItem
                                toggleParentScroll={this.props.toggleParentScroll}
                                isToggled={this.state.toggled}
                                goal={goal}
                                key={key} />);
                        }
                        )}
                    </React.Fragment>
                </GoalListContainer>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    plannerEditMode: state.app.plannerEditMode
});

export default connect(mapStateToProps)(TrainingSection);
