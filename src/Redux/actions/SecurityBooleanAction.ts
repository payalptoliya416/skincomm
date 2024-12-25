

export const FETCH_SECURITY_BOOLEAN_REQUEST = 'FETCH_SECURITY_BOOLEAN_REQUEST';
export const FETCH_SECURITY_BOOLEAN_SUCCESS = 'FETCH_SECURITY_BOOLEAN_SUCCESS';
export const FETCH_SECURITY_BOOLEAN_FAILURE = 'FETCH_SECURITY_BOOLEAN_FAILURE';

export const fetchSecurityBooleanRequest = () => ({
    type: FETCH_SECURITY_BOOLEAN_REQUEST,
});

export const fetchSecurityBooleantSuccess = (securityBoolean: any) => ({
    type: FETCH_SECURITY_BOOLEAN_SUCCESS,
    payload: securityBoolean,
});

export const fetchSecurityBooleanfailure = (error: string) => ({
    type: FETCH_SECURITY_BOOLEAN_FAILURE,
    payload: error,
});
