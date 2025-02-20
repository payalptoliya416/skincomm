

import { FETCH_E_LIBRARY_LIST_FAILURE, FETCH_E_LIBRARY_LIST_REQUEST, FETCH_E_LIBRARY_LIST_SUCCESS } from '../actions/ELibraryListAction';

interface ELibraryListState {
    loading: boolean;
    eLibraryListData: any;
    error: string | null;
}

const initialState: ELibraryListState = {
    loading: false,
    eLibraryListData: null,
    error: null,
};

export const eLibraryListReducer = (state = initialState, action: any): ELibraryListState => {
    switch (action.type) {
        case FETCH_E_LIBRARY_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_E_LIBRARY_LIST_SUCCESS:
            return { ...state, loading: false, eLibraryListData: action.payload };
        case FETCH_E_LIBRARY_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
