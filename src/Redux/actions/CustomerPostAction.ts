

export const FETCH_CUTOMER_POST_REQUEST = 'FETCH_CUTOMER_POST_REQUEST';
export const FETCH_CUTOMER_POST_SUCCESS = 'FETCH_CUTOMER_POST_SUCCESS';
export const FETCH_CUTOMER_POST_FAILURE = 'FETCH_CONVERT_POST_FAILURE';

export const fetchBCutomerPostRequest = () => ({
    type: FETCH_CUTOMER_POST_REQUEST,
});

export const fetchCutomerPostSuccess = (cutomerPostData: any) => ({
    type: FETCH_CUTOMER_POST_SUCCESS,
    payload: cutomerPostData,
});

export const fetchCutomerPostFailure = (error: string) => ({
    type: FETCH_CUTOMER_POST_FAILURE,
    payload: error,
});
