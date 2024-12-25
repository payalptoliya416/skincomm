

export const FETCH_SECURITY_PASS_REQUEST = 'FETCH_SECURITY_PASS_REQUEST';
export const FETCH_SECURITY_PASS_SUCCESS = 'FETCH_SECURITY_PASS_SUCCESS';
export const FETCH_SECURITY_PASS_FAILURE = 'FETCH_SECURITY_PASS_FAILURE';

export const fetchNewSecurityPassRequest = () => ({
    type: FETCH_SECURITY_PASS_REQUEST,
});

export const fetchSecurityPassSuccess = (securityData: any) => ({
    type: FETCH_SECURITY_PASS_SUCCESS,
    payload: securityData,
});

export const fetchNewSecurityPassFailure = (error: string) => ({
    type: FETCH_SECURITY_PASS_FAILURE,
    payload: error,
});
