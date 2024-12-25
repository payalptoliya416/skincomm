import { FETCH_SINGLEEARNING_FAILURE, FETCH_SINGLEEARNING_REQUEST, FETCH_SINGLEEARNING_SUCCESS } from "../actions/singleEarningAction";

interface SingleEarningState {
    loading: boolean;
    singleearningData: any;    
    error: string | null;
}

const initialState: SingleEarningState = {
    loading: false,
    singleearningData: null,
    error: null,
};

export const singleEarningReducer = (state = initialState, action: any): SingleEarningState => {
    switch (action.type) {
        case FETCH_SINGLEEARNING_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_SINGLEEARNING_SUCCESS:
            return { ...state, loading: false, singleearningData: action.payload };
        case FETCH_SINGLEEARNING_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
