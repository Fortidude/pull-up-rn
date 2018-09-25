import React from 'React';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import I18n from './../../assets/translations';
import { AppActions } from '../../store/actions/app';
import Data from '../../api/data';
import { SyncActions } from '../../store/actions/sync';
import { Exercise } from '../../models/Exercise';
import { ExerciseActions } from '../../store/actions/exercise';
import { ModalActions } from '../../store/actions/modal';

interface Props {
    dispatch: Dispatch;
    locale: string;
    isOnline: boolean;
    isNetworkChecked: boolean;
    anythingToSync: boolean;
    exercisesLoaded: boolean;
}

class AppManager extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        I18n.locale = props.locale;
    }

    componentWillMount() {
        Data.setDispatch(this.props.dispatch);

        this.checkIfOnline();
        setInterval(() => {
            this.checkIfOnline()
        }, 3000);
    }

    checkIfOnline = () => {
        Data.pingServer()
            // IS ONLINE
            .then(response => {
                // run only if was not online or never checkec before 
                if (!this.props.isOnline || !this.props.isNetworkChecked) {
                    this.props.dispatch(AppActions.isOnline());
                    this.props.dispatch(SyncActions.synchronize());

                    // @TODO for test purpose
                    //this.props.dispatch(ModalActions.goalCreateOpen());
                }

                this.runWhenOnline();
            })
            // IS OFFLINE
            .catch(err => {
                // run only if was online or never checked before
                if (this.props.isOnline || !this.props.isNetworkChecked) {
                    this.props.dispatch(AppActions.isOffline());
                }
            });
    }

    runWhenOnline = () => {
        this.loadExercises();
    }

    loadExercises = () => {
        if (!this.props.exercisesLoaded) {
            this.props.dispatch(ExerciseActions.loadExercises());
        }
    }

    render() {
        return null;
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    locale: state.settings.locale,
    isOnline: state.app.isOnline,
    isNetworkChecked: state.app.networkChecked,
    anythingToSync: state.sync.items.length > 0,
    exercisesLoaded: state.exercise.loaded
});

export default connect(mapStateToProps)(AppManager);
