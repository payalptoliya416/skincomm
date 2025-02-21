

import { Dispatch } from 'redux';
import { AxiosWithdrwalRequest } from '../../Utilities/axios';
import { fetchUserWhithdrawalPageFailure, fetchUserWhithdrawalPageRequest, fetchUserWhithdrawalPageSuccess } from '../actions/WithDAction';

export const fetchWithDrawalPageData = () => {
    const ID =  sessionStorage.getItem('UserID')
    return async (dispatch: Dispatch) => {
        dispatch(fetchUserWhithdrawalPageRequest());
        try {
            const response = await AxiosWithdrwalRequest.get(`/${ID}`,);
            dispatch(fetchUserWhithdrawalPageSuccess(response.data));
        } catch (error: any) {
            dispatch(fetchUserWhithdrawalPageFailure(error.message || 'Failed to fetch withdrawal request data'));
        }
    };
};
