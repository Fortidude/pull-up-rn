import Data from './../data'
import { AsyncStorage } from 'react-native';

describe('testing api', () => {
    beforeEach(() => {
        fetch.resetMocks();
    })

    afterEach(() => {
        AsyncStorage.clear();
    })

    it('call for goals grouped by trainings', async () => {
        fetch.mockResponseOnce(JSON.stringify({ "test name": [] }))

        AsyncStorage.setItem('token', "some_test_token");
        const expectedResponse = {
            "trainings": [{
                "goals": [],
                "key": "test name",
                "name": "test name"
            }]
        };

        //assert on the response
        const response = await Data.getPlannerByTrainings();
        expect(response).toEqual(expectedResponse);

        expect(fetch.mock.calls.length).toEqual(1)
        expect(fetch.mock.calls[0][0]).toContain('/secured/section/list')
    })
})
