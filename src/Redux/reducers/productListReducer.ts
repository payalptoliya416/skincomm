import { FETCH_PRODUSTLIST_FAILURE, FETCH_PRODUSTLIST_REQUEST, FETCH_PRODUSTLIST_SUCCESS } from "../actions/productListAction";

interface ProductListState {
    loading: boolean;
    productListData: any;    
    error: string | null;
}

const initialState: ProductListState = {
    loading: false,
    productListData: [],
    error: null,
};

export const productListReducer = (state = initialState, action: any): ProductListState => {
    switch (action.type) {
        case FETCH_PRODUSTLIST_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_PRODUSTLIST_SUCCESS:
            return { ...state, loading: false, productListData: action.payload };
        case FETCH_PRODUSTLIST_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};