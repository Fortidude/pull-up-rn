import ApiHelper from "./apiHelper";
import { AsyncStorage } from "react-native";
import jwtDecode from "jwt-decode";

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
            .then(response => response.json())
            .then(ApiHelper.checkForResponseErrors)
            .then((response) => {
                console.log(response);
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

    isUserLoggedAndTokenValid = async (forceRequest = false): Promise<boolean> => {
        let isTokenValid = false;
        await AsyncStorage.getItem('token', async (error, token) => {
            if (!token) {
                isTokenValid = false;
                return;
            }

            let tokenDecoded: { [key: string]: any } = jwtDecode(token);
            if (!forceRequest && tokenDecoded.exp) {
                let expirationAt = new Date(parseInt(tokenDecoded.exp) * 1000);

                /**
                 * @TODO isOnline ?
                 */
                const isOnline = true;
                if (expirationAt > new Date(Date.now() + 86400)) {
                    isTokenValid = true;
                    return;
                } else if (!isOnline) {
                    isTokenValid = false
                    return;
                }
            }

            let object = { method: 'GET', headers: { 'Authorization': 'Bearer ' + token } };
            await fetch(ApiHelper.getHost() + '/secured/check_token', object)
                .then(ApiHelper.checkForResponseErrors)
                .then((response) => {
                    if (response && response.status && response.status === 200) {
                        isTokenValid = true;
                        return;
                    }

                    isTokenValid = false;
                })
                .catch((error) => {
                    let msg = JSON.stringify(error);
                    throw msg;
                });

        });
        
        return isTokenValid;
    }
}

export default User.getInstance();
