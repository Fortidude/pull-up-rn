import React from 'react';
import { Dispatch } from 'redux';
import { View } from 'react-native';
import { connect } from 'react-redux';

import I18n from 'src/assets/translations';
import Styles from './EmptyList.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import ButtonBig from '../../ButtonBig';
import { ModalActions } from '../../../store/actions/modal';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface
}

class EmptyList extends React.Component<Props> {
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

    openAddTrainingSectionModal = () => {
        this.props.dispatch(ModalActions.addTrainingSectionOpen());
    }

    render() {
        return (
            <View style={this.style.container}>
                <ButtonBig lightShadow text={I18n.t('planner.add_first_training')} onPress={this.openAddTrainingSectionModal} />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme
});

export default connect(mapStateToProps)(EmptyList);
