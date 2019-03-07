import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import Styles from './ButtonBig.styles';

import {ThemeInterface} from 'src/assets/themes/index'
import Spinner from 'src/components/Spinner';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
    theme: ThemeInterface;
    onPress: () => void;
    text: string;
    icon?: string;
    isLoading?: boolean;
    lightShadow?: boolean;

    style?: any;
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
        let isIcon = !!this.props.icon;
        let containerStyle = [this.style.container];

        containerStyle.push(isIcon && this.style.containerWithIcon);
        containerStyle.push(this.props.lightShadow ? this.style.containerLightShadow : this.style.containerShadow);
        containerStyle.push(this.props.style);

        return (
            <TouchableOpacity style={containerStyle} onPress={this.props.onPress}>
                {isIcon && <Icon style={this.style.icon} name={this.props.icon}/>}
                {!this.props.isLoading && <Text style={this.style.text}>{this.props.text}</Text>}
                {this.props.isLoading && <Spinner/>}
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: any) => ({
    theme: state.settings.theme,
});

export default connect(mapStateToProps)(ButtonBig);
