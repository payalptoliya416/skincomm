

export const FETCH_EARNING_REQUEST = 'FETCH_EARNING_REQUEST';
export const FETCH_EARNING_SUCCESS = 'FETCH_EARNING_SUCCESS';
export const FETCH_EARNING_FAILURE = 'FETCH_EARNING_FAILURE';

export const fetchEarningRequest = () => ({
    type: FETCH_EARNING_REQUEST,
});

export const fetchEarningSuccess = (earningData: any) => ({
    type: FETCH_EARNING_SUCCESS,
    payload: earningData,
});

export const fetchEarningailure = (error: string) => ({
    type: FETCH_EARNING_FAILURE,
    payload: error,
});
