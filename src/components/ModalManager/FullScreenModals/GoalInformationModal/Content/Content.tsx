import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Animated, Text, View, ScrollView } from 'react-native';
import moment from 'moment'

import { ThemeValueInterface, ThemeInterface } from 'src/assets/themes';

import ModalFooter from 'src/components/ModalManager/ModalFooter/ModalFooter';
import ModalHeader from 'src/components/ModalManager/ModalHeader/ModalHeader';
import { FOOTER_HEIGHT } from 'src/components/FooterBar/FooterBar.styles';

import Set from 'src/models/Set';
import Goal from 'src/models/Goal';

import getStyle from './Content.styles';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;

    onClose: () => void;
};

interface State { }

class DayModalItem extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
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
            <React.Fragment>
                <ModalHeader text={"Info"} />
                <View style={this.style.content}>
                    
                </View>
                <ModalFooter style={{ height: FOOTER_HEIGHT }} loading={false} successText={'Zamknij'} onSuccess={this.props.onClose} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(DayModalItem);
