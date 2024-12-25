

export const FETCH_ADD_MEMBER_REQUEST = 'FETCH_ADD_MEMBER_REQUEST';
export const FETCH_ADD_MEMBER_SUCCESS = 'FETCH_ADD_MEMBER_SUCCESS';
export const FETCH_ADD_MEMBER_FAILURE = 'FETCH_ADD_MEMBER_FAILURE';

export const fetchAddMemberRequest = () => ({
    type: FETCH_ADD_MEMBER_REQUEST,
});

export const fetchAddMemberSuccess = (addmemberData: any) => ({
    type: FETCH_ADD_MEMBER_SUCCESS,
    payload: addmemberData,
});

export const fetchAddMemberFailure = (error: string) => ({
    type: FETCH_ADD_MEMBER_FAILURE,
    payload: error,
});
