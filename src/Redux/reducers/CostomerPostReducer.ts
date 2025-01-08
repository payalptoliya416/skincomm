


import { FETCH_CUTOMER_POST_FAILURE, FETCH_CUTOMER_POST_REQUEST, FETCH_CUTOMER_POST_SUCCESS } from '../actions/CustomerPostAction';

interface cutomerPostDataState {
    loading: boolean;
    cutomerPostData: any;
    error: string | null;
}

const initialState: cutomerPostDataState = {
    loading: false,
    cutomerPostData: [],
    error: null,
};

export const cutomerPostDataReducer = (state = initialState, action: any): cutomerPostDataState => {
    switch (action.type) {
        case FETCH_CUTOMER_POST_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_CUTOMER_POST_SUCCESS:
            return { ...state, loading: false, cutomerPostData: action.payload };
        case FETCH_CUTOMER_POST_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
