
import { FETCH_SECURITY_OTP_FAILURE, FETCH_SECURITY_OTP_REQUEST, FETCH_SECURITY_OTP_SUCCESS } from "../actions/securityOtpAction";

interface GetSecurityOtpState {
    loading: boolean;
    securityOtp: any;
    error: string | null;
}

const initialState: GetSecurityOtpState = {
    loading: false,
    securityOtp: null,
    error: null,
};

export const securityOtpReducer = (state = initialState, action: any): GetSecurityOtpState => {
    switch (action.type) {
        case FETCH_SECURITY_OTP_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_SECURITY_OTP_SUCCESS:
            return { ...state, loading: false, securityOtp: action.payload };
        case FETCH_SECURITY_OTP_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
