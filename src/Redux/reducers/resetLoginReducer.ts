import { FETCH_RESETLOGINPASS_FAILURE, FETCH_RESETLOGINPASS_REQUEST, FETCH_RESETLOGINPASS_SUCCESS } from "../actions/resetLoginPassAction";

interface ResetLoginState {
    loading: boolean;
    resetLoginData: any;    
    error: string | null;
}

const initialState: ResetLoginState = {
    loading: false,
    resetLoginData: [],
    error: null,
};

export const resetLoginReducer = (state = initialState, action: any): ResetLoginState => {
    switch (action.type) {
        case FETCH_RESETLOGINPASS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_RESETLOGINPASS_SUCCESS:
            return { ...state, loading: false, resetLoginData: action.payload };
        case FETCH_RESETLOGINPASS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
