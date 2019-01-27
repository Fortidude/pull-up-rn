import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PushNotifications from 'src/service/PushNotifications';


interface Props {
    dispatch: Dispatch;
}

class PushNotification extends React.Component<Props> {

    componentDidMount() {
        PushNotifications.configure(this.onNotificationOpened);
        PushNotifications.resetBadge();
    }

    componentWillUnmount() {
    }

    onNotificationOpened = (notification: any) => {
       // console.log('onNotificationOpened');
       // console.log(notification);
    }

    render() {
        return (null);
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch
});

export default connect(mapStateToProps)(PushNotification);

