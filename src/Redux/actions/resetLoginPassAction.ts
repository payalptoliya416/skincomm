

export const FETCH_RESETLOGINPASS_REQUEST = 'FETCH_RESETLOGINPASS_REQUEST';
export const FETCH_RESETLOGINPASS_SUCCESS = 'FETCH_RESETLOGINPASS_SUCCESS';
export const FETCH_RESETLOGINPASS_FAILURE = 'FETCH_RESETLOGINPASS_FAILURE';

export const fetchProductListRequest = () => ({
    type: FETCH_RESETLOGINPASS_REQUEST,
});

export const fetchProductListSuccess = (resetLoginData: any) => ({
    type: FETCH_RESETLOGINPASS_SUCCESS,
    payload: resetLoginData,
});

export const fetchProductListGailure = (error: string) => ({
    type: FETCH_RESETLOGINPASS_FAILURE,
    payload: error,
});
