
import { FETCH_UPRANKPOST_FAILURE, FETCH_UPRANKPOST_REQUEST, FETCH_UPRANKPOST_SUCCESS } from "../actions/UprankPostAction";

interface UpRankPost {
    loading: boolean;
    UprankPostData: any;    
    error: string | null;
}

const initialState: UpRankPost = {
    loading: false,
    UprankPostData: null,
    error: null,
};

export const uprankPostReducer = (state = initialState, action: any): UpRankPost => {
    switch (action.type) {
        case FETCH_UPRANKPOST_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_UPRANKPOST_SUCCESS:
            return { ...state, loading: false, UprankPostData: action.payload };
        case FETCH_UPRANKPOST_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
