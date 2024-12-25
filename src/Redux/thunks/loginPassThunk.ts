

import { Dispatch } from 'redux';
import { AxiosLoginPassword } from '../../Utilities/axios';
import { fetchLoginPassfailure, fetchLoginPassRequest, fetchLoginPasstSuccess } from '../actions/loginPasswordAction';

export const fetchLoginPassword = (formData : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchLoginPassRequest());
        try {
            const response = await AxiosLoginPassword.post('' , formData);
            dispatch(fetchLoginPasstSuccess(response.data));
            return {data: response.data };
        } catch (error: any) {
            dispatch(fetchLoginPassfailure(error.message || 'Failed to fetch login password'));
            return {error}
        }
    };
};
