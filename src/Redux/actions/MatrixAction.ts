

export const FETCH_MATRIX_SIDE_REQUEST = 'FETCH_MATRIX_SIDE_REQUEST';
export const FETCH_MATRIX_SIDE_SUCCESS = 'FETCH_MATRIX_SIDE_SUCCESS';
export const FETCH_MATRIX_SIDE_FAILURE = 'FETCH_MATRIX_SIDE_FAILURE';

export const fetchMatrixSideRequest = () => ({
    type: FETCH_MATRIX_SIDE_REQUEST,
});

export const fetchMatrixSidetSuccess = (matrixSideData: any) => ({
    type: FETCH_MATRIX_SIDE_SUCCESS,
    payload: matrixSideData,
});

export const fetchMatrixSidefailure = (error: string) => ({
    type: FETCH_MATRIX_SIDE_FAILURE,
    payload: error,
});
