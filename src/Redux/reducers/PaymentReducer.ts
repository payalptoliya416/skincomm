import { FETCH_PAYMENT_BY_FAILURE, FETCH_PAYMENT_BY_REQUEST, FETCH_PAYMENT_BY_SUCCESS } from '../actions/PaymentByAction';

interface PaymentByState {
    loading: boolean;
    paymentData: any;
    error: string | null;
}

const initialState: PaymentByState = {
    loading: false,
    paymentData: null,
    error: null,
};

export const paymentByReducer = (state = initialState, action: any): PaymentByState => {
    switch (action.type) {
        case FETCH_PAYMENT_BY_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_PAYMENT_BY_SUCCESS:
            return { ...state, loading: false, paymentData: action.payload  };
        case FETCH_PAYMENT_BY_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
