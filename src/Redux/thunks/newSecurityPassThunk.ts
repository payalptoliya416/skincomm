

import { Dispatch } from 'redux';
import { AxioSecurityNewPassword } from '../../Utilities/axios';
import { fetchNewSecurityPassFailure, fetchNewSecurityPassRequest, fetchSecurityPassSuccess } from '../actions/newSecurityPassAction';

export const fetchNewSecurityPass = (mobileDetail: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchNewSecurityPassRequest());
        try {
            const response = await AxioSecurityNewPassword.post('', mobileDetail);
            dispatch(fetchSecurityPassSuccess(response.data.data));
            return {data: response.data.data}; 
        } catch (error: any) {
            dispatch(fetchNewSecurityPassFailure(error.message || 'Failed to fetch new securrity password data'));
            return { success: false, error: error.message};
        }
    };
};
