import React from 'React';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import I18n from './../../assets/translations';
import { AppActions } from '../../store/actions/app';
import data from '../../api/data';

interface Props {
    dispatch: Dispatch;
    locale: string;
    isOnline: boolean;
    isNetworkChecked: boolean;
}

class AppManager extends React.Component<Props> {
    constructor(props:Props) {
        super(props);

        I18n.locale = props.locale;
    }

    componentWillMount() {
        this.checkIfOnline();
        setInterval(() => {
            this.checkIfOnline()
        }, 3000);
    }

    checkIfOnline = () => {
        data.pingServer()
                .then(response => {
                    if (!this.props.isOnline || !this.props.isNetworkChecked) {
                        this.props.dispatch(AppActions.isOnline());
                    }
                })
                .catch(err => {
                    if (this.props.isOnline || !this.props.isNetworkChecked) {
                        this.props.dispatch(AppActions.isOffline());
                    }
                });
    }

    render() {
        return null;
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    locale: state.settings.locale,
    isOnline: state.app.isOnline,
    isNetworkChecked: state.app.networkChecked
});

export default connect(mapStateToProps)(AppManager);
