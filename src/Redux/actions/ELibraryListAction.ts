

export const FETCH_E_LIBRARY_LIST_REQUEST = 'FETCH_E_LIBRARY_LIST_REQUEST';
export const FETCH_E_LIBRARY_LIST_SUCCESS = 'FETCH_E_LIBRARY_LIST_SUCCESS';
export const FETCH_E_LIBRARY_LIST_FAILURE = 'FETCH_E_LIBRARY_LIST_FAILURE';

export const fetchELibraryListRequest = () => ({
    type: FETCH_E_LIBRARY_LIST_REQUEST,
});

export const fetchELibraryListSuccess = (eLibraryListData: any) => ({
    type: FETCH_E_LIBRARY_LIST_SUCCESS,
    payload: eLibraryListData,
});

export const fetchELibraryListFailure = (error: string) => ({
    type: FETCH_E_LIBRARY_LIST_FAILURE,
    payload: error,
});
