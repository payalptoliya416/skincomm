

export const FETCH_SENDSECURITY_OTP_REQUEST = 'FETCH_SENDSECURITY_OTP_REQUEST';
export const FETCH_SENDSECURITY_OTP_SUCCESS = 'FETCH_SENDSECURITY_OTP_SUCCESS';
export const FETCH_SENDSECURITY_OTP_FAILURE = 'FETCH_SENDSECURITY_OTP_FAILURE';

export const fetchSendSecurityRequest = () => ({
    type: FETCH_SENDSECURITY_OTP_REQUEST,
});

export const fetchSendSecuritySuccess = (sendSecurityOtpData: any) => ({
    type: FETCH_SENDSECURITY_OTP_SUCCESS,
    payload: sendSecurityOtpData,
});

export const fetchSendSecurityfailure = (error: string) => ({
    type: FETCH_SENDSECURITY_OTP_FAILURE,
    payload: error,
});
