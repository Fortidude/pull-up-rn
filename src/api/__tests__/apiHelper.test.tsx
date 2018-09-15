import ApiHelper from '../apiHelper';
import { AsyncStorage } from 'react-native';

describe('test Api helpers -> guid', () => {
    let UUIDregex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    it('should return valid UUID string', () => {
        for (let index = 0; index <= 9; index++) {
            const UUIDstring = ApiHelper.guid();
            expect(UUIDregex.test(UUIDstring)).toBeTruthy();
        }
    })
})

describe('test Api helpers -> getHeaders', () => {
    afterEach(() => {
        AsyncStorage.clear();
    })

    it('should return header', async () => {
        let expectedHeaders = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };

        const headers = await ApiHelper.getHeaders(false, true);
        expect(headers).toEqual(expectedHeaders);
    })

    it('should throw token not found', async () => {
        expect(ApiHelper.getHeaders(true, true)).rejects.toEqual(new Error('TOKEN_NOT_FOUND'));
    })

    it('should return header with token', async () => {
        AsyncStorage.setItem('token', 'some_test_token');
        let expectedHeaders = {
            "Authorization": "Bearer some_test_token",
            "Accept": "application/json",
            "Content-Type": "application/json"
        };

        const headers = await ApiHelper.getHeaders(true, true);
        expect(headers).toEqual(expectedHeaders);
    })
})

describe('test Api helpers -> checkForResponseErrors', () => {
    it('should throw not found 404 error', () => {
        let mock404error = {
            code: 404,
            message: 'not found'
        };

        expect(() => ApiHelper.checkForResponseErrors(mock404error)).toThrowError('not found');
    })

    it('should throw SERVER ERROR', () => {
        let mock500error = {
            code: 500,
            message: "server error"
        };

        expect(() => ApiHelper.checkForResponseErrors(mock500error)).toThrowError('server error');
    })

    it('should throw SERVER_ERROR', () => {
        let mock500error = {
            code: 500,
        };

        expect(() => ApiHelper.checkForResponseErrors(mock500error)).toThrowError('SERVER_ERROR');
    })

    it('should throw bad request', () => {
        let mock400error = {
            code: 400,
        };

        expect(() => ApiHelper.checkForResponseErrors(mock400error)).toThrowError('BAD_REQUEST');
    })

    it('should throw Unauthorized', () => {
        let mock401error = {
            code: 401,
        };

        expect(() => ApiHelper.checkForResponseErrors(mock401error)).toThrowError('UNAUTHORIZED');
    })

    it('should return response without code', () => {
        let mockSuccessResponseData = {
            data: {
                some: 'parameter'
            }
        };

        expect(ApiHelper.checkForResponseErrors(mockSuccessResponseData)).toEqual(mockSuccessResponseData);
    })

    it('should return response with 200 code', () => {
        let mockSuccessResponseData = {
            code: 200,
            data: {
                some: 'parameter'
            }
        };

        expect(ApiHelper.checkForResponseErrors(mockSuccessResponseData)).toEqual(mockSuccessResponseData);
    })
})