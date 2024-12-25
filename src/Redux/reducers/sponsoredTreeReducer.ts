import { FETCH_SPONSERED_TREE_FAILURE, FETCH_SPONSERED_TREE_REQUEST, FETCH_SPONSERED_TREE_SUCCESS } from "../actions/sponsoredTree";

interface SponsoredTreeState {
    loading: boolean;
    sponsoredTreeData: any;    
    error: string | null;
}

const initialState: SponsoredTreeState = {
    loading: false,
    sponsoredTreeData: [],
    error: null,
};

export const sponsoredTree = (state = initialState, action: any): SponsoredTreeState => {
    switch (action.type) {
        case FETCH_SPONSERED_TREE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_SPONSERED_TREE_SUCCESS:
            return { ...state, loading: false, sponsoredTreeData: action.payload };
        case FETCH_SPONSERED_TREE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
