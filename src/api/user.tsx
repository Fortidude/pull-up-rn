import ApiHelper from "./apiHelper";
import { AsyncStorage } from "react-native";
import jwtDecode from "jwt-decode";

import UserModel from '../models/User';
import moment from 'moment';

interface UserInterface {
    login: (username: string, password: string) => Promise<string>;
    register: (email: string, username: string, password: string) => Promise<boolean|string>;
}

class User implements UserInterface {
    private static instance: User;
    private constructor() { }
    static getInstance() {
        if (!User.instance) {
            User.instance = new User();
        }
        return User.instance;
    }

    /**
     * @TODO https://github.com/facebook/react-native/issues/14101#issuecomment-345563563
     * AsyncStorage
     */
    login = async (username: string, password: string): Promise<string> => {
        let object = {
            method: "POST",
            headers: await ApiHelper.getHeaders(false, true),
            body: JSON.stringify({
                _username: username,
                _password: password
            })
        };

        if (__DEV__) {
            console.log('POST login (User)', object);
        }

        const result = await fetch(ApiHelper.getHost() + '/login_check', object)
            .then(ApiHelper.checkForResponseErrors)
            .then(response => response.json())
            .then((response) => {
                if (!response.token) {
                    throw "Token not received"
                }

                return response.token
            })
            .catch((error) => {
                /**
                 * @TODO implement offline checker
                 */
                if (error.toString() === 'TypeError: Network request failed') {
                    throw "Network error";
                }

                throw error;
            });

        return result;
    }

    register = async (email: string, username: string, password: string): Promise<boolean|string> => {
        let object = {
            method: "POST",
            headers: await ApiHelper.getHeaders(false, true),
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
        };

        const result = await fetch(ApiHelper.getHost() + '/register', object)
            .then(ApiHelper.checkForResponseErrors)
            .then(response => response.json())
            .then((response) => {
                return true;
            }).catch(err => {
                return err.message;
            }) 

        return result;
    }

    isUserLoggedAndTokenValid = async (forceRequest: boolean = false): Promise<boolean> => {
        let isTokenValid = false;
        await AsyncStorage.getItem('token', async (error, token) => {
            if (!token) {
                isTokenValid = false;
                return;
            }
            if (!forceRequest && ApiHelper.validateJwt(token)) {
                isTokenValid = true;
                return;
            }

            let object = { method: 'GET', headers: { 'Authorization': 'Bearer ' + token } };
            await fetch(ApiHelper.getHost() + '/secured/check_token', object)
                .then(ApiHelper.checkForResponseErrors)
                .then(response => response.json())
                .then((response) => {
                    if (response && response.status && response.status === 200) {
                        isTokenValid = true;
                        return;
                    }

                    isTokenValid = false;
                })
                .catch((error) => {
                    let msg = JSON.stringify(error);
                    throw new Error(msg);
                });

        });

        return isTokenValid;
    }

    getUserData = async (forceReload = false): Promise<undefined | UserModel> => {
        let object = {
            method: 'GET',
            headers: await ApiHelper.getHeaders(true, true)
        };

        const user = await AsyncStorage.getItem('user');
        if (user) {
            const parsedUser: UserModel = JSON.parse(user);
            if (!moment().isAfter(moment(parsedUser.current_circuit_expired_date))) {
                return new UserModel(JSON.parse(user));
            }
        }

        return await fetch(ApiHelper.getHost() + '/secured/profile/current', object)
            .then(ApiHelper.checkForResponseErrors)
            .then(response => response.json())
            .then((response) => {
                if (response && response.code && response.code !== 200) {
                    return;
                }

                AsyncStorage.setItem('user', JSON.stringify(response));
                return new UserModel(response);
            })
            .catch((error) => {
                let msg = JSON.stringify(error);
                throw msg;
            });
    }

    passwordResetRequest = async (email: string): Promise<boolean|string> => {
        let object = {
            method: "POST",
            headers: await ApiHelper.getHeaders(false, true),
            body: JSON.stringify({
                email: email,
            })
        };

        const result = await fetch(ApiHelper.getHost() + '/password-remind', object)
            .then(ApiHelper.checkForResponseErrors)
            .then(response => response.json())
            .then((response) => {
                return true;
            }).catch(err => {
                return err.message;
            }) 

        return result;
    }

    passwordChange = async (email: string, token: string, password: string): Promise<boolean|string> => {
        let object = {
            method: "POST",
            headers: await ApiHelper.getHeaders(false, true),
            body: JSON.stringify({
                email: email,
                key: token,
                password: password
            })
        };

        const result = await fetch(ApiHelper.getHost() + '/password-change', object)
            .then(ApiHelper.checkForResponseErrors)
            .then(response => response.json())
            .then((response) => {
                return true;
            }).catch(err => {
                return err.message;
            }) 

        return result;
    }
}

export default User.getInstance();
