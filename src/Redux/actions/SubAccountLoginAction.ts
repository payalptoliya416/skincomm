

export const FETCH_SUBACCOUNT_LOGIN_REQUEST = 'FETCH_SUBACCOUNT_LOGIN_REQUEST';
export const FETCH_SUBACCOUNT_LOGIN_SUCCESS = 'FETCH_SUBACCOUNT_LOGIN_SUCCESS';
export const FETCH_SUBACCOUNT_LOGIN_FAILURE = 'FETCH_SUBACCOUNT_LOGIN_FAILURE';

export const fetchSubAccountLoginRequest = () => ({
    type: FETCH_SUBACCOUNT_LOGIN_REQUEST,
});

export const fetchSubAccountLoginSuccess = (SubAccountLoginData: any) => ({
    type: FETCH_SUBACCOUNT_LOGIN_SUCCESS,
    payload: SubAccountLoginData,
});

export const fetchSubAccountLoginFailure = (error: string) => ({
    type: FETCH_SUBACCOUNT_LOGIN_FAILURE,
    payload: error,
});
