

export const FETCH_SENDLOGIN_REQUEST = 'FETCH_SENDLOGIN_REQUEST';
export const FETCH_SENDLOGIN_SUCCESS = 'FETCH_SENDLOGIN_SUCCESS';
export const FETCH_SENDLOGIN_FAILURE = 'FETCH_SENDLOGIN_FAILURE';

export const fetchSendLoginRequest = () => ({
    type: FETCH_SENDLOGIN_REQUEST,
});

export const fetchSendLoginSuccess = (sendLoginOtpData: any) => ({
    type: FETCH_SENDLOGIN_SUCCESS,
    payload: sendLoginOtpData,
});

export const fetchSendLoginfailure = (error: string) => ({
    type: FETCH_SENDLOGIN_FAILURE,
    payload: error,
});
