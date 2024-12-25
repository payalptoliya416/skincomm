
import { FETCH_REORDER_POST_FAILURE, FETCH_REORDER_POST_REQUEST, FETCH_REORDER_POST_SUCCESS } from "../actions/ReorderPostAction";

interface ReorderPostState {
    loading: boolean;
    reorderData: any;    
    error: string | null;
}

const initialState: ReorderPostState = {
    loading: false,
    reorderData: [],
    error: null,
};

export const productListReducer = (state = initialState, action: any): ReorderPostState => {
    switch (action.type) {
        case FETCH_REORDER_POST_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_REORDER_POST_SUCCESS:
            return { ...state, loading: false, reorderData: action.payload };
        case FETCH_REORDER_POST_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
