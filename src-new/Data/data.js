import {AsyncStorage, Image, NetInfo} from 'react-native';
import UserService from './user';
import QueueApiService from './queue.api';

let DataServiceInstance = null;

//export let host = 'http://192.168.0.111';
//export let host = 'http://localhost';
export let host = 'http://pullup.online';

class DataService {
    image = null;
    register_background = null;
    isOnline = false;

    constructor() {
        if (!DataServiceInstance) {
            DataServiceInstance = this;
        }

        DataServiceInstance.connectionListener();
        DataServiceInstance.image = require('./../Images/background-woman-light2.jpg');
        DataServiceInstance.register_background = require('./../Images/background.jpg');
        //DataServiceInstance.image = require('./../Images/background-light.jpg');
        DataServiceInstance.cache = {};

        return DataServiceInstance;
    }

    connectionListener() {
        NetInfo.isConnected.fetch().then(isConnected => {
            this.isOnline = isConnected
        });

        function changed(isConnected) {
            DataServiceInstance.isOnline = isConnected;
        }

        NetInfo.isConnected.addEventListener(
            'connectionChange',
            changed
        );
    }

    getBackgroundImage() {
        return DataServiceInstance.image;
    }

    getRegisterBackgroundImage() {
        return DataServiceInstance.register_background;
    }

    getHost() {
        return host;
    }

    _getError(error) {
        if (error && error.message) {
           // if (error.message === 'Network request failed') {
            return error.message;
        }

        return error;
    }

    _clearFromCache(cacheKey) {
        if (typeof DataServiceInstance.cache[cacheKey] !== 'undefined') {
            delete DataServiceInstance.cache[cacheKey];
        }
    }

    clearCache() {
        return new Promise((resolve, reject) => {
            this._clearFromCache('goal_list');
            this._clearFromCache('exercise_list');
            this._clearFromCache('goal_planner_list');
            return UserService.resetCurrentUser().then(() => {
                resolve(true);
            })
        });
    }

    resetCurrentUser() {
        return new Promise((resolve, reject) => {
            return UserService.resetCurrentUser().then((user) => {
                resolve(user);
            })
        });
    }

    _getFetchData(url, cacheKey) {
        return new Promise((resolve, reject) => {
            if (!DataServiceInstance.isOnline) {
                reject('Network request failed');
                return;
            }

            if (!QueueApiService.isSynchronized()) {
                reject('Wait for synchronization');
                return;
            }

           // console.log('__REQUEST__', url);
            AsyncStorage.getItem('token', (error, token) => {
                if (!token) {
                    reject('Token not found');
                } else {
                   // console.log(token);
                    if (cacheKey && DataServiceInstance.cache[cacheKey]) {
                        resolve(DataServiceInstance.cache[cacheKey]);
                        return;
                    }

                    let object = {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                        }
                    };
                   // console.log('__FETCH__', url);
                    return fetch(host + url, object)
                        .then(response => response.json())
                        .then(function (response) {
                            if (typeof response.code !== 'undefined' && response.code !== 200) {
                                reject(DataServiceInstance._getError(response));
                            }

                            if (cacheKey) {
                                DataServiceInstance.cache[cacheKey] = response;
                            }

                            resolve(response);
                        })
                        .catch((error) => {
                            reject(DataServiceInstance._getError(error));
                        });
                }
            });
        });
    }

    _postFetchData(url, data, method = 'POST') {
        return new Promise((resolve, reject) => {
            if (!DataServiceInstance.isOnline) {
                QueueApiService.addData(url, data, method);
                resolve({status: true});
                return;
            }

           // console.log('__POST__', url);

            AsyncStorage.getItem('token', (error, token) => {
                if (!token) {
                    reject('Token not found');
                } else {

                    let object = {
                        method: method,
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    };

                    if (data) {
                        object['body'] = JSON.stringify(data);
                    }

                    return fetch(host + url, object)
                        .then(response => response.json())
                        .then(function (response) {
                            if (typeof response.code !== 'undefined' && response.code !== 200) {
                                resolve({status: false, message: DataServiceInstance._getError(response.message)});
                            }

                            resolve({status: true});
                        })
                        .catch((error) => {
                            resolve({message: '??'})
                        });
                }
            });
        });
    }

    /**
     *
     * @returns {*}
     */
    getUserData() {
        return this._getFetchData('/secured/profile/current', false);
    }

    /**
     *
     * @returns {*}
     */
    getFirstFormData() {
        return this._getFetchData('/secured/training/first-form', 'first_form');
    }

    /**
     *
     * @param data
     * @returns {*}
     */
    postFirstFormData(data) {
        data = {
            data: JSON.stringify(data)
        };

        return this._postFetchData('/secured/training/first-form', data);
    }

    /**
     *
     * @returns {*}
     */
    getPullUpCurrentTraining() {
        return this._getFetchData('/secured/training/current', false);
    }

    /**
     *
     * @param data
     * @returns {*}
     */
    postPullUpCurrentTraining(data) {
        data = {
            data: JSON.stringify(data)
        };

        return this._postFetchData('/secured/training/current', data);
    }

    /**
     *
     * @returns {*}
     */
    getPullUpTrainingHistory() {
        return this._getFetchData('/secured/training/history', false);
    }

    /**
     *
     * @param data
     * @returns {Promise}
     */
    postContactForm(data) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 2000);
        });
    }

    /**
     *
     * @returns {*}
     */
    getExerciseList(cache = true) {
        if (!cache) {
            this._clearFromCache('exercise_list');
        }

        return this._getFetchData('/secured/exercise/list', 'exercise_list');
    }

    /**
     *
     * @param name
     * @param variant
     * @param isCardio
     * @returns {Promise}
     */
    postCreateExercise(name, variant, isCardio) {
        return this._postFetchData('/secured/exercise/create', {name: name, variant_name: variant, is_cardio: isCardio});
    }

    /**
     *
     * @param data
     * @returns {*}
     */
    postCreateGoal(data) {
        return this._postFetchData('/secured/goal/create', data);
    }

    /**
     *
     * @param data
     * @returns {*}
     */
    postCreateGoalSet(data) {
        return this._postFetchData('/secured/goal/set/create', data);
    }

    /**
     *
     * @param sectionName
     * @returns {*}
     */
    postCreateSection(sectionName) {
        return this._postFetchData('/secured/section/create', {name: sectionName, description: ''});
    }

    /**
     *
     * @param cache
     * @returns {*}
     */
    getLastGoalSet(cache = true) {
        if (!cache) {
            this._clearFromCache('goal_set_last');
        }

        return this._getFetchData('/secured/goal/set/last', 'goal_set_last');
    }

    /**
     *
     * @param goalId
     * @param data
     * @returns {*}
     */
    putUpdateGoal(goalId, data) {
        return this._postFetchData('/secured/goal/' + goalId + '/update', data, 'PUT');
    }

    /**
     *
     * @param goalId
     * @returns {*}
     */
    postDisableGoal(goalId) {
        return this._postFetchData('/secured/goal/' + goalId + '/disable', false);
    }

    /**
     *
     * @param goalId
     * @param sectionName
     * @returns {*}
     */
    postMoveGoalToSection(goalId, sectionName) {
        return this._postFetchData('/secured/goal/' + goalId + '/move-to-section', {section_name: sectionName});
    }

    /**
     *
     * @returns {*}
     */
    getGoalList(cache = true) {
        if (!cache) {
            this._clearFromCache('goal_list');
        }

        return this._getFetchData('/secured/goal/list', 'goal_list');
    }

    /**
     *
     * @returns {*}
     */
    getGoalPlannerList(cache = true) {
        if (!cache) {
            this._clearFromCache('goal_planner_list');
        }

        return this._getFetchData('/secured/goal/planner/list', 'goal_planner_list');
    }

    /**
     *
     * @returns {*}
     */
    getGoalPlannerSections(cache = true) {
        if (!cache) {
            this._clearFromCache('goal_planner_sections');
        }

        return this._getFetchData('/secured/section/list', 'goal_planner_sections');
    }

    /**
     * SETTINGS
     */
    postUpdateSettings(settings) {
        return this._postFetchData('/secured/settings/update', settings);
    }

    /**
     *
     * @returns {*}
     */
    getPlannerStatistics(cache = true) {
        if (!cache) {
            this._clearFromCache('planner_statistics');
        }

        return this._getFetchData('/secured/goal/statistics', 'planner_statistics');
    }
}

export default new DataService();