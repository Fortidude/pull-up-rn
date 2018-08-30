import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ThemeValueInterface } from '../../assets/themes';
import I18n from './../../assets/translations';

interface Props {
    dispatch: Dispatch;
    locale: string;
}

class AppManager extends React.Component<Props> {
    style: ThemeValueInterface;

    constructor(props: Props) {
        super(props);
     
        I18n.locale = this.props.locale;
    }

    componentWillReceiveProps(nextProps: Props) {
    }

    render() {
        return null;
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    locale: state.app.locale
});

export default connect(mapStateToProps)(AppManager);
