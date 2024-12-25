

export const FETCH_SECURITY_OTP_REQUEST = 'FETCH_SECURITY_OTP_REQUEST';
export const FETCH_SECURITY_OTP_SUCCESS = 'FETCH_SECURITY_OTP_SUCCESS';
export const FETCH_SECURITY_OTP_FAILURE = 'FETCH_SECURITY_OTP_FAILURE';

export const fetchSecurityOtpRequest = () => ({
    type: FETCH_SECURITY_OTP_REQUEST,
});

export const fetchSecurityOtptSuccess = (securityOtp: any) => ({
    type: FETCH_SECURITY_OTP_SUCCESS,
    payload: securityOtp,
});

export const fetchSecurityOtpfailure = (error: string) => ({
    type: FETCH_SECURITY_OTP_FAILURE,
    payload: error,
});
