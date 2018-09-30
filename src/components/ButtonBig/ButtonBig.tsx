import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import Styles from './ButtonBig.styles';

import {ThemeInterface} from 'src/assets/themes/index'
import Spinner from 'src/components/Spinner';

interface Props {
    theme: ThemeInterface;
    onPress: () => void;
    text: string;
    isLoading?: boolean;
    lightShadow?: boolean;
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
            <TouchableOpacity style={[this.style.container, this.props.lightShadow ? this.style.containerLightShadow : this.style.containerShadow]} onPress={this.props.onPress}>
                {!this.props.isLoading && <Text style={this.style.text}>{this.props.text}</Text>}
                {this.props.isLoading && <Spinner/>}
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state: any) => ({
    theme: state.settings.theme
});

export default connect(mapStateToProps)(ButtonBig);
