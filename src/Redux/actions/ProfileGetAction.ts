

export const FETCH__GET_REQUEST = 'FETCH__GET_REQUEST';
export const FETCH__GET_SUCCESS = 'FETCH__GET_SUCCESS';
export const FETCH__GET_FAILURE = 'FETCH__GET_FAILURE';

export const fetchProfileGetRequest = () => ({
    type: FETCH__GET_REQUEST,
});

export const fetchProfileGetSuccess = (ProfileGetData: any) => ({
    type: FETCH__GET_SUCCESS,
    payload: ProfileGetData,
});

export const fetchProfileGetFailer = (error: string) => ({
    type: FETCH__GET_FAILURE,
    payload: error,
});
