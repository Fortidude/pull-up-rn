import React from 'react';
import { Dispatch } from 'redux';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Styles from './PlannerFooter.styles';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import Button from '../Button';
import Avatar from '../Avatar';

interface Props {
    onLayout?: () => void;
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
            <View style={this.style.container} onLayout={this.props.onLayout}>
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
