import React from 'react';
import { TouchableOpacity, Text, View, SafeAreaView } from 'react-native';
import { NavigationActions, NavigationDispatch, HeaderProps } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/EvilIcons';

import Styles from './Header.styles';
import I18n from '../../assets/translations';
import { ThemeInterface } from '../../assets/themes/index'

interface Props {
    headerProps: HeaderProps;
    dispatch: NavigationDispatch;
    theme: ThemeInterface
}

class Header extends React.Component<Props> {
    previousTitle: string = '';
    style: any = {};

    constructor(props: Props) {
        super(props);
        this.style = Styles(this.props.theme);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (!!nextProps.headerProps.scene.index) {
            let currentIndex = nextProps.headerProps.scene.index;
            this.previousTitle = nextProps.headerProps.scenes[currentIndex - 1].route.routeName;
        } else {
            this.previousTitle = '';
        }

        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = Styles(nextProps.theme);
        }
    }

    componentWillMount() {
    }

    onBackPress = () => {
        this.props.dispatch(NavigationActions.back())
    };

    getPreviousTitle = () => {
        return I18n.t(`routes.${this.previousTitle.toLocaleLowerCase()}`);
    };

    getRouteTitle = () => {
        const routeName = this.props.headerProps.scene.route.routeName;
        return I18n.t(`routes.${routeName.toLocaleLowerCase()}`);
    };

    render() {
        return (
            <SafeAreaView style={this.style.safeArea}>
                <View style={this.style.header}>
                    <View style={this.style.left.container}>
                        {!!this.previousTitle && <TouchableOpacity onPress={this.onBackPress} style={this.style.left.backButton}>
                            <Icon name={'chevron-left'} size={50}
                                style={this.style.left.icon} />
                            <Text style={this.style.left.text} numberOfLines={1}>{this.getPreviousTitle()}</Text>
                        </TouchableOpacity>}
                    </View>
                    <View style={this.style.center.container}>
                        <Text style={this.style.center.text} numberOfLines={1}>{this.getRouteTitle()}</Text>
                    </View>
                    <View style={this.style.right.container}>

                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state:any) => ({
    dispatch: state.dispatch,
    theme: state.app.theme

});

export default connect(mapStateToProps)(Header);
