

export const FETCH_JUMPSTART_POST_REQUEST = 'FETCH_JUMPSTART_POST_REQUEST';
export const FETCH_JUMPSTART_POST_SUCCESS = 'FETCH_JUMPSTART_POST_SUCCESS';
export const FETCH_JUMPSTART_POST_FAILURE = 'FETCH_JUMPSTART_POST_FAILURE';

export const fetchJumpstartPostRequest = () => ({
    type: FETCH_JUMPSTART_POST_REQUEST,
});

export const fetchJumpstartPostSuccess = (JumpstartPostData: any) => ({
    type: FETCH_JUMPSTART_POST_SUCCESS,
    payload: JumpstartPostData,
});

export const fetchJumpstartPostFailure = (error: string) => ({
    type: FETCH_JUMPSTART_POST_SUCCESS,
    payload: error,
});
