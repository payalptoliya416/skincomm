

export const FETCH_ANNOUNCE_PENDING_REQUEST = 'FETCH_ANNOUNCE_PENDING_REQUEST';
export const FETCH_ANNOUNCE_PENDING_SUCCESS = 'FETCH_ANNOUNCE_PENDING_SUCCESS';
export const FETCH_ANNOUNCE_PENDING_FAILURE = 'FETCH_ANNOUNCE_PENDING_FAILURE';

export const fetchAnnouncePendingRequest = () => ({
    type: FETCH_ANNOUNCE_PENDING_REQUEST,
});

export const fetchAnnouncePendingSuccess = (AnnouncependingtData: any) => ({
    type: FETCH_ANNOUNCE_PENDING_SUCCESS,
    payload: AnnouncependingtData,
});

export const fetchAnnouncePendingFailure = (error: string) => ({
    type: FETCH_ANNOUNCE_PENDING_FAILURE,
    payload: error,
});
