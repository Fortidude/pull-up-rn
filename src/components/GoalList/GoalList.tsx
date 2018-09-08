import React from 'react';
import { Dispatch } from 'redux';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { ThemeInterface, ThemeValueInterface } from '../../assets/themes';
import Styles from './GoalList.styles';
import GoalListHeader from './GoalListHeader';
import GoalItem from './GoalItem';
import Training from '../../models/Training';
import GoalListContainer from './GoalListContainer/GoalListContainer';

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

class ExerciseList extends React.Component<Props, State> {
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
        } else if (!nextProps.plannerEditMode && this.props.plannerEditMode) {
            setTimeout(() => {
                this.setState({ toggled: false });
            }, 200);
        }
    }

    countHeight = () => this.props.training.goals.length * 70;
    toggleList = () => {
        const toggled = !this.state.toggled;
        this.setState({ toggled: toggled });
    }

    render() {
        return (
            <View style={this.style.exerciseListContainer}>
                <GoalListHeader active={this.state.toggled} onButtonClick={this.toggleList} name={this.props.training.name} />
                <GoalListContainer active={this.state.toggled} height={this.countHeight()}>
                    <React.Fragment>
                        {this.props.training.goals.map((goal, key) =>
                            <GoalItem
                                toggleParentScroll={this.props.toggleParentScroll}
                                goal={goal}
                                key={key} />
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

export default connect(mapStateToProps)(ExerciseList);
