

import { Dispatch } from 'redux';
import { AxiosAddBank } from '../../Utilities/axios';
import { fetchAddBankFailure, fetchAddBankRequest, fetchAddBankSuccess } from '../actions/AddBankAction';

export const fetchBankData = (formData : any) => {
    
    return async (dispatch: Dispatch) => {
        dispatch(fetchAddBankRequest());
        try {
            const response = await AxiosAddBank.post('',formData);
            
            dispatch(fetchAddBankSuccess(response));
        } catch (error: any) {
            dispatch(fetchAddBankFailure(error.message || 'Failed to fetch bank data'));
        }
    };
};
