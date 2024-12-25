

export const FETCH_SUBACCOUNT_REQUEST = 'FETCH_SUBACCOUNT_REQUEST';
export const FETCH_SUBACCOUNT_SUCCESS = 'FETCH_SUBACCOUNT_SUCCESS';
export const FETCH_SUBACCOUNT_FAILURE = 'FETCH_SUBACCOUNT_FAILURE';

export const fetchSubAccountRequest = () => ({
    type: FETCH_SUBACCOUNT_REQUEST,
});

export const fetchSubAccountSuccess = (SubAccountData: any) => ({
    type: FETCH_SUBACCOUNT_SUCCESS,
    payload: SubAccountData,
});

export const fetchSubAccountFailure = (error: string) => ({
    type: FETCH_SUBACCOUNT_FAILURE,
    payload: error,
});
