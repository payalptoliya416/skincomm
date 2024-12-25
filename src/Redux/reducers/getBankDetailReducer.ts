import { FETCH_GET_BANKDETAIL_FAILURE, FETCH_GET_BANKDETAIL_REQUEST, FETCH_GET_BANKDETAIL_SUCCESS } from "../actions/GetBankAvtion";



interface AddBankState {
    loading: boolean;
    getBankDetail: any;
    error: string | null;
}

const initialState: AddBankState = {
    loading: false,
    getBankDetail: [],
    error: null,
};

export const getBankReducer = (state = initialState, action: any): AddBankState => {
    switch (action.type) {
        case FETCH_GET_BANKDETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_GET_BANKDETAIL_SUCCESS:
            return { ...state, loading: false, getBankDetail: action.payload };
        case FETCH_GET_BANKDETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
