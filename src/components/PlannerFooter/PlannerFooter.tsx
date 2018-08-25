import React from 'react';
import { Dispatch } from 'redux';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Styles from './PlannerFooter.styles';
import { ThemeInterface, ThemeValueInterface } from '../../assets/themes';
import Avatar from './Avatar';
import Button from './Button';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface
}

class PlannerFooter extends React.Component<Props> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    render() {
        return (
            <View style={this.style.container}>
                <Button iconName="list" text="Planer" isActive/>
                <Button iconName="chart-bar" text="Statystyki"/>
        
                <Avatar/>
                
                <Button iconName="stopwatch" text="Cardio"/>
                <Button iconName="camera" text="Kamra"/>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.app.theme
});

export default connect(mapStateToProps)(PlannerFooter);
