

import { FETCH_MEMBER_LINE_FAILURE, FETCH_MEMBER_LINE_REQUEST, FETCH_MEMBER_LINE_SUCCESS } from '../actions/MemberLineAction';

interface MemberLine {
    loading: boolean;
    memberLineData: any;
    error: string | null;
    
}

const initialState: MemberLine = {
    loading: false,
    memberLineData: null,
    error: null,
};

export const memberLineReducer = (state = initialState, action: any): MemberLine => {
    switch (action.type) {
        case FETCH_MEMBER_LINE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_MEMBER_LINE_SUCCESS:
            return { ...state, loading: false, memberLineData: action.payload  };
        case FETCH_MEMBER_LINE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
