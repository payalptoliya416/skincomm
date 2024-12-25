

export const FETCH_ADD_BANK_REQUEST = 'FETCH_ADD_BANK_REQUEST';
export const FETCH_ADD_BANK_SUCCESS = 'FETCH_ADD_BANK_SUCCESS';
export const FETCH_ADD_BANK_FAILURE = 'FETCH_ADD_BANK_FAILURE';

export const fetchAddBankRequest = () => ({
    type: FETCH_ADD_BANK_REQUEST,
});

export const fetchAddBankSuccess = (addbankData: any) => ({
    type: FETCH_ADD_BANK_SUCCESS,
    payload: addbankData,
});

export const fetchAddBankFailure = (error: string) => ({
    type: FETCH_ADD_BANK_FAILURE,
    payload: error,
});
