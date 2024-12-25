

export const FETCH_WITHDRAWAL_REQUEST = 'FETCH_WITHDRAWAL_REQUEST';
export const FETCH_WITHDRAWAL_SUCCESS = 'FETCH_WITHDRAWAL_SUCCESS';
export const FETCH_WITHDRAWAL_FAILURE = 'FETCH_WITHDRAWAL_FAILURE';

export const fetchUserWhithdrawalRequest = () => ({
    type: FETCH_WITHDRAWAL_REQUEST,
});

export const fetchUserWhithdrawalSuccess = (WhithdrawalData: any) => ({
    type: FETCH_WITHDRAWAL_SUCCESS,
    payload: WhithdrawalData,
});

export const fetchUserWhithdrawalFailure = (error: string) => ({
    type: FETCH_WITHDRAWAL_FAILURE,
    payload: error,
});
