

import { Dispatch } from 'redux';
import { AxiosSendLoginOtp } from '../../Utilities/axios';
import { fetchSendLoginfailure, fetchSendLoginRequest, fetchSendLoginSuccess } from '../actions/sendLoginOtp';

export const fetchSendLoginList = (data : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchSendLoginRequest());
        try {
            const response = await AxiosSendLoginOtp.post('',data);
            dispatch(fetchSendLoginSuccess(response.data.data));
            return {data : response.data.data}
        } catch (error: any) {
            dispatch(fetchSendLoginfailure(error.message || 'Failed to fetch reset login data'));
        }
    };
};
