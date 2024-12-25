

import { Dispatch } from 'redux';
import { AxioInvoiceList } from '../../Utilities/axios';
import { fetchInvoiceListFailure, fetchInvoiceListRequest, fetchInvoiceListSuccess } from '../actions/InvoiceListAction';

export const fetchInvoiceList = (initialReport : any) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchInvoiceListRequest());
        try {
            const response = await AxioInvoiceList.post('',initialReport);
            dispatch(fetchInvoiceListSuccess(response.data.data));
            return response.data.data;
        } catch (error: any) {
            dispatch(fetchInvoiceListFailure(error.message || 'Failed to fetch invoicelist'));
        }
    };
};
