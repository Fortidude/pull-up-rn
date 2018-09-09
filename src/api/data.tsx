import ApiHelper from "./apiHelper";
import { AsyncStorage } from "react-native";
import jwtDecode from "jwt-decode";

import UserModel from '../models/User';
import Planner from "../models/Planner";
import { Dispatch } from "redux";
import { SyncActions } from "../store/actions/sync";

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

    public postCreateSet = async (data: { [key: string]: any }): Promise<ResponseStatus> => {
        return await this.postFetchData('/secured/goal/set/create', data);
    }

    private getFetchData = async (url: string, cacheKey?: string) => {
        const apiUrl = ApiHelper.getHost() + url;
        const object = {
            method: 'GET',
            headers: await ApiHelper.getHeaders(true, true)
        };

        // console.log('__FETCH__', url);
        return await fetch(apiUrl, object)
            .then(ApiHelper.checkForResponseErrors)
            .then(response => response.json())
            .then(function (response) {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    }

    private postFetchData = async (url: string, data: { [key: string]: any }, cacheKey?: string) => {
        const apiUrl = ApiHelper.getHost() + url;
        const object = {
            method: 'POST',
            headers: await ApiHelper.getHeaders(true, true),
            body: JSON.stringify(data)
        };

        // console.log('__POST__', url, data);
        return await fetch(apiUrl, object)
            .then(ApiHelper.checkForResponseErrors)
            .then(response => response.json())
            .then(function (response) {
                // throw "just for dump test";
                return response;
            })
            .catch((error) => {
                this.dispatch(SyncActions.addRequest(apiUrl, object));
                throw error;
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
                console.log(error);
                throw error;
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
