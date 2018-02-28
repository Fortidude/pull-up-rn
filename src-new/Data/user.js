import { AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode';
import DataService, { host } from './../Data/data';
import { User as UserModel } from './../Models/User';

let UserInstance = null;

let checkForErrors = (response) => {
    if (response && typeof response.code !== 'undefined' && response.code !== 200) {
        throw response.message ? response.message.replace('.', '_') : 'SERVER_ERROR';
    }

    if (response) {
        return response;
    }

    throw "SERVER_ERROR";
};

class User {
    constructor() {
        if (!UserInstance) {
            UserInstance = this;
        }

        return UserInstance;
    }

    login(login, password) {
        return new Promise((resolve, reject) => {
            let object = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _username: login,
                    _password: password
                })
            };

            console.log('FETCH /login_check', host);
            fetch(host + '/login_check', object)
                .then(response => response.json())
                .then(checkForErrors)
                .then((response) => {
                    if (!response.token) {
                        reject("Token not received");
                        return;
                    }

                    /**
                     * @TODO https://github.com/facebook/react-native/issues/14101#issuecomment-345563563
                     */
                    AsyncStorage.setItem('token', response.token)
                        .then(() => resolve(true));
                })
                .catch((error) => {
                    if (error.toString() === 'TypeError: Network request failed') {
                        reject('Network error');
                    }

                    reject(error);
                });
        });
    }

    register(email, username, password) {
        return new Promise((resolve, reject) => {
            let object = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password
                })
            };

            fetch(host + '/register', object)
                .then(response => response.json())
                .then(checkForErrors)
                .then(response => {
                    if (!response.status) {
                        reject('SERVER_ERROR');
                        return;
                    }

                    resolve(true);
                })
                .catch((error) => {
                    if (error.toString() === 'TypeError: Network request failed') {
                        reject('Network error');
                    }

                    reject(error);
                });
        })
    }

    async isLogged() {
        let user = await AsyncStorage.getItem('user');
        let tokenIsValid = await this.isTokenValid();
        if (user && tokenIsValid) {
            return new UserModel(JSON.parse(user));
        }

        return false;
    }

    reloadCurrentUser() {
        return new Promise((resolve, reject) => {
            DataService.getUserData()
                .then((user) => {
                    if (!user) {
                        reject("USER_NOT_FOUND");
                    }

                    if (user.code && user.message) {
                        reject(user.message);
                    }

                    AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
                        resolve(user);
                    })
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    getCurrentUser() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('user', (error, user) => {
                if (!error && user && typeof user !== 'undefined') {
                    try {
                        let userModel = new UserModel(JSON.parse(user));
                        resolve(userModel);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    this.reloadCurrentUser()
                        .then((user) => resolve(user))
                        .catch((error) => reject(error));
                }
            });
        })
    }

    isTokenValid(forceRequest = false) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('token', (error, token) => {
                if (!token) {
                    resolve(false);
                    return;
                }

                let tokenDecoded = jwtDecode(token);
                if (!forceRequest && tokenDecoded['exp']) {
                    let expirationAt = new Date(parseInt(tokenDecoded['exp'])*1000);
                    if (expirationAt > new Date(parseInt(Date.now()) + 86400)) {
                        resolve(true);
                        return;
                    } else if (!DataService.isOnline) {
                        resolve(false);
                        return;
                    }
                }

                let object = {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                };
                fetch(host + '/secured/check_token', object)
                    .then((response) => {

                        if (response && response.status && response.status === 200) {
                            resolve(true);
                            return;
                        }

                        resolve(false);
                    })
                    .catch((error) => {
                        let msg = JSON.stringify(error);
                        reject(msg);
                    });
            });

        });
    }

    async logout() {
        await Promise.all([
            AsyncStorage.removeItem('user'),
            AsyncStorage.removeItem('token')
        ]);

        return true;
    }
}

export default new User();