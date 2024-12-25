
import { FETCH_SUBACCOUNT_FAILURE, FETCH_SUBACCOUNT_REQUEST, FETCH_SUBACCOUNT_SUCCESS } from "../actions/subAcoAction";

interface SubAccountState {
    loading: boolean;
    SubAccountData: any;    
    error: string | null;
}

const initialState: SubAccountState = {
    loading: false,
    SubAccountData: null,
    error: null,
};

export const subAccountReducer = (state = initialState, action: any): SubAccountState => {
    switch (action.type) {
        case FETCH_SUBACCOUNT_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_SUBACCOUNT_SUCCESS:
            return { ...state, loading: false, SubAccountData: action.payload };
        case FETCH_SUBACCOUNT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
