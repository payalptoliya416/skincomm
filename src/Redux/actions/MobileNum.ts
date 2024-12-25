

export const FETCH_NUUMBER_REQUEST = 'FETCH_NUUMBER_REQUEST';
export const FETCH_NUUMBER_SUCCESS = 'FETCH_NUUMBER_SUCCESS';
export const FETCH_NUUMBER_FAILURE = 'FETCH_NUUMBER_FAILURE';

export const fetchNumberRequest = () => ({
    type: FETCH_NUUMBER_REQUEST,
});

export const fetchNumberSuccess = (numberData: any) => ({
    type: FETCH_NUUMBER_SUCCESS,
    payload: numberData,
});

export const fetchNumberFailure = (error: string) => ({
    type: FETCH_NUUMBER_FAILURE,
    payload: error,
});
