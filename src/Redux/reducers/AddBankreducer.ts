
import { FETCH_ADD_BANK_FAILURE, FETCH_ADD_BANK_REQUEST, FETCH_ADD_BANK_SUCCESS } from '../actions/AddBankAction';

interface AddBankState {
    loading: boolean;
    addbankData: any;
    error: string | null;
}

const initialState: AddBankState = {
    loading: false,
    addbankData: null,
    error: null,
};

export const addBankReducer = (state = initialState, action: any): AddBankState => {
    switch (action.type) {
        case FETCH_ADD_BANK_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_ADD_BANK_SUCCESS:
            return { ...state, loading: false, addbankData: action.payload };
        case FETCH_ADD_BANK_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
