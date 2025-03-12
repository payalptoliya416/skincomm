

export const FETCH_FETCH_PAYMENTLINK_REQUEST = 'FETCH_FETCH_PAYMENTLINK_REQUEST';
export const FETCH_FETCH_PAYMENTLINK_SUCCESS = 'FETCH_FETCH_PAYMENTLINK_SUCCESS';
export const FETCH_FETCH_PAYMENTLINK_FAILURE = 'FETCH_FETCH_PAYMENTLINK_FAILURE';

export const fetchPaymentLinkRequest = () => ({
    type: FETCH_FETCH_PAYMENTLINK_REQUEST,
});

export const fetchPaymentLinkSuccess = (paymentcontent: any) => ({
    type: FETCH_FETCH_PAYMENTLINK_SUCCESS,
    payload: paymentcontent,
});

export const fetchPaymentLinkFailure = (error: string) => ({
    type: FETCH_FETCH_PAYMENTLINK_FAILURE,
    payload: error,
});
