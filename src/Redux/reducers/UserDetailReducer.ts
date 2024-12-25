
import { FETCH_USERDETAIL_FAILURE, FETCH_USERDETAIL_REQUEST, FETCH_USERDETAIL_SUCCESS } from "../actions/userDetailAction";

interface UserDetailState {
    loading: boolean;
    UserDetailData: any;    
    error: string | null;
}

const initialState: UserDetailState = {
    loading: false,
    UserDetailData: null,
    error: null,
};

export const userDetailReducer = (state = initialState, action: any): UserDetailState => {
    switch (action.type) {
        case FETCH_USERDETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_USERDETAIL_SUCCESS:
            return { ...state, loading: false, UserDetailData: action.payload };
        case FETCH_USERDETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
