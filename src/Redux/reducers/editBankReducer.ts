
import { FETCH_EDIT_BANK_FAILURE, FETCH_EDIT_BANK_REQUEST, FETCH_EDIT_BANK_SUCCESS } from '../actions/editBankDetail';

interface EditBankState {
    loading: boolean;
    editbankData: any;
    error: string | null;
}

const initialState: EditBankState = {
    loading: false,
    editbankData: null,
    error: null,
};

export const editBankReducer = (state = initialState, action: any): EditBankState => {
    switch (action.type) {
        case FETCH_EDIT_BANK_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_EDIT_BANK_SUCCESS:
            return { ...state, loading: false, editbankData: action.payload };
        case FETCH_EDIT_BANK_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
