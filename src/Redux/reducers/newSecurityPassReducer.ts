

import { FETCH_SECURITY_PASS_FAILURE, FETCH_SECURITY_PASS_REQUEST, FETCH_SECURITY_PASS_SUCCESS } from '../actions/newSecurityPassAction';

interface NewSecurityPassState {
    loading: boolean;
    securityData: any;
    error: string | null;
    
}

const initialState: NewSecurityPassState = {
    loading: false,
    securityData: null,
    error: null,
};

export const securityPassReducer = (state = initialState, action: any): NewSecurityPassState => {
    switch (action.type) {
        case FETCH_SECURITY_PASS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_SECURITY_PASS_SUCCESS:
            return { ...state, loading: false, securityData: action.payload  };
        case FETCH_SECURITY_PASS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
