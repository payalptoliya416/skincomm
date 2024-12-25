

export const FETCH_MEMBER_LINE_REQUEST = 'FETCH_MEMBER_LINE_REQUEST';
export const FETCH_MEMBER_LINE_SUCCESS = 'FETCH_MEMBER_LINE_SUCCESS';
export const FETCH_MEMBER_LINE_FAILURE = 'FETCH_MEMBER_LINE_FAILURE';

export const fetchMemberLineRequest = () => ({
    type: FETCH_MEMBER_LINE_REQUEST,
});

export const fetchMemberLinetSuccess = (memberLineData: any) => ({
    type: FETCH_MEMBER_LINE_SUCCESS,
    payload: memberLineData,
});

export const fetchMemberLinefailure = (error: string) => ({
    type: FETCH_MEMBER_LINE_FAILURE,
    payload: error,
});
