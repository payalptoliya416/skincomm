

export const FETCH_UPRANKPOST_REQUEST = 'FETCH_UPRANKPOST_REQUEST';
export const FETCH_UPRANKPOST_SUCCESS = 'FETCH_UPRANKPOST_SUCCESS';
export const FETCH_UPRANKPOST_FAILURE = 'FETCH_UPRANKPOST_FAILURE';

export const fetchUprankPostRequest = () => ({
    type: FETCH_UPRANKPOST_REQUEST,
});

export const fetchUprankPostSuccess = (UprankPostData: any) => ({
    type: FETCH_UPRANKPOST_SUCCESS,
    payload: UprankPostData,
});

export const fetchUprankPostFailure = (error: string) => ({
    type: FETCH_UPRANKPOST_FAILURE,
    payload: error,
});
