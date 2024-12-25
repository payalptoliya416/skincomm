

export const FETCH_CONVERT_REQUEST = 'FETCH_CONVERT_REQUEST';
export const FETCH_CONVERT_SUCCESS = 'FETCH_CONVERT_SUCCESS';
export const FETCH_CONVERT_FAILURE = 'FETCH_CONVERT_FAILURE';

export const fetchBConvertRequest = () => ({
    type: FETCH_CONVERT_REQUEST,
});

export const fetchConvertSuccess = (convertData: any) => ({
    type: FETCH_CONVERT_SUCCESS,
    payload: convertData,
});

export const fetchConvertFailure = (error: string) => ({
    type: FETCH_CONVERT_FAILURE,
    payload: error,
});
