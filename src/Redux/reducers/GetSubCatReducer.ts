

import { FETCH_GET_SUBCATEGORY_FAILURE, FETCH_GET_SUBCATEGORY_REQUEST, FETCH_GET_SUBCATEGORY_SUCCESS } from "../actions/GetSubCatAction";

interface GetSubCatState {
    loading: boolean;
    SubcategoryData: any;
    error: string | null;
}

const initialState: GetSubCatState = {
    loading: false,
    SubcategoryData: [],
    error: null,
};

export const getSubcategoryReducer = (state = initialState, action: any): GetSubCatState => {
    switch (action.type) {
        case FETCH_GET_SUBCATEGORY_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_GET_SUBCATEGORY_SUCCESS:
            return { ...state, loading: false, SubcategoryData: action.payload };
        case FETCH_GET_SUBCATEGORY_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
