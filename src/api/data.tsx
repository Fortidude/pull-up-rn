import ApiHelper from "./apiHelper";
import { AsyncStorage, Alert } from "react-native";
import jwtDecode from "jwt-decode";

import UserModel from '../models/User';
import Planner from "../models/Planner";
import { Dispatch } from "redux";
import { SyncActions } from "../store/actions/sync";
import { Exercise } from "../models/Exercise";
import { NewGoalApiRequestDataStructureInterface } from "../models/Goal";

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
        return await this.getFetchData('/secured/goal/planner/list', 'goal_planner_list');
    }

    public getExerciseList = async (): Promise<Planner> => {
        const collection = await this.getFetchData('/secured/exercise/list', 'exercise_list');
        return collection.map((exercise: any) => new Exercise(exercise));
    }

    public postCreateSet = async (data: { [key: string]: any }): Promise<ResponseStatus> => {
        return await this.postFetchData('/secured/goal/set/create', data);
    }

    public postCreateSection = async (name: string, description: string = ''): Promise<ResponseStatus> => {
        return await this.postFetchData('/secured/section/create', { name, description });
    }

    public postCreateGoal = async (data: NewGoalApiRequestDataStructureInterface): Promise<ResponseStatus> => {
        return await this.postFetchData('/secured/goal/create', data);
    }

    public postMoveGoalToSection = async (goalId: string, data: { sectionName: string }): Promise<ResponseStatus> => {
        return await this.postFetchData(`/secured/goal/${goalId}/move-to-section`, {section_name: data.sectionName});
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
                console.log(response);
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
                return {status: 'OFFLINE'};
                
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
