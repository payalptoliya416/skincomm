
import { FETCH_WITHDRAWAL_FAILURE, FETCH_WITHDRAWAL_REQUEST, FETCH_WITHDRAWAL_SUCCESS } from "../actions/withDrawalAction";

interface WithDrawalState {
    loading: boolean;
    WhithdrawalData: any;    
    error: string | null;
}

const initialState: WithDrawalState = {
    loading: false,
    WhithdrawalData: null,
    error: null,
};

export const userDetailReducer = (state = initialState, action: any): WithDrawalState => {
    switch (action.type) {
        case FETCH_WITHDRAWAL_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_WITHDRAWAL_SUCCESS:
            return { ...state, loading: false, WhithdrawalData: action.payload };
        case FETCH_WITHDRAWAL_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
