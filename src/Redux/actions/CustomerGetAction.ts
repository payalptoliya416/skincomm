

export const FETCH_CUTOMER_GET_REQUEST = 'FETCH_CUTOMER_GET_REQUEST';
export const FETCH_CUTOMER_GET_SUCCESS = 'FETCH_CUTOMER_GET_SUCCESS';
export const FETCH_CUTOMER_GET_FAILURE = 'FETCH_CUTOMER_GET_SUCCESS';

export const fetchBCutomerGetRequest = () => ({
    type: FETCH_CUTOMER_GET_REQUEST,
});

export const fetchCutomerGetSuccess = (cutomerGetData: any) => ({
    type: FETCH_CUTOMER_GET_SUCCESS,
    payload: cutomerGetData,
});

export const fetchCutomerGetFailure = (error: string) => ({
    type: FETCH_CUTOMER_GET_FAILURE,
    payload: error,
});
