import ApiHelper from "./apiHelper";
import { Alert } from "react-native";

import Planner from "../models/Planner";
import { Dispatch } from "redux";
import { SyncActions } from "../store/actions/sync";
import { Exercise } from "../models/Exercise";
import { NewGoalApiRequestDataStructureInterface } from "../models/Goal";
import moment from 'moment';
import Set from "src/models/Set";
import { StatisticsInterface } from "src/models/Statistics";

interface ResponseStatus { status: boolean };

interface DataInterface {
}

class Data implements DataInterface {
    private static instance: Data;
    private dispatch: Dispatch;

    private constructor() { }
    static getInstance() {
        if (!Data.instance) {
            Data.instance = new Data();
        }
        return Data.instance;
    }

    public getPlannerByTrainings = async (): Promise<Planner> => {
        const data = await this.getFetchData('/secured/section/list', 'goal_planner_list');
        return new Planner(data);
    }

    public getPlannerByDays = async (): Promise<Planner> => {
        const data = await this.getFetchData('/secured/goal/planner/list', 'goal_planner_list');
        return new Planner(data);
    }

    public getExerciseList = async (): Promise<Planner> => {
        const collection = await this.getFetchData('/secured/exercise/list', 'exercise_list');
        return collection.map((exercise: any) => new Exercise(exercise));
    }

    public getGoalSetsHistory = async (fromDate: moment.Moment, toDate: moment.Moment): Promise<Planner> => {
        const fromDateString = fromDate.format('D-M-YYYY');
        const toDateString = toDate.format('D-M-YYYY');
        const collection = await this.getFetchData(`/secured/goal/set/history-period/${fromDateString}/${toDateString}`, `goal_set_history_${fromDateString}${toDateString}`);
        return collection.map((set: any) => new Set(set));
    }

    public getGoalStatistics = async (): Promise<StatisticsInterface> => {
        return await this.getFetchData('/secured/goal/statistics', 'goal_planner_statistics');
    }

    public postCreateSet = async (data: { [key: string]: any }): Promise<ResponseStatus> => {
        const payload = Object.assign({}, data);
        payload.date = payload.date.toString();
        return await this.postFetchData('/secured/goal/set/create', payload);
    }

    public postCreateSection = async (name: string, description: string = ''): Promise<ResponseStatus> => {
        return await this.postFetchData('/secured/section/create', { name, description });
    }

    public postCreateGoal = async (data: NewGoalApiRequestDataStructureInterface): Promise<ResponseStatus> => {
        return await this.postFetchData('/secured/goal/create', data);
    }

    public postMoveGoalToSection = async (goalId: string, data: { sectionName: string }): Promise<ResponseStatus> => {
        return await this.postFetchData(`/secured/goal/${goalId}/move-to-section`, { section_name: data.sectionName });
    }

    public postDisableGoal = async (goalId: string): Promise<ResponseStatus> => {
        return await this.postFetchData(`/secured/goal/${goalId}/disable`, {});
    }

    public postUpdateSettings = async (data: {[key: string]: any}): Promise<ResponseStatus> => {
        return await this.postFetchData(`/secured/settings/update`, data);
    }

    private getFetchData = async (url: string, cacheKey?: string, useToken: boolean = true, asJson: boolean = true) => {
        const apiUrl = ApiHelper.getHost() + url;
        const object = {
            method: 'GET',
            headers: await ApiHelper.getHeaders(useToken, asJson)
        };

        if (__DEV__) {
            console.log('__GET__', url);
        }

        return await fetch(apiUrl, object)
            .then(ApiHelper.checkForResponseErrors)
            .then(response => response.json())
            .then(function (response) {
                return response;
            })
            .catch((error: Error) => {
                console.log(apiUrl);
                if (__DEV__) {
                    throw error;
                } else {
                    // @TODO
                    Alert.alert("FATAL ERROR");
                }
            });
    }

    private postFetchData = async (url: string, data: { [key: string]: any }, cacheKey?: string) => {
        const apiUrl = ApiHelper.getHost() + url;
        const object = {
            method: 'POST',
            headers: await ApiHelper.getHeaders(true, true),
            body: JSON.stringify(data)
        };

        if (__DEV__) {
            console.log('__POST__', url, data);
        }

        return await fetch(apiUrl, object)
            .then(ApiHelper.checkForResponseErrors)
            .then(response => response.json())
            .then(function (response) {
                return response;
            })
            .catch((error) => {
                this.dispatch(SyncActions.addRequest(apiUrl, object));
                return { status: 'OFFLINE' };

                if (__DEV__) {
                    // throw error;
                } else {
                    // @TODO
                    Alert.alert("FATAL ERROR");
                }
            });
    }

    public callManual = async (url: string, headers: RequestInit) => {
        return await fetch(url, headers)
            .then(ApiHelper.checkForResponseErrors)
            .then(response => response.json())
            .then(function (response) {
                console.log('MANUAL CALL SUCCESS', response);
                return response;
            })
            .catch((error) => {
                if (__DEV__) {
                    //  throw error;
                } else {
                    // @TODO
                    Alert.alert("FATAL ERROR");
                }
            });
    }

    public pingServer = async (): Promise<any> => {
        return await fetch(ApiHelper.getHost(), { method: 'GET' })
            .then(() => { return true });
    }

    /**
     * 
     * @param dispatch 
     */
    public setDispatch(dispatch: Dispatch) {
        if (!this.dispatch) {
            this.dispatch = dispatch;
        }
    }
}

export default Data.getInstance();
