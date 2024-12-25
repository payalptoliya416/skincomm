

export const FETCH_MYTEAM_SEARCH_REQUEST = 'FETCH_MYTEAM_SEARCH_REQUEST';
export const FETCH_MYTEAM_SEARCH_SUCCESS = 'FETCH_MYTEAM_SEARCH_SUCCESS';
export const FETCH_MYTEAM_SEARCH_FAILURE = 'FETCH_MYTEAM_SEARCH_FAILURE';

export const fetchSearchTeamRequest = () => ({
    type: FETCH_MYTEAM_SEARCH_REQUEST,
});

export const fetchSearchTeamSuccess = (teamsearchData: any) => ({
    type: FETCH_MYTEAM_SEARCH_SUCCESS,
    payload: teamsearchData,
});

export const fetchSearchTeamFailure = (error: string) => ({
    type: FETCH_MYTEAM_SEARCH_FAILURE,
    payload: error,
});
