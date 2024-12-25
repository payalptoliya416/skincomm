

export const FETCH_BANKLIST_REQUEST = 'FETCH_BANKLIST_REQUEST';
export const FETCH_BANKLIST_SUCCESS = 'FETCH_BANKLIST_SUCCESS';
export const FETCH_BANKLIST_FAILURE = 'FETCH_BANKLIST_FAILURE';

export const fetchBankListRequest = () => ({
    type: FETCH_BANKLIST_REQUEST,
});

export const fetchBankListSuccess = (bankList: any) => ({
    type: FETCH_BANKLIST_SUCCESS,
    payload: bankList,
});

export const fetchBankListFailure = (error: string) => ({
    type: FETCH_BANKLIST_FAILURE,
    payload: error,
});
