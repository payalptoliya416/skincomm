

export const FETCH_WITHDRAWAL_PAGE_REQUEST = 'FETCH_WITHDRAWAL_PAGE_REQUEST';
export const FETCH_WITHDRAWAL_PAGE_SUCCESS = 'FETCH_WITHDRAWAL_PAGE_SUCCESS';
export const FETCH_WITHDRAWAL_PAGE_FAILURE = 'FETCH_WITHDRAWAL_PAGE_FAILURE';

export const fetchUserWhithdrawalPageRequest = () => ({
    type: FETCH_WITHDRAWAL_PAGE_REQUEST,
});

export const fetchUserWhithdrawalPageSuccess = (WhithdrawalPageData: any) => ({
    type: FETCH_WITHDRAWAL_PAGE_SUCCESS,
    payload: WhithdrawalPageData,
});

export const fetchUserWhithdrawalPageFailure = (error: string) => ({
    type: FETCH_WITHDRAWAL_PAGE_FAILURE,
    payload: error,
});
