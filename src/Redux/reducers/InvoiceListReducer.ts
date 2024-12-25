
import { FETCH_INVOICE_LIST_FAILURE, FETCH_INVOICE_LIST_REQUEST, FETCH_INVOICE_LIST_SUCCESS } from "../actions/InvoiceListAction";

interface InvoiceListState {
    loading: boolean;
    invoiceData: any;
    error: string | null;
}

const initialState: InvoiceListState = {
    loading: false,
    invoiceData: [],
    error: null,
};

export const invoiceListReducer = (state = initialState, action: any): InvoiceListState => {
    switch (action.type) {
        case FETCH_INVOICE_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_INVOICE_LIST_SUCCESS:
            return { ...state, loading: false, invoiceData: action.payload };
        case FETCH_INVOICE_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
