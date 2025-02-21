
import { FETCH_WITHDRAWAL_PAGE_FAILURE, FETCH_WITHDRAWAL_PAGE_REQUEST, FETCH_WITHDRAWAL_PAGE_SUCCESS } from "../actions/WithDAction";

interface WithDrawalDrwState {
    loading: boolean;
    WhithdrawalPageData: any;    
    error: string | null;
}

const initialState: WithDrawalDrwState = {
    loading: false,
    WhithdrawalPageData: null,
    error: null,
};

export const withDReducer = (state = initialState, action: any): WithDrawalDrwState => {
    switch (action.type) {
        case FETCH_WITHDRAWAL_PAGE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_WITHDRAWAL_PAGE_SUCCESS:
            return { ...state, loading: false, WhithdrawalPageData: action.payload };
        case FETCH_WITHDRAWAL_PAGE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
