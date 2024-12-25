

import { Dispatch } from 'redux';
import { AxiosUserDetail } from '../../Utilities/axios';
import { fetchUserDetailFailure, fetchUserDetailRequest, fetchUserDetailSuccess } from '../actions/userDetailAction';

export const fetchUserDetailData = (userdatad : any) => {
    
    return async (dispatch: Dispatch) => {
        dispatch(fetchUserDetailRequest());
        try {
            const response = await AxiosUserDetail.post('', userdatad);     
            dispatch(fetchUserDetailSuccess(response.data));
        } catch (error: any) {
            dispatch(fetchUserDetailFailure(error.message || 'Failed to fetch UserDetail data'));
        }
    };
};
