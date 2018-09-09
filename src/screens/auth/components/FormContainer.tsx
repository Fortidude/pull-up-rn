import React, { ReactNode } from 'react';
import { Platform, EventSubscription, Animated, Keyboard } from 'react-native';

import { ThemeInterface, ThemeValueInterface } from '../../../assets/themes';
import getStyle from '../auth.styles';
import { connect } from 'react-redux';

interface Props {
    children: ReactNode;
    theme: ThemeInterface;
    keyboardPadding: number;
}

interface State {
    formPaddingTop: any
}

class FormContainer extends React.Component<Props, State> {
    style: ThemeValueInterface;

    keyboardDidShowListener: EventSubscription;
    keyboardDidHideListener: EventSubscription;


    constructor(props: Props) {
        super(props);
        this.style = getStyle(this.props.theme);

        this.state = {
            formPaddingTop: new Animated.Value(150)
        }

        let keyboardShowEvent = "keyboardDidShow";
        let keyboardHideEvent = "keyboardDidHide";
        if (Platform.OS === 'ios') {
            keyboardShowEvent = "keyboardWillShow";
            keyboardHideEvent = "keyboardWillHide";
        }

        this.keyboardDidShowListener = Keyboard.addListener(keyboardShowEvent, this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener(keyboardHideEvent, this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.theme.name !== this.props.theme.name) {
            this.style = getStyle(nextProps.theme);
        }
    }

    _keyboardDidShow = () => {
        Animated.timing(this.state.formPaddingTop, {
            toValue: this.props.keyboardPadding,
            duration: 400,
        }).start();
    }

    _keyboardDidHide = () => {
        Animated.timing(this.state.formPaddingTop, {
            toValue: 150,
            duration: 400,
        }).start();
    }

    render() {
        return (
            <Animated.View style={[this.style.container_content, { paddingTop: this.state.formPaddingTop }]}>
                {this.props.children}
            </Animated.View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    theme: state.settings.theme
});

export default connect(mapStateToProps)(FormContainer);
