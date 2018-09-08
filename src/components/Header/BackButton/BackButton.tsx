import React from 'react';
import { Dispatch } from 'redux';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { HeaderProps, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/EvilIcons';

import Styles from './BackButton.styles';
import LeftText from './LeftText';
import I18n from '../../../assets/translations';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import { ModalState } from '../../../store/reducers/modal';
import { ModalActions } from '../../../store/actions/modal';

interface Props {
    headerProps: HeaderProps;
    dispatch: Dispatch;
    theme: ThemeInterface,
    modal: ModalState;
}

interface State {
    back: boolean;
}

class BackButton extends React.Component<Props, State> {
    previousTitle: string = '';
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            back: false
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        const nextRoute = nextProps.headerProps.scene.route.routeName.toLocaleLowerCase();
        const currentRoute = this.getRawCurrentTitle();

        const willProfileModal = nextProps.modal.profileModalVisible;
        const isProfileModal = this.props.modal.profileModalVisible;

        return nextRoute !== currentRoute || willProfileModal !== isProfileModal || nextProps.theme.name !== this.props.theme.name;
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setupTitle(nextProps);

        this.setState({ back: false });

        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    setupTitle = (props: Props) => {
        const profileModalVisible = props.modal.profileModalVisible;
        const nextTitle = props.headerProps.scene.route.routeName.toLocaleLowerCase();
        const indexExist = !!props.headerProps.scene.index;

        if (profileModalVisible && nextTitle === 'planner') {
            this.previousTitle = 'planner';
            return;
        }

        if (indexExist) {
            const currentIndex = props.headerProps.scene.index;
            let previousTitle = props.headerProps.scenes[currentIndex - 1].route.routeName.toLocaleLowerCase();
            if (previousTitle === 'planner' && profileModalVisible) {
                previousTitle = 'profile';
            }

            console.log(previousTitle, profileModalVisible);
            this.previousTitle = previousTitle;
            return;
        }

        this.previousTitle = '';

    }

    getRawCurrentTitle = () => this.props.headerProps.scene.route.routeName;
    getPreviousTitle = () => {
        return I18n.t(`routes.${this.previousTitle.toLocaleLowerCase()}`);
    };

    onBackPress = () => {
        this.setState({ back: true }, () => {
            if (this.props.modal.profileModalVisible && this.getRawCurrentTitle().toLocaleLowerCase() === 'planner') {
                this.props.dispatch(ModalActions.profileClose());
                return;
            }

            this.props.dispatch(NavigationActions.back())
        })
    };

    render() {
        return (
            <React.Fragment>
                {!!this.previousTitle && <TouchableOpacity onPress={this.onBackPress} style={this.style.backButton}>
                    <Icon name={'chevron-left'} size={50} style={this.style.icon} />
                    <LeftText back={this.state.back} value={this.getPreviousTitle()} />
                </TouchableOpacity>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    modal: state.modal
});

export default connect(mapStateToProps)(BackButton);
