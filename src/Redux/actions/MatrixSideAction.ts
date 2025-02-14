

export const FETCH_MATRIX_SIDE_GET_REQUEST = 'FETCH_MATRIX_SIDE_GET_REQUEST';
export const FETCH_MATRIX_SIDE_GET_SUCCESS = 'FETCH_MATRIX_SIDE_GET_SUCCESS';
export const FETCH_MATRIX_SIDE_GET_FAILURE = 'FETCH_MATRIX_SIDE_GET_FAILURE';

export const fetchMatrixSideGetRequest = () => ({
    type: FETCH_MATRIX_SIDE_GET_REQUEST,
});

export const fetchMatrixSideGettSuccess = (matrixSideGetData: any) => ({
    type: FETCH_MATRIX_SIDE_GET_SUCCESS,
    payload: matrixSideGetData,
});

export const fetchMatrixSideGetfailure = (error: string) => ({
    type: FETCH_MATRIX_SIDE_GET_FAILURE,
    payload: error,
});
