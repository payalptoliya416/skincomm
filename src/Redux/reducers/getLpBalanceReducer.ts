
import { FETCH_GET_LPBALANCE_FAILURE, FETCH_GET_LPBALANCE_REQUEST, FETCH_GET_LPBALANCE_SUCCESS } from "../actions/getLpBalance";

interface GetLPBalanceState {
    loading: boolean;
    getLPBalanceDetail: any;
    error: string | null;
}

const initialState: GetLPBalanceState = {
    loading: false,
    getLPBalanceDetail: [],
    error: null,
};

export const getLpBalanceReducer = (state = initialState, action: any): GetLPBalanceState => {
    switch (action.type) {
        case FETCH_GET_LPBALANCE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_GET_LPBALANCE_SUCCESS:
            return { ...state, loading: false, getLPBalanceDetail: action.payload };
        case FETCH_GET_LPBALANCE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
