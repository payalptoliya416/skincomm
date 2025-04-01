

export const FETCH_E_LIBRARY_SUB_CAT_REQUEST = 'FETCH_E_LIBRARY_SUB_CAT_REQUEST';
export const FETCH_E_LIBRARY_SUB_CAT_SUCCESS = 'FETCH_E_LIBRARY_SUB_CAT_SUCCESS';
export const FETCH_E_LIBRARY_SUB_CAT_FAILURE = 'FETCH_E_LIBRARY_SUB_CAT_FAILURE';
export const RESET_E_LIBRARY_SUB_CAT_DATA = 'RESET_E_LIBRARY_SUB_CAT_DATA';


export const fetchELibrarySubCatRequest = () => ({
    type: FETCH_E_LIBRARY_SUB_CAT_REQUEST,
});

export const fetchELibrarySubCatSuccess = (eLibrarySubCatData: any) => ({
    type: FETCH_E_LIBRARY_SUB_CAT_SUCCESS,
    payload: eLibrarySubCatData,
});

export const fetchELibrarySubCatFailure = (error: string) => ({
    type: FETCH_E_LIBRARY_SUB_CAT_FAILURE,
    payload: error,
});

export const resetELibrarySubCatData = () => ({
    type: RESET_E_LIBRARY_SUB_CAT_DATA,
});