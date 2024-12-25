
import { FETCH_SENDLOGIN_FAILURE, FETCH_SENDLOGIN_REQUEST, FETCH_SENDLOGIN_SUCCESS } from "../actions/sendLoginOtp";

interface LoginResetState {
    loading: boolean;
    sendLoginOtpData: any;
    error: string | null;
}

const initialState: LoginResetState = {
    loading: false,
    sendLoginOtpData: null,
    error: null,
};

export const resetLoginOtpReducer = (state = initialState, action: any): LoginResetState => {
    switch (action.type) {
        case FETCH_SENDLOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_SENDLOGIN_SUCCESS:
            return { ...state, loading: false, sendLoginOtpData: action.payload };
        case FETCH_SENDLOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
