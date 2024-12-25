import { FETCH_PRODUSTLISTPACAGE_FAILURE, FETCH_PRODUSTLISTPACAGE_REQUEST, FETCH_PRODUSTLISTPACAGE_SUCCESS } from "../actions/ProductPAckageAction";

interface ProductListPacageState {
    loading: boolean;
    productPacakgeListData: any;    
    error: string | null;
}

const initialState: ProductListPacageState = {
    loading: false,
    productPacakgeListData: [],
    error: null,
};

export const productListPakageReducer = (state = initialState, action: any): ProductListPacageState => {
    switch (action.type) {
        case FETCH_PRODUSTLISTPACAGE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_PRODUSTLISTPACAGE_SUCCESS:
            return { ...state, loading: false, productPacakgeListData: action.payload };
        case FETCH_PRODUSTLISTPACAGE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
