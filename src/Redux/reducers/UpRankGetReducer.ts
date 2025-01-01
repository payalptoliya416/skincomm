
import { FETCH_UPRANKGET_FAILURE, FETCH_UPRANKGET_REQUEST, FETCH_UPRANKGET_SUCCESS } from "../actions/UprankGetAction";

interface UpRankState {
    loading: boolean;
    UprankGetData: any;    
    error: string | null;
}

const initialState: UpRankState = {
    loading: false,
    UprankGetData: null,
    error: null,
};

export const uprankReducer = (state = initialState, action: any): UpRankState => {
    switch (action.type) {
        case FETCH_UPRANKGET_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_UPRANKGET_SUCCESS:
            return { ...state, loading: false, UprankGetData: action.payload };
        case FETCH_UPRANKGET_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
