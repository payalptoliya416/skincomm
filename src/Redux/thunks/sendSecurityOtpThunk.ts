

import { Dispatch } from 'redux';
import { AxioSendSecurityOtp } from '../../Utilities/axios';
import { fetchSendSecurityfailure, fetchSendSecurityRequest, fetchSendSecuritySuccess } from '../actions/sendSecurityOtpAction';

export const fetchSecurityOtp = (email : any) => {
    
    return async (dispatch: Dispatch) => {
        dispatch(fetchSendSecurityRequest());
        try {
            const response = await AxioSendSecurityOtp.post('',email);
            dispatch(fetchSendSecuritySuccess(response.data));
            return {data: response.data };
        } catch (error: any) {
            dispatch(fetchSendSecurityfailure(error.message || 'Failed to fetch security Otp'));
            return {error}
        }
    };
};




