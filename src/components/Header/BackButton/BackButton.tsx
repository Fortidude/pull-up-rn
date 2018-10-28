import React from 'react';
import { Dispatch } from 'redux';
import { TouchableOpacity, Animated, Text } from 'react-native';
import { connect } from 'react-redux';
import { HeaderProps, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/EvilIcons';

import Styles from './BackButton.styles';
import I18n from 'src/assets/translations';
import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import { ModalState } from 'src/store/reducers/modal';
import HapticFeedback from 'src/service/Haptic';

//@ts-ignore
import HeaderStyleInterpolator from 'react-navigation-stack/dist/views/Header/HeaderStyleInterpolator.js';
import Events from 'src/service/Events';

interface Props {
    headerProps: HeaderProps;
    dispatch: Dispatch;
    theme: ThemeInterface,
    modal: ModalState;

    hide?: boolean;
}

interface State {
    previousTitle: string;
    backTextOverride: string | null;
    backActionOverride: any;
    showIcon: boolean;
}

class BackButton extends React.Component<Props, State> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            previousTitle: '',
            backTextOverride: null,
            backActionOverride: null,
            showIcon: true
        }
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        const nextRoute = nextProps.headerProps.scene.route.routeName.toLocaleLowerCase();
        const currentRoute = this.getRawCurrentTitle();
        return nextRoute !== currentRoute || nextProps.theme.name !== this.props.theme.name;
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setupTitle(nextProps);

        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    componentDidMount() {
        this.setupTitle(this.props);
        Events.listenTo('HEADER_CALENDAR_HIDE_CLOSE_BUTTON', 'BackButton', () => {
            this.setState({
                backTextOverride: null,
                backActionOverride: null,
                showIcon: true
            });
        });

        Events.listenTo('HEADER_CALENDAR_SHOW_CLOSE_BUTTON', 'BackButton', () => {
            const backAction = () => {
                Events.emit('HEADER_ON_CLOSE_BUTTON');
            };
            this.setState({
                backTextOverride: I18n.t('buttons.close'),
                backActionOverride: backAction,
                showIcon: false
            });
        })
    }

    componentWillUnmount() {
        Events.remove('HEADER_CALENDAR_HIDE_CLOSE_BUTTON', 'BackButton');
        Events.remove('HEADER_CALENDAR_SHOW_CLOSE_BUTTON', 'BackButton');
    }

    setupTitle = (props: Props) => {
        const indexExist = !!props.headerProps.scene.index;

        if (indexExist) {
            const currentIndex = props.headerProps.scene.index;
            let previousTitle = props.headerProps.scenes[currentIndex - 1].route.routeName.toLocaleLowerCase();

            this.setState({previousTitle});
            return;
        }

        this.setState({previousTitle: ''});
    }

    getRawCurrentTitle = () => this.props.headerProps.scene.route.routeName;
    getPreviousTitle = () => {
        if (this.state.backTextOverride) {
            return this.state.backTextOverride;
        }

        return I18n.t(`routes.${this.state.previousTitle.toLocaleLowerCase()}`);
    };

    onBackPress = () => {
        HapticFeedback('impactLight');

        if (this.state.backActionOverride) {
            this.state.backActionOverride();
            return;
        }

        this.props.dispatch(NavigationActions.back())
    };

    render() {
        return (
            <React.Fragment>
                <TouchableOpacity onPress={this.onBackPress} style={this.style.backButton}>
                    <Animated.View style={[{width: 22}, HeaderStyleInterpolator.forLeft(this.props.headerProps)]}>
                        {!!this.state.showIcon && <Icon name={'chevron-left'} size={50} style={[this.style.icon]} />}
                    </Animated.View>
                    <Animated.View style={[HeaderStyleInterpolator.forLeftLabel(this.props.headerProps)]}>
                        <Text style={this.style.backText}>{this.getPreviousTitle()}</Text>
                    </Animated.View>
                </TouchableOpacity>
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
