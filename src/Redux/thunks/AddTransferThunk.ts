

import { Dispatch } from 'redux';
import { AxioInTransfer } from '../../Utilities/axios';
import { fetchAddTransferFailure, fetchAddTransferRequest, fetchAddTransferSuccess } from '../actions/AddTransferAction';

export const fetchAddTransfer = (formData : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchAddTransferRequest());
        try {
            const response = await AxioInTransfer.post('',formData);  
            dispatch(fetchAddTransferSuccess(response.data));
             return {data: response.data };
        } catch (error: any) {
            dispatch(fetchAddTransferFailure(error.message || 'Failed to fetch transfer data'));
        }
    };
};
