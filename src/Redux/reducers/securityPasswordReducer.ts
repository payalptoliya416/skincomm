
import { FETCH_SECURITY_PASSWORD_FAILURE, FETCH_SECURITY_PASSWORD_REQUEST, FETCH_SECURITY_PASSWORD_SUCCESS } from "../actions/SecurityPassword";

interface GetSecuritypasseState {
    loading: boolean;
    securityPassword: any;
    error: string | null;
}

const initialState: GetSecuritypasseState = {
    loading: false,
    securityPassword: null,
    error: null,
};

export const getSecurityPasswordReducer = (state = initialState, action: any): GetSecuritypasseState => {
    switch (action.type) {
        case FETCH_SECURITY_PASSWORD_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_SECURITY_PASSWORD_SUCCESS:
            return { ...state, loading: false, securityPassword: action.payload };
        case FETCH_SECURITY_PASSWORD_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
