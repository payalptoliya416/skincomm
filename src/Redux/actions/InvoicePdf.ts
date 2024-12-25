

export const FETCH_INVOICE_PDF_REQUEST = 'FETCH_INVOICE_PDF_REQUEST';
export const FETCH_INVOICE_PDF_SUCCESS = 'FETCH_INVOICE_PDF_SUCCESS';
export const FETCH_INVOICE_PDF_FAILURE = 'FETCH_INVOICE_PDF_FAILURE';

export const fetchInvoicePdftRequest = () => ({
    type: FETCH_INVOICE_PDF_REQUEST,
});

export const fetchInvoicePdfSuccess = (invoicePdfData: any) => ({
    type: FETCH_INVOICE_PDF_SUCCESS,
    payload: invoicePdfData,
});

export const fetchInvoicePdfFailure = (error: string) => ({
    type: FETCH_INVOICE_PDF_FAILURE,
    payload: error,
});
