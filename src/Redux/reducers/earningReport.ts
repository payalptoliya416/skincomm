import { FETCH_EARNING_FAILURE, FETCH_EARNING_REQUEST, FETCH_EARNING_SUCCESS } from "../actions/earningReportAction";

interface EARNINGState {
    loading: boolean;
    earningData: any;    
    error: string | null;
}

const initialState: EARNINGState = {
    loading: false,
    earningData: null,
    error: null,
};

export const earningReducer = (state = initialState, action: any): EARNINGState => {
    switch (action.type) {
        case FETCH_EARNING_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_EARNING_SUCCESS:
            return { ...state, loading: false, earningData: action.payload };
        case FETCH_EARNING_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
