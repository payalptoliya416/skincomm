

export const FETCH_GET_BANKDETAIL_REQUEST = 'FETCH_GET_BANK_REQUEST';
export const FETCH_GET_BANKDETAIL_SUCCESS = 'FETCH_GET_BANK_SUCCESS';
export const FETCH_GET_BANKDETAIL_FAILURE = 'FETCH_GET_BANK_FAILURE';

export const fetchGetBankRequest = () => ({
    type: FETCH_GET_BANKDETAIL_REQUEST,
});

export const fetchGetBankSuccess = (getBankDetail: any) => ({
    type: FETCH_GET_BANKDETAIL_SUCCESS,
    payload: getBankDetail,
});

export const fetchGetBankFailure = (error: string) => ({
    type: FETCH_GET_BANKDETAIL_FAILURE,
    payload: error,
});
