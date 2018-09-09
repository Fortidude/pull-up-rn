import { AsyncStorage } from "react-native";

interface ApiInterface { };
class ApiHelper implements ApiInterface {
    private static instance: ApiHelper;

    private host = 'http://pullup.online'
    // private host = 'http://localhost'
    // private host = 'http://192.168.0.111'

    private constructor() { }
    static getInstance() {
        if (!ApiHelper.instance) {
            ApiHelper.instance = new ApiHelper();
        }
        return ApiHelper.instance;
    }

    /**
     * 
     */
    public getHost = () => {
        return this.host;
    }

    /**
     * Check for errors in response. Parse some exceptions;
     * Usage:
     * fetch()
     *      .then(checkForResponseErrors)
     *      .then(response => {})
     *      .catch(error => {});
     */
    public checkForResponseErrors = (response: { [key: string]: any }) => {
        if (response && typeof response.code !== 'undefined' && response.code !== 200) {
            throw response.message ? response.message.replace('.', '_') : 'SERVER_ERROR';
        }

        if (response) {
            return response;
        }

        throw "SERVER_ERROR";
    };

    public guid = (): string => {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    /**
     * 
     */
    public getHeaders = async (useToken: boolean, json: boolean): Promise<{}> => {
        const headers: { [key: string]: any } = {};
        if (useToken) {
            await AsyncStorage.getItem('token', (error, token) => {
                if (!token) {
                    throw "Token not found";
                }

                headers['Authorization'] = `Bearer ${token}`;
            });
        }

        if (json) {
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';
        }

        return headers;
    }
}

export default ApiHelper.getInstance();