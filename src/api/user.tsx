import ApiHelper from "./apiHelper";

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
}

export default User.getInstance();
