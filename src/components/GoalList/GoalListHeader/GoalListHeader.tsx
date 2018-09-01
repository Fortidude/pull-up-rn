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

    name: string;
    active?: boolean;
}

interface State {
    active: boolean;
}

class GoalListHeader extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            active: !!this.props.active
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return nextProps.name !== this.props.name
            || nextProps.theme.name !== this.props.theme.name
            || nextProps.active !== this.props.active
            || nextState.active !== this.state.active
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    render() {
        return (
            <View style={this.style.trainingHeaderContainer}>
                <Text style={this.style.title}>
                    {this.props.name}
                </Text>
                <TouchableOpacity style={this.style.toggleButton} onPress={() => this.setState({ active: !this.state.active })}>
                    <IconComponent active={this.state.active} />
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(GoalListHeader);
