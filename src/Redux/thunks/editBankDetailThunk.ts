

import { Dispatch } from 'redux';
import { AxiosAddBank } from '../../Utilities/axios';
import { fetchEditBankFailure, fetchEditBankRequest, fetchEditBankSuccess } from '../actions/editBankDetail';

export const fetchGetBankData = (formData : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchEditBankRequest());
        try {
            const response = await AxiosAddBank.post('',formData);
            dispatch(fetchEditBankSuccess(response.data));
        } catch (error: any) {
            dispatch(fetchEditBankFailure(error.message || 'Failed to fetch bank data'));
        }
    };
};
