

export const FETCH_GET_LPBALANCE_REQUEST = 'FETCH_GET_LPBALANCE_REQUEST';
export const FETCH_GET_LPBALANCE_SUCCESS = 'FETCH_GET_LPBALANCE_SUCCESS';
export const FETCH_GET_LPBALANCE_FAILURE = 'FETCH_GET_LPBALANCE_FAILURE';

export const fetchGetLPBalanceRequest = () => ({
    type: FETCH_GET_LPBALANCE_REQUEST,
});

export const fetchGetLPBalanceSuccess = (getLPBalanceDetail: any) => ({
    type: FETCH_GET_LPBALANCE_SUCCESS,
    payload: getLPBalanceDetail,
});

export const fetchGetLPBalanceFailure = (error: string) => ({
    type: FETCH_GET_LPBALANCE_FAILURE,
    payload: error,
});
