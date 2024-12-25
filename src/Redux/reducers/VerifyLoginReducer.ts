
import { FETCH_VERIFYLOGIN_FAILURE, FETCH_VERIFYLOGIN_REQUEST, FETCH_VERIFYLOGIN_SUCCESS } from "../actions/VerifyLoginAction";

interface VerifyLoginState {
    loading: boolean;
    verifyLogindata: any;    
    error: string | null;
}

const initialState: VerifyLoginState = {
    loading: false,
    verifyLogindata: null,
    error: null,
};

export const verifyLoginReducer = (state = initialState, action: any): VerifyLoginState => {
    switch (action.type) {
        case FETCH_VERIFYLOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_VERIFYLOGIN_SUCCESS:
            return { ...state, loading: false, verifyLogindata: action.payload };
        case FETCH_VERIFYLOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
