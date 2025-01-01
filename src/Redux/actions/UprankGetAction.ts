

export const FETCH_UPRANKGET_REQUEST = 'FETCH_UPRANKGET_REQUEST';
export const FETCH_UPRANKGET_SUCCESS = 'FETCH_UPRANKGET_SUCCESS';
export const FETCH_UPRANKGET_FAILURE = 'FETCH_UPRANKGET_FAILURE';

export const fetchUprankGetRequest = () => ({
    type: FETCH_UPRANKGET_REQUEST,
});

export const fetchUprankGetSuccess = (UprankGetData: any) => ({
    type: FETCH_UPRANKGET_SUCCESS,
    payload: UprankGetData,
});

export const fetchUprankGetFailure = (error: string) => ({
    type: FETCH_UPRANKGET_FAILURE,
    payload: error,
});
