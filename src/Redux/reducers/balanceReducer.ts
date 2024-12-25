
import {
    FETCH_BALANCE_REQUEST,
    FETCH_BALANCE_SUCCESS,
    FETCH_BALANCE_FAILURE,
} from '../actions/balanceActions';

interface BalanceState {
    loading: boolean;
    balanceData: any;
    error: string | null;
}

const initialState: BalanceState = {
    loading: false,
    balanceData: null,
    error: null,
};

export const balanceReducer = (state = initialState, action: any): BalanceState => {
    switch (action.type) {
        case FETCH_BALANCE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_BALANCE_SUCCESS:
            return { ...state, loading: false, balanceData: action.payload };
        case FETCH_BALANCE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
