


import { FETCH_CUTOMER_GET_FAILURE, FETCH_CUTOMER_GET_REQUEST, FETCH_CUTOMER_GET_SUCCESS } from '../actions/CustomerGetAction';

interface cutomerGetDataState {
    loading: boolean;
    cutomerGetData: any;
    error: string | null;
}

const initialState: cutomerGetDataState = {
    loading: false,
    cutomerGetData: [],
    error: null,
};

export const cutomerGetDataReducer = (state = initialState, action: any): cutomerGetDataState => {
    switch (action.type) {
        case FETCH_CUTOMER_GET_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_CUTOMER_GET_SUCCESS:
            return { ...state, loading: false, cutomerGetData: action.payload };
        case FETCH_CUTOMER_GET_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
