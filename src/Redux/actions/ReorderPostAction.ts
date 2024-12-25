

export const FETCH_REORDER_POST_REQUEST = 'FETCH_REORDER_POST_REQUEST';
export const FETCH_REORDER_POST_SUCCESS = 'FETCH_REORDER_POST_SUCCESS';
export const FETCH_REORDER_POST_FAILURE = 'FETCH_REORDER_POST_FAILURE';

export const fetchReorderRequest = () => ({
    type: FETCH_REORDER_POST_REQUEST,
});

export const fetchReorderSuccess = (reorderData: any) => ({
    type: FETCH_REORDER_POST_SUCCESS,
    payload: reorderData,
});

export const fetchReorderfailure = (error: string) => ({
    type: FETCH_REORDER_POST_FAILURE,
    payload: error,
});
