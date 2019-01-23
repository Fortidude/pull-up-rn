import React from 'react';
import { Dispatch } from 'redux';
import { Text, TouchableOpacity, View, Animated } from 'react-native';
import { connect } from 'react-redux';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import Styles from './PlannerFab.styles';
import I18n from 'src/assets/translations';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import HapticFeedback from 'src/service/Haptic';
import Events from 'src/service/Events';
import { AppActions } from 'src/store/actions/app';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    plannerEditMode: boolean;
}

interface State {
    hide: boolean;
    menu: boolean;
    sectionsToggled: boolean;
}

class PlannerEditButton extends React.Component<Props, State> {
    style: ThemeValueInterface;

    lineOpacity = new Animated.Value(1);
    linePosition = new Animated.Value(1);
    menuVisible = new Animated.Value(0);

    constructor(props: Props) {
        super(props);

        this.style = Styles(this.props.theme);
        this.state = {
            hide: false,
            menu: false,
            sectionsToggled: false
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    onPress = () => {
        HapticFeedback('impactLight');

        if (this.props.plannerEditMode) {
            this.setState({ menu: false }, () => {
                this.animateMenu(false);
                this.props.dispatch(AppActions.togglePlannerEdit(false));
            })
            return;
        }

        this.setState({ menu: !this.state.menu }, () => {
            this.animateMenu(this.state.menu);
        });
    }

    onEditPress = () => {
        Animated.spring(this.menuVisible, { toValue: 0 }).start();
        this.props.dispatch(AppActions.togglePlannerEdit(true));
    }

    onToggleAll = () => {
        this.setState({ sectionsToggled: !this.state.sectionsToggled }, () => {
            Events.emit('TRAINING_SECTIONS_TOGGLE', this.state.sectionsToggled);
        });
    }

    render() {
        if (this.state.hide) {
            return null;
        }

        const topLineRotate = this.lineOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: ['-45deg', '0deg']
        })
        const middleLineRotate = this.lineOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: ['90deg', '0deg']
        })
        const topLineTopPosition = this.linePosition.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 7]
        })

        const bottomLineRotate = this.lineOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: ['-135deg', '0deg']
        })
        const bottomLineTopPosition = this.linePosition.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -7]
        })

        const menuTranslateX = this.menuVisible.interpolate({
            inputRange: [0.5, 1],
            outputRange: [100, 0]
        })
        const menuTranslateY = this.menuVisible.interpolate({
            inputRange: [0.5, 1],
            outputRange: [100, 0]
        })
        const menuScaleY = this.menuVisible.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0, 1]
        })

        return (
            <React.Fragment>
                <TouchableOpacity onPress={this.onPress} style={this.style.hamburgerContainer}>
                    <View style={this.style.hamburgerInnerContainer}>
                        <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
                            <Animated.View style={[this.style.line, { position: 'absolute', top: topLineTopPosition, transform: [{ rotate: topLineRotate }] }]}></Animated.View>
                            <Animated.View style={[this.style.line, { opacity: this.lineOpacity, transform: [{ rotate: middleLineRotate }] }]}></Animated.View>
                            <Animated.View style={[this.style.line, { position: 'absolute', top: bottomLineTopPosition, transform: [{ rotate: bottomLineRotate }] }]}></Animated.View>
                        </View>
                    </View>
                </TouchableOpacity>
                <Animated.View style={[this.style.menuContainer, { transform: [{ translateX: menuTranslateX }, { translateY: menuTranslateY }, { scale: menuScaleY }] }]}>
                    <TouchableOpacity style={this.style.menuButton} onPress={this.onEditPress}>
                        <FontAwesome name="edit" style={this.style.menuIcon} size={18} color={this.props.theme.colors.plannerFabButtonText} />
                        <Text style={this.style.menuText}>{I18n.t('buttons.edit').toLocaleUpperCase()}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={this.style.menuButton} onPress={this.onToggleAll}>
                        {/* <FontAwesome name="toggle-off" style={this.style.menuIcon} size={20} color={this.props.theme.colors.textColor}/> */}
                        <Text style={[this.style.menuText, !this.state.sectionsToggled && this.style.menuTextDisabled]}>ZWIŃ</Text>
                        <Text style={[this.style.menuText, { marginHorizontal: 5 }]}>/</Text>
                        <Text style={[this.style.menuText, this.state.sectionsToggled && this.style.menuTextDisabled]}>ROZWIŃ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[this.style.menuButton, { opacity: 0.5 }]} onPress={() => { }}>
                        <Text style={this.style.menuText}>{"CELE < 100%"}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </React.Fragment>
        );
    }

    animateMenu = (show: boolean) => {
        const animations = [
            Animated.timing(this.linePosition, { toValue: show ? 0 : 1, duration: 200 }),
            Animated.spring(this.lineOpacity, { toValue: show ? 0 : 1, tension: 40, friction: 4 }),
            Animated.spring(this.menuVisible, { toValue: show ? 1 : 0, })
        ];

        if (!show) {
            // Events.emit('FOOTER_BAR_OPEN');
            // Events.emit('TOP_PROGRESS_BAR_SHOW');
            animations.reverse();
            Animated.parallel(animations).start();
        } else {
            // Events.emit('FOOTER_BAR_CLOSE');
            // Events.emit('TOP_PROGRESS_BAR_HIDE');
            Animated.parallel(animations).start();
        }
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    plannerEditMode: state.app.plannerEditMode
});

export default connect(mapStateToProps)(PlannerEditButton);
