

export const FETCH_USERDETAIL_REQUEST = 'FETCH_USERDETAIL_REQUEST';
export const FETCH_USERDETAIL_SUCCESS = 'FETCH_USERDETAIL_SUCCESS';
export const FETCH_USERDETAIL_FAILURE = 'FETCH_USERDETAIL_FAILURE';

export const fetchUserDetailRequest = () => ({
    type: FETCH_USERDETAIL_REQUEST,
});

export const fetchUserDetailSuccess = (UserDetailData: any) => ({
    type: FETCH_USERDETAIL_SUCCESS,
    payload: UserDetailData,
});

export const fetchUserDetailFailure = (error: string) => ({
    type: FETCH_USERDETAIL_FAILURE,
    payload: error,
});
