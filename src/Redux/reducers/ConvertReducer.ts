

import { FETCH_CONVERT_FAILURE, FETCH_CONVERT_REQUEST, FETCH_CONVERT_SUCCESS } from '../actions/ConverAction';

interface convertDataState {
    loading: boolean;
    convertData: any;
    error: string | null;
}

const initialState: convertDataState = {
    loading: false,
    convertData: [],
    error: null,
};

export const convertDataReducer = (state = initialState, action: any): convertDataState => {
    switch (action.type) {
        case FETCH_CONVERT_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_CONVERT_SUCCESS:
            return { ...state, loading: false, convertData: action.payload };
        case FETCH_CONVERT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
