
import { FETCH_BANKLIST_FAILURE, FETCH_BANKLIST_REQUEST, FETCH_BANKLIST_SUCCESS } from '../actions/bankListAction';

interface BankListState {
    loading: boolean;
    bankList: any;
    error: string | null;
}

const initialState: BankListState = {
    loading: false,
    bankList: [],
    error: null,
};

export const bankListReducer = (state = initialState, action: any): BankListState => {
    switch (action.type) {
        case FETCH_BANKLIST_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_BANKLIST_SUCCESS:
            return { ...state, loading: false, bankList: action.payload };
        case FETCH_BANKLIST_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
