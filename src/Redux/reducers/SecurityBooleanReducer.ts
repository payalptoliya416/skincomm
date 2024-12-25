
import { FETCH_SECURITY_BOOLEAN_FAILURE, FETCH_SECURITY_BOOLEAN_REQUEST, FETCH_SECURITY_BOOLEAN_SUCCESS } from "../actions/SecurityBooleanAction";

interface SecurityStatus {
    loading: boolean;
    securityBoolean: any;
    error: string | null;
}

const initialState: SecurityStatus = {
    loading: false,
    securityBoolean: null,
    error: null,
};

export const securityBooleanReducer = (state = initialState, action: any): SecurityStatus => {
    switch (action.type) {
        case FETCH_SECURITY_BOOLEAN_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_SECURITY_BOOLEAN_SUCCESS:
            return { ...state, loading: false, securityBoolean: action.payload };
        case FETCH_SECURITY_BOOLEAN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
