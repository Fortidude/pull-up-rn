import React from 'react';
import { Dispatch } from 'redux';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import Styles from './ModalFooter.styles';
import { ThemeInterface, ThemeValueInterface } from 'src/assets/themes';
import I18n from 'src/assets/translations';
import Spinner from 'src/components/Spinner';

interface Props {
    dispatch: Dispatch;
    theme: ThemeInterface;
    loading: boolean;

    successText: string;
    onSuccess: () => void;

    cancelText?: string;
    onCancel?: () => void;

    onlineRequired?: boolean;
    isOnline: boolean;

    style?: {}
}

class ModalFooter extends React.Component<Props> {
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

    dismissModal = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    render() {
        if (this.props.onlineRequired && !this.props.isOnline) {
            return (
                <View style={[this.style.container, this.props.style]}>
                    <TouchableOpacity onPress={this.dismissModal} style={this.style.leftButton.container}>
                        <Text style={[this.style.offlineInformationText]}>
                            {I18n.t('errors.no_internet_connection_required_for_this_action')}
                        </Text>
                        <Text style={[this.style.offlineInformationText]}>
                        {I18n.t('buttons.clickToClose')}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }

        let loadingColor = this.props.loading ? this.props.theme.colors.disableText : this.props.theme.colors.danger;
        return (
            <View style={[this.style.container, this.props.style]}>

                {this.props.onCancel &&
                    <TouchableOpacity onPress={this.props.onCancel} style={this.style.leftButton.container}>
                        <Text style={[this.style.leftButton.text, { color: loadingColor }]}>{this.props.cancelText}</Text>
                    </TouchableOpacity>
                }
                {this.props.onCancel &&
                    <View style={this.style.betweenButtons}></View>
                }
                <TouchableOpacity onPress={this.props.onSuccess} style={this.style.rightButton.container}>
                    {!this.props.loading && <Text style={[this.style.rightButton.text]}>{this.props.successText}</Text>}
                    {this.props.loading && <Spinner color={this.props.theme.colors.main} />}
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    theme: state.settings.theme,
    isOnline: state.app.isOnline
});

export default connect(mapStateToProps)(ModalFooter);
