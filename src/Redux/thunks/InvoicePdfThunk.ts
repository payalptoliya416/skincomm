

import { Dispatch } from 'redux';
import {  AxioInvoiceListPDF } from '../../Utilities/axios';
import { fetchInvoicePdfFailure, fetchInvoicePdfSuccess, fetchInvoicePdftRequest } from '../actions/InvoicePdf';

export const fetchInvoicePdf = (id : number) => {
    
    return async (dispatch: Dispatch) => {
        dispatch(fetchInvoicePdftRequest());
        try {
            const response = await AxioInvoiceListPDF.post('',{
                "id" : id
            });
            dispatch(fetchInvoicePdfSuccess(response.data.data));
            const pdfresponse = response.data.data
            return pdfresponse;
        } catch (error: any) {
            dispatch(fetchInvoicePdfFailure(error.message || 'Failed to fetch invoicelist'));
            return error
        }
    };
};
