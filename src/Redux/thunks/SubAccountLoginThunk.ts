

import { Dispatch } from 'redux';
import {  AxiosSubAccountUserLogin } from '../../Utilities/axios';
import { fetchSubAccountLoginFailure, fetchSubAccountLoginRequest, fetchSubAccountLoginSuccess } from '../actions/SubAccountLoginAction';

export const fetchSubAccounLoginData = (userid : string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchSubAccountLoginRequest());
        try {
            const response = await AxiosSubAccountUserLogin.post('', {
                "userid" : userid
            });
            dispatch(fetchSubAccountLoginSuccess(response));
        } catch (error: any) {
            dispatch(fetchSubAccountLoginFailure(error.message || 'Failed to fetch SubAccount data'));
        }
    };
};
