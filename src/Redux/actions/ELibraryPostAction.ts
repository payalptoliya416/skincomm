

export const FETCH_E_LIBRARY_POST_REQUEST = 'FETCH_E_LIBRARY_POST_REQUEST';
export const FETCH_E_LIBRARY_POST_SUCCESS = 'FETCH_E_LIBRARY_POST_SUCCESS';
export const FETCH_E_LIBRARY_POST_FAILURE = 'FETCH_E_LIBRARY_POST_FAILURE';

export const fetchELibraryPostRequest = () => ({
    type: FETCH_E_LIBRARY_POST_REQUEST,
});

export const fetchELibraryPostSuccess = (eLibraryPostData: any) => ({
    type: FETCH_E_LIBRARY_POST_SUCCESS,
    payload: eLibraryPostData,
});

export const fetchELibraryPostFailure = (error: string) => ({
    type: FETCH_E_LIBRARY_POST_FAILURE,
    payload: error,
});
