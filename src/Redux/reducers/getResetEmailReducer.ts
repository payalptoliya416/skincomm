
import { FETCH_GET_EMAIL_FAILURE, FETCH_GET_EMAIL_REQUEST, FETCH_GET_EMAIL_SUCCESS } from "../actions/getresetEmailAction";

interface GetEmailState {
    loading: boolean;
    emailData: any;
    error: string | null;
}

const initialState: GetEmailState = {
    loading: false,
    emailData: [],
    error: null,
};

export const getEmailReducer = (state = initialState, action: any): GetEmailState => {
    switch (action.type) {
        case FETCH_GET_EMAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_GET_EMAIL_SUCCESS:
            return { ...state, loading: false, emailData: action.payload };
        case FETCH_GET_EMAIL_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
