

import { FETCH_NUUMBER_FAILURE, FETCH_NUUMBER_REQUEST, FETCH_NUUMBER_SUCCESS } from '../actions/MobileNum';

interface NumberState {
    loading: boolean;
    numberData: any;
    error: string | null;
    
}

const initialState: NumberState = {
    loading: false,
    numberData: null,
    error: null,
};

export const numberReducer = (state = initialState, action: any): NumberState => {
    switch (action.type) {
        case FETCH_NUUMBER_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_NUUMBER_SUCCESS:
            return { ...state, loading: false, numberData: action.payload  };
        case FETCH_NUUMBER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
