

export const FETCH_SECURITY_PASSWORD_REQUEST = 'FETCH_SECURITY_PASSWORD_REQUEST';
export const FETCH_SECURITY_PASSWORD_SUCCESS = 'FETCH_SECURITY_PASSWORD_SUCCESS';
export const FETCH_SECURITY_PASSWORD_FAILURE = 'FETCH_SECURITY_PASSWORD_FAILURE';

export const fetchSecurityPassRequest = () => ({
    type: FETCH_SECURITY_PASSWORD_REQUEST,
});

export const fetchSecurityPasstSuccess = (securityPassword: any) => ({
    type: FETCH_SECURITY_PASSWORD_SUCCESS,
    payload: securityPassword,
});

export const fetchSecurityPassfailure = (error: string) => ({
    type: FETCH_SECURITY_PASSWORD_FAILURE,
    payload: error,
});
