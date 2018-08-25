import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import Styles from './ButtonBig.styles';
import {ThemeInterface} from '../../assets/themes/index'
import Spinner from '../Spinner';

interface Props {
    theme: ThemeInterface;
    onPress: () => void;
    text: string;
    isLoading?: boolean;
}

class ButtonBig extends React.Component<Props> {
    style:any = {};

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
            <TouchableOpacity style={this.style.container} onPress={this.props.onPress}>
                {!this.props.isLoading && <Text style={this.style.text}>{this.props.text}</Text>}
                {this.props.isLoading && <Spinner/>}
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: any) => ({
    theme: state.app.theme
});

export default connect(mapStateToProps)(ButtonBig);
