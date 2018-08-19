import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import getStyle from './ASampleTemplateScreen.styles';
import I18n from '../../../assets/translations';

type Props = {
    dispatch: void,
    theme: {},
};
class ASampleTemplateScreen extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.style = getStyle(this.props.theme);
    }

     componentWillReceiveProps(nextProps: Props) {
         if (nextProps.theme.name !== this.props.theme.name) {
             this.style = getStyle(nextProps.theme);
         }
     }

    render() {
        return (
            <View style={this.style.container}>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    dispatch: state.dispatch,
    theme: state.app.theme
});

export default connect(mapStateToProps)(ASampleTemplateScreen);
