

import { Dispatch } from 'redux';
import { AxioSecurityOtp } from '../../Utilities/axios';
import { fetchSecurityOtpfailure, fetchSecurityOtpRequest, fetchSecurityOtptSuccess } from '../actions/securityOtpAction';

export const fetchSecurityOtpGET = (data : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchSecurityOtpRequest());
        try {
            const response = await AxioSecurityOtp.post('',data);
            dispatch(fetchSecurityOtptSuccess(response.data));
            return {data: response.data };
        } catch (error: any) {
            dispatch(fetchSecurityOtpfailure(error.message || 'Failed to fetch security Otp'));
            return {error}
        }
    };
};




