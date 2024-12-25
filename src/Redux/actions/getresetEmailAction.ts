

export const FETCH_GET_EMAIL_REQUEST = 'FETCH_GET_EMAIL_REQUEST';
export const FETCH_GET_EMAIL_SUCCESS = 'FETCH_GET_EMAIL_SUCCESS';
export const FETCH_GET_EMAIL_FAILURE = 'FETCH_GET_EMAIL_FAILURE';

export const fetchGetEmailRequest = () => ({
    type: FETCH_GET_EMAIL_REQUEST,
});

export const fetchGetEmailSuccess = (emailData: any) => ({
    type: FETCH_GET_EMAIL_SUCCESS,
    payload: emailData,
});

export const fetchGetEmailFailure = (error: string) => ({
    type: FETCH_GET_EMAIL_FAILURE,
    payload: error,
});
