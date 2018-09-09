import ApiHelper from "./apiHelper";
import { AsyncStorage } from "react-native";
import jwtDecode from "jwt-decode";

import UserModel from '../models/User';
import Planner from "../models/Planner";

interface DataInterface {
}

class Data implements DataInterface {
    private static instance: Data;
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

    public pingServer = async (): Promise<any> => {
        return await fetch(ApiHelper.getHost(), { method: 'GET' })
            .then(() => { return true });
    }

    private getFetchData = async (url: string, cacheKey?: string) => {
        let object = {
            method: 'GET',
            headers: await ApiHelper.getHeaders(true, true)
        };

        // console.log('__FETCH__', url);
        return await fetch(ApiHelper.getHost() + url, object)
            .then(ApiHelper.checkForResponseErrors)
            .then(response => response.json())
            .then(function (response) {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    }
}

export default Data.getInstance();
