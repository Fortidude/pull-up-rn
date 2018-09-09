import React from 'react';
import { Dispatch } from 'redux';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import Styles from './GoalListHeader.styles';
import IconComponent from './IconComponent';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    plannerEditMode: boolean;

    name: string;
    active: boolean;
    onButtonClick: () => void;
}

interface State {}

class GoalListHeader extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return nextProps.name !== this.props.name
            || nextProps.theme.name !== this.props.theme.name
            || nextProps.active !== this.props.active
            || nextProps.plannerEditMode !== this.props.plannerEditMode;
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    render() {
        return (
            <TouchableOpacity style={this.style.trainingHeaderContainer}  onPress={this.props.onButtonClick}>
                <Text style={this.style.title}>
                    {this.props.name}
                </Text>
                <View style={this.style.toggleButton}>
                    <IconComponent active={!!this.props.active} />
                </View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    plannerEditMode: state.app.plannerEditMode
});

export default connect(mapStateToProps)(GoalListHeader);
