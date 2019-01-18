import React from 'React';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import I18n from 'src/assets/translations';
import Data from 'src/api/data';

import { AppActions } from 'src/store/actions/app';
import { SyncActions } from 'src/store/actions/sync';
import { ExerciseActions } from 'src/store/actions/exercise';
import Calendar from 'src/service/Calendar';
import { PlannerActions } from 'src/store/actions/planner';
import OnBoarding from '../OnBoarding/OnBoarding';

interface Props {
    dispatch: Dispatch;
    locale: string;
    isOnline: boolean;
    isLogged: boolean;
    isNetworkChecked: boolean;
    onBoarding: boolean;
    anythingToSync: boolean;
    exercisesLoaded: boolean;
    setsHistoryLoaded: boolean;
    statisticsLoaded: boolean;
}

class AppManager extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        I18n.locale = props.locale;
        moment.locale(props.locale);
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
                // run only if was not online or never checked before 
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
        if (this.props.isLogged) {
            this.loadExercises();
            this.loadSetsHistory();
            this.loadStatistics();
        }
    }

    loadExercises = () => {
        if (!this.props.exercisesLoaded) {
            this.props.dispatch(ExerciseActions.loadExercises());
        }
    }

    loadSetsHistory = () => {
        if (this.props.setsHistoryLoaded) {
            return;
        }

        const { months, currentMonthIndex } = Calendar.getMonthsList();
        const fromDate = months[0].startOf('month');
        const toDate = months[currentMonthIndex].endOf('month');
        this.props.dispatch(PlannerActions.loadSetsByDatePeriod(fromDate, toDate));
    }

    loadStatistics = () => {
        if (!this.props.statisticsLoaded) {
            this.props.dispatch(PlannerActions.loadGoalStatistics());
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.onBoarding && this.props.isLogged && <OnBoarding/>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    dispatch: state.dispatch,
    locale: state.settings.locale,
    isOnline: state.app.isOnline,
    isLogged: state.auth.isLogged,
    onBoarding: state.user.onBoarding,
    isNetworkChecked: state.app.networkChecked,
    anythingToSync: state.sync.items.length > 0,
    exercisesLoaded: state.exercise.loaded,
    setsHistoryLoaded: state.planner.setsHistoryLoaded,
    statisticsLoaded: state.planner.statisticsLoaded
});

export default connect(mapStateToProps)(AppManager);
