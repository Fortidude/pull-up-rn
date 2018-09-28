import ApiHelper from "./apiHelper";
import { AsyncStorage } from "react-native";
import jwtDecode from "jwt-decode";

import UserModel from '../models/User';

interface UserInterface {
    login: (username: string, password: string) => Promise<string>;
    register: (email: string, username: string, password: string) => Promise<boolean>;
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

        const result = fetch(ApiHelper.getHost() + '/login_check', object)
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

    register = async (email: string, username: string, password: string): Promise<boolean> => {
        return false;
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

        let user = await AsyncStorage.getItem('user');
        if (user) {
            return new UserModel(JSON.parse(user));
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
}

export default User.getInstance();
