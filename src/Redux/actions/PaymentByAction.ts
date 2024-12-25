

export const FETCH_PAYMENT_BY_REQUEST = 'FETCH_PAYMENT_BY_REQUEST';
export const FETCH_PAYMENT_BY_SUCCESS = 'FETCH_PAYMENT_BY_SUCCESS';
export const FETCH_PAYMENT_BY_FAILURE = 'FETCH_PAYMENT_BY_FAILURE';

export const fetchPaymentByRequest = () => ({
    type: FETCH_PAYMENT_BY_REQUEST,
});

export const fetchPaymentBySuccess = (paymentData: any) => ({
    type: FETCH_PAYMENT_BY_SUCCESS,
    payload: paymentData,
});

export const fetchPaymentByFailure = (error: string) => ({
    type: FETCH_PAYMENT_BY_FAILURE,
    payload: error,
});
