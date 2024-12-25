
import { FETCH__GET_FAILURE, FETCH__GET_REQUEST, FETCH__GET_SUCCESS } from '../actions/ProfileGetAction';

interface ProfileGetstatus {
    loading: boolean;
    ProfileGetData: any;
    error: string | null;
}

const initialState: ProfileGetstatus = {
    loading: false,
    ProfileGetData: null,
    error: null,
};

export const ProfileGetReducer = (state = initialState, action: any): ProfileGetstatus => {
    switch (action.type) {
        case FETCH__GET_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH__GET_SUCCESS:
            return { ...state, loading: false, ProfileGetData: action.payload  };
        case FETCH__GET_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
