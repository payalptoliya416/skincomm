
import { FETCH_SENDSECURITY_OTP_FAILURE, FETCH_SENDSECURITY_OTP_REQUEST, FETCH_SENDSECURITY_OTP_SUCCESS } from "../actions/sendSecurityOtpAction";

interface SecurityOtpState {
    loading: boolean;
    sendSecurityOtpData: any;
    error: string | null;
}

const initialState: SecurityOtpState = {
    loading: false,
    sendSecurityOtpData: null,
    error: null,
};

export const SecurityOtpReducer = (state = initialState, action: any): SecurityOtpState => {
    switch (action.type) {
        case FETCH_SENDSECURITY_OTP_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_SENDSECURITY_OTP_SUCCESS:
            return { ...state, loading: false, sendSecurityOtpData: action.payload };
        case FETCH_SENDSECURITY_OTP_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
