

export const FETCH_EDIT_BANK_REQUEST = 'FETCH_EDIT_BANK_REQUEST';
export const FETCH_EDIT_BANK_SUCCESS = 'FETCH_EDIT_BANK_SUCCESS';
export const FETCH_EDIT_BANK_FAILURE = 'FETCH_EDIT_BANK_FAILURE';

export const fetchEditBankRequest = () => ({
    type: FETCH_EDIT_BANK_REQUEST,
});

export const fetchEditBankSuccess = (editbankData: any) => ({
    type: FETCH_EDIT_BANK_SUCCESS,
    payload: editbankData,
});

export const fetchEditBankFailure = (error: string) => ({
    type: FETCH_EDIT_BANK_FAILURE,
    payload: error,
});
