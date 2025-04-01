

export const FETCH_SINGAPURE_REQUEST = 'FETCH_SINGAPURE_REQUEST';
export const FETCH_SINGAPURE_SUCCESS = 'FETCH_SINGAPURE_SUCCESS';
export const FETCH_SINGAPURE_FAILURE = 'FETCH_SINGAPURE_FAILURE';

export const fetchSingapureRequest = () => ({
    type: FETCH_SINGAPURE_REQUEST,
});

export const fetchSingapureSuccess = (sendSingapureData: any) => ({
    type: FETCH_SINGAPURE_SUCCESS,
    payload: sendSingapureData,
});

export const fetchSingapurefailure = (error: string) => ({
    type: FETCH_SINGAPURE_FAILURE,
    payload: error,
});
