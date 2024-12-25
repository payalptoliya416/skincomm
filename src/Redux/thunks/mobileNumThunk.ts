

import { Dispatch } from 'redux';
import { AxiosMobileNum } from '../../Utilities/axios';
import { fetchNumberFailure, fetchNumberRequest, fetchNumberSuccess } from '../actions/MobileNum';

export const fetchNumber = (mobileDetail: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchNumberRequest());
        try {
            const response = await AxiosMobileNum.post('', mobileDetail);
            dispatch(fetchNumberSuccess(response.data));
            return {data: response.data }; 
        } catch (error: any) {
            dispatch(fetchNumberFailure(error.message || 'Failed to fetch mobile number data'));
            return { success: false, error: error.message };
        }
    };
};
