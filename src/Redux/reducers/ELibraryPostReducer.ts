

import { FETCH_E_LIBRARY_POST_FAILURE, FETCH_E_LIBRARY_POST_REQUEST, FETCH_E_LIBRARY_POST_SUCCESS } from '../actions/ELibraryPostAction';

interface ELibraryPostState {
    loading: boolean;
    eLibraryPostData: any;
    error: string | null;
}

const initialState: ELibraryPostState = {
    loading: false,
    eLibraryPostData: null,
    error: null,
};

export const eLibraryPostReducer = (state = initialState, action: any): ELibraryPostState => {
    switch (action.type) {
        case FETCH_E_LIBRARY_POST_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_E_LIBRARY_POST_SUCCESS:
            return { ...state, loading: false, eLibraryPostData: action.payload };
        case FETCH_E_LIBRARY_POST_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
