

import { FETCH_MATRIX_SIDE_FAILURE, FETCH_MATRIX_SIDE_REQUEST, FETCH_MATRIX_SIDE_SUCCESS } from '../actions/MatrixAction';

interface MatrixSide {
    loading: boolean;
    matrixSideData: any;
    error: string | null;
}

const initialState: MatrixSide = {
    loading: false,
    matrixSideData: null,
    error: null,
};

export const MatrixSideReducer = (state = initialState, action: any): MatrixSide => {
    switch (action.type) {
        case FETCH_MATRIX_SIDE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_MATRIX_SIDE_SUCCESS:
            return { ...state, loading: false, matrixSideData: action.payload  };
        case FETCH_MATRIX_SIDE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
