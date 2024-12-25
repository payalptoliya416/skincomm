

import { Dispatch } from 'redux';
import {  AxiosVerifyLogin } from '../../Utilities/axios';
import { fetchVerifyLoginFailure, fetchVerifyLoginRequest, fetchVerifyLoginSuccess } from '../actions/VerifyLoginAction';

export const fetchVerifyLogin = (data : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchVerifyLoginRequest());
        try {
            const response = await AxiosVerifyLogin.post('', data);
            dispatch(fetchVerifyLoginSuccess(response.data.data));
            return {res : response.data.data}
        } catch (error: any) {
            dispatch(fetchVerifyLoginFailure(error.message || 'Failed to fetch verify login'));
        }
    };
};
