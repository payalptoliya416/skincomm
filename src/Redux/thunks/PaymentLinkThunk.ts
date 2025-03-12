

import { Dispatch } from 'redux';
import {  AxiosgetPaymentLink } from '../../Utilities/axios';
import { fetchPaymentLinkFailure, fetchPaymentLinkRequest, fetchPaymentLinkSuccess } from '../actions/PaymentLinkAction';

export const fetchPaymentLink = (formData: any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchPaymentLinkRequest());
        try {
            const response = await AxiosgetPaymentLink.post('', formData);
            dispatch(fetchPaymentLinkSuccess(response.data.data));
            return response.data.data ; 
        } catch (error: any) {
            dispatch(fetchPaymentLinkFailure(error.message || 'Failed to fetch new payment Link'));
            return { success: false, error: error.message };
        }
    };
};

