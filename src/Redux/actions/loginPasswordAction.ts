

export const FETCH_LOGIN_PASSWORD_REQUEST = 'FETCH_LOGIN_PASSWORD_REQUEST';
export const FETCH_LOGIN_PASSWORD_SUCCESS = 'FETCH_LOGIN_PASSWORD_SUCCESS';
export const FETCH_LOGIN_PASSWORD_FAILURE = 'FETCH_LOGIN_PASSWORD_FAILURE';

export const fetchLoginPassRequest = () => ({
    type: FETCH_LOGIN_PASSWORD_REQUEST,
});

export const fetchLoginPasstSuccess = (loginPassword: any) => ({
    type: FETCH_LOGIN_PASSWORD_SUCCESS,
    payload: loginPassword,
});

export const fetchLoginPassfailure = (error: string) => ({
    type: FETCH_LOGIN_PASSWORD_FAILURE,
    payload: error,
});
