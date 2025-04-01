
import { FETCH_SINGAPURE_FAILURE, FETCH_SINGAPURE_REQUEST, FETCH_SINGAPURE_SUCCESS } from "../actions/SingapureAction";

interface SingapureState {
    loading: boolean;
    sendSingapureData: any;
    error: string | null;
}

const initialState: SingapureState = {
    loading: false,
    sendSingapureData: null,
    error: null,
};

export const SingapureReducer = (state = initialState, action: any): SingapureState => {
    switch (action.type) {
        case FETCH_SINGAPURE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_SINGAPURE_SUCCESS:
            return { ...state, loading: false, sendSingapureData: action.payload };
        case FETCH_SINGAPURE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
