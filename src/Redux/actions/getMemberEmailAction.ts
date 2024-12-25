

export const FETCH_GET_MEMBER_REQUEST = 'FETCH_GET_MEMBER_REQUEST';
export const FETCH_GET_MEMBER_SUCCESS = 'FETCH_GET_MEMBER_SUCCESS';
export const FETCH_GET_MEMBER_FAILURE = 'FETCH_GET_MEMBER_FAILURE';

export const fetchGetMemberRequest = () => ({
    type: FETCH_GET_MEMBER_REQUEST,
});

export const fetchGetMemberSuccess = (getMemberData: any) => ({
    type: FETCH_GET_MEMBER_SUCCESS,
    payload: getMemberData,
});

export const fetchGetMemberFailure = (error: string) => ({
    type: FETCH_GET_MEMBER_FAILURE,
    payload: error,
});
