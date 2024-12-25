

import { FETCH_MYTEAM_SEARCH_FAILURE, FETCH_MYTEAM_SEARCH_REQUEST, FETCH_MYTEAM_SEARCH_SUCCESS } from '../actions/myTeamSearch';

interface TeamSearchState {
    loading: boolean;
    teamsearchData: any;
    error: string | null;
    
}

const initialState: TeamSearchState = {
    loading: false,
    teamsearchData: null,
    error: null,
};

export const TeamSearchReducer = (state = initialState, action: any): TeamSearchState => {
    switch (action.type) {
        case FETCH_MYTEAM_SEARCH_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_MYTEAM_SEARCH_SUCCESS:
            return { ...state, loading: false, teamsearchData: action.payload  };
        case FETCH_MYTEAM_SEARCH_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
