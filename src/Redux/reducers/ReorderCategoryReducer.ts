
import { FETCH_REORDER_CATEGORY_FAILURE, FETCH_REORDER_CATEGORY_REQUEST, FETCH_REORDER_CATEGORY_SUCCESS, FETCH_REORDER_PRODUCT_SUCCESS } from "../actions/ReorderCategoryAction";

interface CategoryState {
    loading: boolean;
    categoryData: any;    
    productData:any;
    error: string | null;
}

const initialState: CategoryState = {
    loading: false,
    categoryData: [],
    productData:[],
    error: null,
};

export const categoryListReducer = (state = initialState, action: any): CategoryState => {
    switch (action.type) {
        case FETCH_REORDER_CATEGORY_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_REORDER_CATEGORY_SUCCESS:
            return { ...state, loading: false, categoryData: action.payload };
        case FETCH_REORDER_PRODUCT_SUCCESS:
            return { ...state, loading: false, productData: action.payload };
        case FETCH_REORDER_CATEGORY_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
