


import { FETCH_FETCH_PAYMENTLINK_FAILURE, FETCH_FETCH_PAYMENTLINK_REQUEST, FETCH_FETCH_PAYMENTLINK_SUCCESS } from '../actions/PaymentLinkAction';

interface PaymentSecurityState {
    loading: boolean;
    paymentcontent: any;
    error: string | null;
    
}

const initialState: PaymentSecurityState = {
    loading: false,
    paymentcontent: null,
    error: null,
};

export const  paymentlinkReducer = (state = initialState, action: any): PaymentSecurityState => {
    switch (action.type) {
        case FETCH_FETCH_PAYMENTLINK_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_FETCH_PAYMENTLINK_SUCCESS:
            return { ...state, loading: false, paymentcontent: action.payload  };
        case FETCH_FETCH_PAYMENTLINK_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
