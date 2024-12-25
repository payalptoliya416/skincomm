

import { FETCH_INVOICE_PDF_FAILURE, FETCH_INVOICE_PDF_REQUEST, FETCH_INVOICE_PDF_SUCCESS } from "../actions/InvoicePdf";

interface InvoicePDFstState {
    loading: boolean;
    invoicePdfData: any;
    error: string | null;
}

const initialState: InvoicePDFstState = {
    loading: false,
    invoicePdfData: [],
    error: null,
};

export const invoicePdfReducer = (state = initialState, action: any): InvoicePDFstState => {
    switch (action.type) {
        case FETCH_INVOICE_PDF_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_INVOICE_PDF_SUCCESS:
            return { ...state, loading: false, invoicePdfData: action.payload };
        case FETCH_INVOICE_PDF_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
