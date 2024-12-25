

export const FETCH_VERIFYLOGIN_REQUEST = 'FETCH_VERIFYLOGIN_REQUEST';
export const FETCH_VERIFYLOGIN_SUCCESS = 'FETCH_VERIFYLOGIN_SUCCESS';
export const FETCH_VERIFYLOGIN_FAILURE = 'FETCH_VERIFYLOGIN_FAILURE';

export const fetchVerifyLoginRequest = () => ({
    type: FETCH_VERIFYLOGIN_REQUEST,
});

export const fetchVerifyLoginSuccess = (verifyLogindata: any) => ({
    type: FETCH_VERIFYLOGIN_SUCCESS,
    payload: verifyLogindata,
});

export const fetchVerifyLoginFailure = (error: string) => ({
    type: FETCH_VERIFYLOGIN_FAILURE,
    payload: error,
});
