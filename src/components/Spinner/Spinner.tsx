import React from 'react';
import { Dispatch } from 'redux';
import { View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Styles from './Spinner.styles';
import { ThemeInterface, ThemeValueInterface } from '../../assets/themes';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface

    large?: boolean;
    color?: string;
}

class Spinner extends React.Component<Props> {
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
            <ActivityIndicator size={!!this.props.large ? "large" : "small"} 
            color={!!this.props.color ? this.props.color : this.style.spinner.color}/>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.app.theme
});

export default connect(mapStateToProps)(Spinner);
