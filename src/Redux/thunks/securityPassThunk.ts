

import { Dispatch } from 'redux';
import { AxiosSecurityPassword } from '../../Utilities/axios';
import { fetchSecurityPassfailure, fetchSecurityPassRequest, fetchSecurityPasstSuccess } from '../actions/SecurityPassword';

export const fetchSecurityPassword = (formData : any) => {
    
    return async (dispatch: Dispatch) => {
        dispatch(fetchSecurityPassRequest());
        try {
            const response = await AxiosSecurityPassword.post('',formData);
            
            dispatch(fetchSecurityPasstSuccess(response.data));
            return {data: response.data };
        } catch (error: any) {
            dispatch(fetchSecurityPassfailure(error.message || 'Failed to fetch security password'));
            return {error}
            
        }
    };
};




