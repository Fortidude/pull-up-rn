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
        const DEFAULT_SERVER_ERROR_MESSAGE = "SERVER_ERROR";
        if (response && typeof response.code !== 'undefined' && response.code !== 200) {
            if (response.message) {
                throw new Error(response.message.replace('.', '_'));
            }

            switch (response.code) {
                case 500:
                    throw new Error(DEFAULT_SERVER_ERROR_MESSAGE);
                case 404:
                    throw new Error("NOT_FOUND");
                case 401:
                    throw new Error("UNAUTHORIZED");
                case 400:
                    throw new Error("BAD_REQUEST");
                default:
                    throw new Error(DEFAULT_SERVER_ERROR_MESSAGE);
            }
        }

        if (response) {
            return response;
        }

        throw new Error(DEFAULT_SERVER_ERROR_MESSAGE);
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
                    throw new Error("TOKEN_NOT_FOUND");
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