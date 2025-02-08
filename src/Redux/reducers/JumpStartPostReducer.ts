


import { FETCH_JUMPSTART_POST_REQUEST, FETCH_JUMPSTART_POST_SUCCESS } from "../actions/JumpStartPost";

interface JumpStartPostState {
    loading: boolean;
    JumpstartPostData: any;
    error: string | null;
}

const initialState: JumpStartPostState = {
    loading: false,
    JumpstartPostData: [],
    error: null,
};

export const JumpstartPostReducer = (state = initialState, action: any): JumpStartPostState => {
    switch (action.type) {
        case FETCH_JUMPSTART_POST_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_JUMPSTART_POST_SUCCESS:
            return { ...state, loading: false, JumpstartPostData: action.payload };
        case FETCH_JUMPSTART_POST_SUCCESS:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
