
import { FETCH_LOGIN_PASSWORD_FAILURE, FETCH_LOGIN_PASSWORD_REQUEST, FETCH_LOGIN_PASSWORD_SUCCESS } from "../actions/loginPasswordAction";

interface GetLoginpasseState {
    loading: boolean;
    loginPassword: any;
    error: string | null;
}

const initialState: GetLoginpasseState = {
    loading: false,
    loginPassword: {},
    error: null,
};

export const getLoginPasswordReducer = (state = initialState, action: any): GetLoginpasseState => {
    switch (action.type) {
        case FETCH_LOGIN_PASSWORD_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_LOGIN_PASSWORD_SUCCESS:
            return { ...state, loading: false, loginPassword: action.payload };
        case FETCH_LOGIN_PASSWORD_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
