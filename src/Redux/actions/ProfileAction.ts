

export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

export const fetchProfileRequest = () => ({
    type: FETCH_PROFILE_REQUEST,
});

export const fetchProfileSuccess = (ProfileData: any) => ({
    type: FETCH_PROFILE_SUCCESS,
    payload: ProfileData,
});

export const fetchProfileFailer = (error: string) => ({
    type: FETCH_PROFILE_FAILURE,
    payload: error,
});
