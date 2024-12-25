

export const FETCH_INVOICE_LIST_REQUEST = 'FETCH_INVOICE_LIST_REQUEST';
export const FETCH_INVOICE_LIST_SUCCESS = 'FETCH_INVOICE_LIST_SUCCESS';
export const FETCH_INVOICE_LIST_FAILURE = 'FETCH_INVOICE_LIST_FAILURE';

export const fetchInvoiceListRequest = () => ({
    type: FETCH_INVOICE_LIST_REQUEST,
});

export const fetchInvoiceListSuccess = (invoiceData: any) => ({
    type: FETCH_INVOICE_LIST_SUCCESS,
    payload: invoiceData,
});

export const fetchInvoiceListFailure = (error: string) => ({
    type: FETCH_INVOICE_LIST_FAILURE,
    payload: error,
});
