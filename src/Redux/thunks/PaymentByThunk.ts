

import { Dispatch } from 'redux';
import {  AxiosPaymentBy } from '../../Utilities/axios';
import { fetchPaymentByFailure, fetchPaymentByRequest, fetchPaymentBySuccess } from '../actions/PaymentByAction';

export const fetchPaymentBy = (currency: any) => {
    console.log("currency",currency);
    return async (dispatch: Dispatch) => {
        dispatch(fetchPaymentByRequest());
        try {
            const response = await AxiosPaymentBy.post('', {
                "action" : "getBalance",
                "currency" : currency
            });
            console.log("response",response)
            dispatch(fetchPaymentBySuccess(response.data.data));
            return {data: response.data.data }; 
        } catch (error: any) {
            dispatch(fetchPaymentByFailure(error.message || 'Failed to fetch new payment by data'));
            return { success: false, error: error.message };
        }
    };
};

