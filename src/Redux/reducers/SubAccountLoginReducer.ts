
import { FETCH_SUBACCOUNT_LOGIN_FAILURE, FETCH_SUBACCOUNT_LOGIN_REQUEST, FETCH_SUBACCOUNT_LOGIN_SUCCESS } from "../actions/SubAccountLoginAction";

interface SubAccountLoginState {
    loading: boolean;
    SubAccountLoginData: any;    
    error: string | null;
}

const initialState: SubAccountLoginState = {
    loading: false,
    SubAccountLoginData: null,
    error: null,
};

export const subAccountLoginReducer = (state = initialState, action: any): SubAccountLoginState => {
    switch (action.type) {
        case FETCH_SUBACCOUNT_LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_SUBACCOUNT_LOGIN_SUCCESS:
            return { ...state, loading: false, SubAccountLoginData: action.payload };
        case FETCH_SUBACCOUNT_LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
