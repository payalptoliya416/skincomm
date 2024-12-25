

export const FETCH_BALANCE_REQUEST = 'FETCH_BALANCE_REQUEST';
export const FETCH_BALANCE_SUCCESS = 'FETCH_BALANCE_SUCCESS';
export const FETCH_BALANCE_FAILURE = 'FETCH_BALANCE_FAILURE';

export const fetchBalanceRequest = () => ({
    type: FETCH_BALANCE_REQUEST,
});

export const fetchBalanceSuccess = (balanceData: any) => ({
    type: FETCH_BALANCE_SUCCESS,
    payload: balanceData,
});

export const fetchBalanceFailure = (error: string) => ({
    type: FETCH_BALANCE_FAILURE,
    payload: error,
});
