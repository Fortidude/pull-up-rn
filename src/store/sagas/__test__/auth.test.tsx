import { put, call, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { AuthActions } from '../../actions/auth';
//import { login as loginApi } from '../api/login';
import { loginWithToken } from '../auth';

describe('authorization saga', () => {

    it('should login with token', () => {
        const action = AuthActions.loginWithToken('test_token');
        const generator = cloneableGenerator(loginWithToken)(action);

        generator.next();
        expect(generator.next().value).toEqual(put(AuthActions.checkIfLogged()));
    })
});
