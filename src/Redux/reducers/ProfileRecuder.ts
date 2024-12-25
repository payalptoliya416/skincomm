import { FETCH_PROFILE_FAILURE, FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS } from "../actions/ProfileAction";

interface ProfileLIstData {
    loading: boolean;
    ProfileData: any;    
    error: string | null;
}

const initialState: ProfileLIstData = {
    loading: false,
    ProfileData: [],
    error: null,
};

export const profileReducer = (state = initialState, action: any): ProfileLIstData => {
    switch (action.type) {
        case FETCH_PROFILE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_PROFILE_SUCCESS:
            return { ...state, loading: false, ProfileData: action.payload };
        case FETCH_PROFILE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
