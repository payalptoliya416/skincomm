

import { Dispatch } from 'redux';
import {  AxiosWithdrawal } from '../../Utilities/axios';
import { fetchUserWhithdrawalFailure, fetchUserWhithdrawalRequest, fetchUserWhithdrawalSuccess } from '../actions/withDrawalAction';

export const fetchWithDrawallData = (formData : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchUserWhithdrawalRequest());
        try {
            const response = await AxiosWithdrawal.post('', formData);
            dispatch(fetchUserWhithdrawalSuccess(response.data));
        } catch (error: any) {
            dispatch(fetchUserWhithdrawalFailure(error.message || 'Failed to fetch withdrawal data'));
        }
    };
};
