


import { FETCH_MATRIX_SIDE_GET_FAILURE, FETCH_MATRIX_SIDE_GET_REQUEST, FETCH_MATRIX_SIDE_GET_SUCCESS } from '../actions/MatrixSideAction';

interface MatrixSideGet {
    loading: boolean;
    matrixSideGetData: any;
    error: string | null;
}

const initialState: MatrixSideGet = {
    loading: false,
    matrixSideGetData: null,
    error: null,
};

export const MatrixSideGetReducer = (state = initialState, action: any): MatrixSideGet => {
    switch (action.type) {
        case FETCH_MATRIX_SIDE_GET_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_MATRIX_SIDE_GET_SUCCESS:
            return { ...state, loading: false, matrixSideGetData: action.payload  };
        case FETCH_MATRIX_SIDE_GET_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
