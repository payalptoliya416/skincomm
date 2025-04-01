

import { FETCH_E_LIBRARY_SUB_CAT_FAILURE, FETCH_E_LIBRARY_SUB_CAT_REQUEST, FETCH_E_LIBRARY_SUB_CAT_SUCCESS, RESET_E_LIBRARY_SUB_CAT_DATA } from '../actions/ELibrarySubCatAction';

interface ELibrarySubCatState {
    loading: boolean;
    eLibrarySubCatData: any;
    error: string | null;
}

const initialState: ELibrarySubCatState = {
    loading: false,
    eLibrarySubCatData: null,
    error: null,
};
export const eLibrarySubCatReducer = (state = initialState, action: any): ELibrarySubCatState => {
    switch (action.type) {
        case FETCH_E_LIBRARY_SUB_CAT_REQUEST:
            // When a new request is made, clear previous data
            return { ...state, loading: true, eLibrarySubCatData: [], error: null };  // Clear previous data

        case FETCH_E_LIBRARY_SUB_CAT_SUCCESS:
            return { ...state, loading: false, eLibrarySubCatData: action.payload };

        case FETCH_E_LIBRARY_SUB_CAT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case RESET_E_LIBRARY_SUB_CAT_DATA:
            // Reset the data explicitly if needed (optional)
            return { ...state, eLibrarySubCatData: [], loading: false, error: null };

        default:
            return state;
    }
};