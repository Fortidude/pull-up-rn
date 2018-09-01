import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import I18n from './../../assets/translations';

interface Props {
    dispatch: Dispatch;
    locale: string;
}

const AppManager = (props: Props) => {
    I18n.locale = props.locale;

    return null;
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    locale: state.settings.locale
});

export default connect(mapStateToProps)(AppManager);
