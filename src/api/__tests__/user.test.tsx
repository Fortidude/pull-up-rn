import User from '../user';
import { AsyncStorage } from 'react-native';
import jwtDecode from "jwt-decode";


describe('ther User -> isUserLoggedAndTokenValid', () => {
    afterEach(() => {
        AsyncStorage.clear();
    })

    it('token is invalid', async () => {
        // @ts-ignore
        fetch.mockResponse(JSON.stringify({ "status": 401 }))

        const tokenInvalid = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJ0ZXN0X3VzZXIiLCJpYXQiOjE1MzY1MTc0MzUsImV4cCI6MTMzOTA0NTc2MiwianRpIjoiNjUzYTIyMGQtNGQ2MC00YzlhLThiM2MtZWM1NWYxNDdhM2Y4In0.kvyKJ5-XxOAEkoxKZEvgRXoJ4SKSNNPHs6PKWGnugxY";
        await AsyncStorage.setItem('token', tokenInvalid);

        const result = await User.isUserLoggedAndTokenValid();
        expect(result).toBeFalsy();
    })

    it('token is valid', async () => {
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJ0ZXN0X3VzZXIiLCJpYXQiOjE1MzY1MTc0MzUsImV4cCI6MjYzOTA0NTc2MiwianRpIjoiNjUzYTIyMGQtNGQ2MC00YzlhLThiM2MtZWM1NWYxNDdhM2Y4In0.fXOunNXkQQJRwj0zLgFDQQYGDyWE560o4W8kFCytkcU";
        await AsyncStorage.setItem('token', token);

        let result = await User.isUserLoggedAndTokenValid();
        expect(result).toBeTruthy();
    })

    // it('token is invalid and request 500', async () => {
    //     fetch.mockRejectOnce("SOME_ERROR");

    //     const tokenInvalid = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJ0ZXN0X3VzZXIiLCJpYXQiOjE1MzY1MTc0MzUsImV4cCI6MTMzOTA0NTc2MiwianRpIjoiNjUzYTIyMGQtNGQ2MC00YzlhLThiM2MtZWM1NWYxNDdhM2Y4In0.kvyKJ5-XxOAEkoxKZEvgRXoJ4SKSNNPHs6PKWGnugxY";
    //     await AsyncStorage.setItem('token', tokenInvalid);

    //     expect(async() => await User.isUserLoggedAndTokenValid()).toThrowError("SOME_ERROR");
    // })

    // it('token is valid and online', async () => {
    //     await AsyncStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
    //     const result = await User.isUserLoggedAndTokenValid(true);
    //     expect(result).toBeTruthy();
    // })

    // it('token is invalid and offline', async () => {
    //     const result = await User.isUserLoggedAndTokenValid(false);
    //     expect(result).toBeFalsy();
    // })

    // it('token is invalid and online', async() => {
    //     fetch.mockResponseOnce(JSON.stringify({ "status": 200 }))

    //     const result = await User.isUserLoggedAndTokenValid(false);
    //     expect(result).toBe();
    // })
});
